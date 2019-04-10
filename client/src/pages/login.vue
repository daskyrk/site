<template>
  <div
    ref="page"
    class="login-page"
  >
    <canvas id="canvas">
      your browser does not support the canvas tag
    </canvas>
    <!-- <div class="title">
      Welcome
    </div> -->
    <form
      class="login-form"
      @submit.prevent
    >
      <div class="input-wrap">
        <i class="iconfont icon-username" />
        <input
          v-model="form.email"
          type="text"
          placeholder="邮箱？"
          @focus="toggleFocus($event, true)"
          @blur="toggleFocus($event, false)"
        >
      </div>
      <div class="input-wrap">
        <i class="iconfont icon-password" />
        <input
          v-model="form.password"
          type="password"
          placeholder="暗号？"
          @focus="toggleFocus($event, true)"
          @blur="toggleFocus($event, false)"
        >
      </div>
      <button
        type="submit"
        @click="submitForm('form', 'login')"
      >
        开门
      </button>
      <button
        v-if="registerable"
        class="regist-btn"
        @click="submitForm('form', 'add')"
      >
        入伙
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
	middleware: 'auth',

	layout: 'empty',

	data() {
		return {
			form: {
				email: '',
				password: '',
			},
			rules: {
				email: [{ required: true, message: '邮箱？', trigger: 'blur' }],
				password: [
					{ required: true, message: '暗号？', trigger: 'blur' },
					{ min: 6, message: '暗号太短了', trigger: 'blur' },
				],
			},
		}
	},

	computed: {
		...mapState('user', ['logined', 'registerable']),
	},

	// async fetch({ store }) {
	//   await store.dispatch('user/checkRegisterable')
	// },

	mounted() {
		this.detachEvents = this.startBg()
	},

	beforeDestroy() {
		this.detachEvents()
	},

	methods: {
		startBg() {
			window.requestAnimFrame = (function() {
				return (
					window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					function(callback) {
						window.setTimeout(callback, 1000 / 60)
					}
				)
			})()

			const canvas = document.getElementById('canvas')
			const ctx = canvas.getContext('2d')
			const container = this.$refs.page

			let w = container.offsetWidth
			let h = container.offsetHeight

			canvas.width = w
			canvas.height = h

			function Point(x, y) {
				this.x = x
				this.y = y
				this.r = 1 + Math.random() * 2
				this.sx = (Math.random() * 2 - 1) / 3
				this.sy = (Math.random() * 2 - 1) / 3
			}

			Point.prototype.draw = function(ctx) {
				ctx.beginPath()
				ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
				ctx.closePath()
				ctx.fillStyle = '#aaa'
				ctx.fill()
			}

			Point.prototype.move = function() {
				this.x += this.sx
				this.y += this.sy
				if (this.x > w) this.sx = -Math.abs(this.sx)
				else if (this.x < 0) this.sx = Math.abs(this.sx)
				if (this.y > h) this.sy = -Math.abs(this.sy)
				else if (this.y < 0) this.sy = Math.abs(this.sy)
			}

			Point.prototype.drawLine = function(ctx, p) {
				var dx = this.x - p.x
				var dy = this.y - p.y
				var d = Math.sqrt(dx * dx + dy * dy)
				if (d < 100) {
					var alpha = ((100 - d) / 100) * 1
					ctx.beginPath()
					ctx.moveTo(this.x, this.y)
					ctx.lineTo(p.x, p.y)
					ctx.closePath()
					ctx.strokeStyle = 'rgba(170, 170, 170, ' + alpha + ')'
					ctx.strokeWidth = 1
					ctx.stroke()
				}
			}

			var points = []

			for (var i = 0; i < 80; i++) {
				points.push(new Point(Math.random() * w, Math.random() * h))
			}

			function paint() {
				ctx.clearRect(0, 0, w, h)
				for (var i = 0; i < points.length; i++) {
					points[i].move()
					points[i].draw(ctx)
					for (var j = i + 1; j < points.length; j++) {
						points[i].drawLine(ctx, points[j])
					}
				}
			}

			function loop() {
				requestAnimFrame(loop)
				paint()
			}

			function onResize() {
				console.log('resize:')
				w = canvas.width = canvas.offsetWidth
				h = canvas.height = canvas.offsetHeight
			}

			window.addEventListener('load', loop)
			window.addEventListener('resize', onResize)

			function detachEvents() {
				window.removeEventListener('load', loop)
				window.removeEventListener('resize', onResize)
			}

			return detachEvents
		},
		toggleFocus(e, isFocus) {
			const parentNode = e.target.parentNode
			const cls = parentNode.className.split(' ')
			parentNode.className = isFocus
				? cls.concat(['focus']).join(' ')
				: cls.filter(a => a !== 'focus').join(' ')
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
			const { email, password } = this.form
			// TODO: add error tip
			if (password.length < 6) {
				return
			}
			const action = type === 'login' ? 'user/login' : 'user/add'
			this.$store.dispatch(action, this.form).then(res => {
				if (res.success) {
					this.$router.push(this.$route.query.redirectTo || '/')
				}
			})
		},
	},
}
</script>

<style lang="scss">
$line-color: rgba(255, 255, 255, .1);
$bg-color: rgba(255, 255, 255, .3);
$text-color: rgba(255, 255, 255, .5);
$text-color-active: rgba(255, 255, 255, .8);
$input-height: 3rem;

.login-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  // background-image: url(https://api.lylares.com/bing/image/random/?w=640&h=480);
  // background-size: cover;
  overflow: hidden;
  background-color: $black;

  canvas {
    width: 100%;
    height: 100%;
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
  z-index: 0;
  font-size: 3rem;
  text-align: center;
}

.login-form {
  position: absolute;
  top: 60%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 400px;
  transform: translate(-50%, -50%);

  .input-wrap {
    position: relative;
    margin-bottom: 2rem;

    i {
      position: absolute;
      left: .7rem;
      color: $text-color;
      font-size: 2rem;
      line-height: $input-height;
      transition: color .25s;
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
    width: 100%;
    height: $input-height;
    font-size: 18px;
    border-radius: $input-height;

    &:active,
    &:focus {
      color: $text-color-active;
      border: 1px solid $orange;
      outline: none;
    }
  }

  input {
    padding: 0 $input-height + .5rem;
    color: $text-color;
    background: $bg-color;
    border: 1px solid $line-color;

    &::-webkit-input-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &::-moz-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &:-moz-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }

    &:-ms-input-placeholder {
      color: $text-color;
      font-size: 18px;
      text-align: center;
    }
  }

  button {
    color: $text-color-active;
    border: none;
    cursor: pointer;

    &[type="submit"] {
      background-color: #3ca271;

      &:hover {
        background-color: $green;
      }
    }
  }

  .regist-btn {
    margin-top: 12px;
    background-color: $darkgray;
  }
}
</style>
