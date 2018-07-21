<template>
  <div class="login-page" ref="page">
    <canvas id="canvas">your browser does not support the canvas tag </canvas>
    <!-- <div class="title">
      Welcome
    </div> -->
    <form class="login-form" @submit.prevent>
      <div class="input-wrap">
        <i class="iconfont icon-username"></i>
        <input type="text" v-model="form.username" @focus="toggleFocus($event, true)" @blur="toggleFocus($event, false)" placeholder="你是？">
      </div>
      <div class="input-wrap">
        <i class="iconfont icon-password"></i>
        <input type="password" v-model="form.password" @focus="toggleFocus($event, true)" @blur="toggleFocus($event, false)" placeholder="口令？">
      </div>
      <button type="submit" @click="submitForm('form', 'login')">开门</button>
      <button v-if="registerable" @click="submitForm('form', 'add')">入伙</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  middleware: 'auth',

  layout: 'empty',

  async fetch({ store }) {
    await store.dispatch('user/checkRegisterable');
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '你到底是谁啊？', trigger: 'blur' },
          { min: 3, message: '名字太短了', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '没口令可不行哦', trigger: 'blur' },
          { min: 3, message: '口令太短了', trigger: 'blur' },
        ],
      },
    };
  },

  mounted() {
    this.detachEvents = this.startBg();
  },

  beforeDestroy() {
    this.detachEvents();
  },

  computed: {
    ...mapState('user', ['logining', 'registerable']),
  },

  methods: {
    startBg() {
      window.requestAnimFrame = (function() {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          }
        );
      })();

      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      const container = this.$refs.page;

      let w = container.offsetWidth;
      let h = container.offsetHeight;

      canvas.width = w;
      canvas.height = h;

      function Point(x, y) {
        this.x = x;
        this.y = y;
        this.r = 1 + Math.random() * 2;
        this.sx = (Math.random() * 2 - 1) / 3;
        this.sy = (Math.random() * 2 - 1) / 3;
      }

      Point.prototype.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = '#aaa';
        ctx.fill();
      };

      Point.prototype.move = function() {
        this.x += this.sx;
        this.y += this.sy;
        if (this.x > w) this.sx = -Math.abs(this.sx);
        else if (this.x < 0) this.sx = Math.abs(this.sx);
        if (this.y > h) this.sy = -Math.abs(this.sy);
        else if (this.y < 0) this.sy = Math.abs(this.sy);
      };

      Point.prototype.drawLine = function(ctx, p) {
        var dx = this.x - p.x;
        var dy = this.y - p.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          var alpha = (100 - d) / 100 * 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(p.x, p.y);
          ctx.closePath();
          ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')';
          ctx.strokeWidth = 1;
          ctx.stroke();
        }
      };

      var points = [];

      for (var i = 0; i < 80; i++) {
        points.push(new Point(Math.random() * w, Math.random() * h));
      }

      function paint() {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < points.length; i++) {
          points[i].move();
          points[i].draw(ctx);
          for (var j = i + 1; j < points.length; j++) {
            points[i].drawLine(ctx, points[j]);
          }
        }
      }

      function loop() {
        requestAnimFrame(loop);
        paint();
      }

      function onResize() {
        console.log('resize:');
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
      }

      window.addEventListener('load', loop);
      window.addEventListener('resize', onResize);

      function detachEvents() {
        window.removeEventListener('load', loop);
        window.removeEventListener('resize', onResize);
      }

      return detachEvents;
    },
    toggleFocus(e, isFocus) {
      const parentNode = e.target.parentNode;
      const cls = parentNode.className.split(' ');
      parentNode.className = isFocus
        ? cls.concat(['focus']).join(' ')
        : cls.filter(a => a !== 'focus').join(' ');
    },
    submitForm(formName, type) {
      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     const action = type === 'login' ? 'user/login' : 'user/add';
      //     this.$store.dispatch(action, this.form).then(res => {
      //       this.$router.push(this.$route.query.redirectTo || '/');
      //     });
      //   } else {
      //     return false;
      //   }
      const { username, password } = this.form;
      // TODO: add error tip
      if (username.length < 3 || password.length < 3) {
        return;
      }
      const action = type === 'login' ? 'user/login' : 'user/add';
      this.$store.dispatch(action, this.form).then(res => {
        if (res.code === 1) {
          this.$router.push(this.$route.query.redirectTo || '/');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$line-color: rgba(255, 255, 255, 0.1);
$bg-color: rgba(255, 255, 255, 0.3);
$text-color: rgba(255, 255, 255, 0.5);
$text-color-active: rgba(255, 255, 255, 0.8);
$input-height: 3rem;

.login-page {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: $black;
  // background-image: url(https://api.lylares.com/bing/image/random/?w=640&h=480);
  // background-size: cover;
  overflow: hidden;

  canvas {
    height: 100%;
    width: 100%;
    // z-index: 1;
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 0;
  //   background: inherit;
  //   filter: blur(5px);
  //   margin: -20px;
  // }
}

.title {
  font-size: 3rem;
  z-index: 0;
  text-align: center;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 60%;
  width: 400px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;

  .input-wrap {
    position: relative;
    margin-bottom: 2rem;

    i {
      position: absolute;
      left: 0.7rem;
      font-size: 2rem;
      line-height: $input-height;
      color: $text-color;
      transition: color 0.25s;
    }

    &.focus {
      i {
        color: $white;
      }

      input {
        &::-webkit-input-placeholder {
          color: $white;
        }
        &::-moz-placeholder {
          color: $white;
        }
        &:-moz-placeholder {
          color: $white;
        }
        &:-ms-input-placeholder {
          color: $white;
        }
      }
    }
  }

  input,
  button {
    height: $input-height;
    width: 100%;
    border-radius: $input-height;
    font-size: 18px;

    &:active,
    &:focus {
      outline: none;
      color: $text-color-active;
      border: 1px solid $orange;
    }
  }

  input {
    background: $bg-color;
    border: 1px solid $line-color;
    padding: 0 $input-height + 0.5rem;
    color: $text-color;

    &::-webkit-input-placeholder {
      text-align: center;
      font-size: 18px;
      color: $text-color;
    }
    &::-moz-placeholder {
      text-align: center;
      font-size: 18px;
      color: $text-color;
    }
    &:-moz-placeholder {
      text-align: center;
      font-size: 18px;
      color: $text-color;
    }
    &:-ms-input-placeholder {
      text-align: center;
      font-size: 18px;
      color: $text-color;
    }
  }

  button {
    cursor: pointer;
    border: none;
    color: $text-color-active;

    &[type='submit'] {
      background-color: #3ca271;

      &:hover {
        background-color: $green;
      }
    }
  }
}
</style>
