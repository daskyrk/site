<template>
  <div class="back">
    <div class="ding-area">
      <div
        v-for="wish in list"
        :key="wish._id"
        class="card"
      >
        <div class="ding" />
        <div class="content">
          {{ wish.content }}
        </div>
        <div class="by">
          - {{ wish.name }}
        </div>
      </div>
    </div>
    <div class="panel">
      <textarea
        ref="wish"
        class="wish"
        name="wish"
        maxlength="300"
        placeholder="想说点什么呢"
      />
      <input
        ref="name"
        name="name"
        type="text"
        placeholder="路过的朋友"
      >
      <button @click="submit">
        提交
      </button>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'WishWall',

  layout: 'empty',

  async fetch({ store }) {
    await store.dispatch('wish/getWishes')
  },

  data() {
    return {
      submiting: false,
      success: false,
    }
  },

  computed: {
    ...mapState('wish', ['list']),
  },

  methods: {
    submit() {
      if (this.list.length > 40) {
        return this.$message('留言有些多了，待我先归档一下~')
      }
      const name = this.$refs.name.value || '路过的朋友'
      const content = this.$refs.wish.value.slice(0, 300)
      if (!content.length) {
        return this.$message('没有想说的吗~')
      }
      this.$store.dispatch('wish/addWish', { name, content })
    },
  },
}
</script>


<style lang="scss" scoped>
.back {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(~assets/images/wood.jpg) repeat top left;
}

.ding-area {
  position: absolute;
  left: 0;
  top: 0;
  right: 400px;
  bottom: 0;
  padding: 1rem;
  padding-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}

.card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 220px;
  margin: 0 0.3rem 1rem 0.3rem;
  padding: 2.4rem 1rem 0rem;
  background: repeating-linear-gradient(
      180deg,
      rgba(224, 224, 224, 0.5) 0,
      rgba(202, 202, 202, 0.5) 0.44%,
      rgba(0, 0, 0, 0) 0.44%,
      rgba(0, 0, 0, 0) 17%
    ),
    #fcf59b;
  background-color: rgb(220, 179, 113);
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.62), 0 0 40px rgba(0, 0, 0, 0.1) inset;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 30px;
    bottom: 16px;
    background: transparent;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7);
    z-index: -1;
    background: #fff;
  }
  &::before {
    left: 25px;
    right: 25px;
    transform: skew(-15deg) rotate(-6deg);
  }
  &::after {
    left: 25px;
    right: 25px;
    transform: skew(15deg) rotate(6deg);
  }

  .content,
  .by {
    line-height: 36px;
    word-break: break-word;
    overflow: hidden;
  }

  .by {
    text-align: right;
  }
}

.ding {
  display: block;
  box-sizing: content-box;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 9px;
  left: 45%;
  overflow: visible;
  outline: none;
  border: 0 solid rgba(0, 0, 0, 1);
  border-radius: 30px;
  background: radial-gradient(
      circle closest-side at 50% 50%,
      rgba(25, 119, 196, 1) 0,
      rgba(25, 119, 196, 1) 4%,
      rgba(12, 113, 201, 1) 77%,
      rgba(255, 255, 255, 0) 89%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      circle closest-side at 50% 50%,
      rgba(0, 0, 0, 0.4) 0,
      rgba(0, 0, 0, 0.2) 81%,
      rgba(255, 255, 255, 0) 92%,
      rgba(255, 255, 255, 0) 100%
    ),
    radial-gradient(
      circle closest-side at 50% 50%,
      rgba(64, 150, 238, 1) 0,
      rgba(64, 150, 238, 1) 100%
    ),
    rgba(255, 255, 255, 0.9);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: 96% -4%, 71% 43%, 50% 50%;
  // -webkit-background-origin: padding-box, padding-box, padding-box;
  background-origin: padding-box, padding-box, padding-box;
  // -webkit-background-clip: border-box, border-box, border-box;
  background-clip: border-box, border-box, border-box;
  // -webkit-background-size: 20px 20px, 20px 20px, auto auto;
  background-size: 20px 20px, 20px 20px, auto auto;
  // -webkit-box-shadow: -4px 8px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: -4px 8px 5px 1px rgba(0, 0, 0, 0.2);
}

.panel {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  display: flex;
  align-items: center;
  padding-top: 230px;
  // justify-content: center;
  flex-direction: column;
  background: hsla(0, 0%, 100%, 0.3);
  overflow: hidden;

  textarea,
  input {
    width: 90%;
    margin-bottom: 2rem;
    border-radius: 10px;
    border: 1px solid white;
    background: rgba(255, 255, 255, 0.5);

    &:active,
    &:focus {
      outline: none;
      border-color: #1ecd97;
    }

    &::-webkit-input-placeholder {
      color: white;
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: white;
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: white;
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: white;
    }
  }

  textarea {
    height: 200px;
    resize: none;
    padding: 1rem;
  }

  input {
    padding: 0.5rem;
  }

  button {
    display: block;
    margin: 0 auto;
    padding: 0;
    width: 200px;
    height: 50px;
    border: 2px solid #1ecd97;
    border-radius: 40px;
    background: transparent;
    color: #1ecd97;
    letter-spacing: 1px;
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
    -webkit-tap-highlight-color: transparent;
    -webkit-transition: background-color 0.3s, color 0.3s, width 0.3s,
      border-width 0.3s, border-color 0.3s;
    transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s,
      border-color 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #1ecd97;
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   bottom: 0;
  //   left: 0;
  //   margin: -20px;
  //   filter: blur(4px);
  //   background: url(~assets/images/wood.jpg) repeat top left;
  // }
}
</style>
