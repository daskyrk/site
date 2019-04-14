<template>
  <div class="back">
    <div class="ding-area">
      <div
        v-for="wish in list"
        :key="wish.id"
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

  data() {
    return {
      submiting: false,
      success: false,
    }
  },

  computed: {
    ...mapState('wish', ['list']),
  },

  async fetch({ store }) {
    await store.dispatch('wish/getWishes')
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
  top: 0;
  right: 400px;
  bottom: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  padding-top: 2rem;
  overflow: auto;
}

.card {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 220px;
  margin: 0 .3rem 1rem .3rem;
  padding: 2.4rem 1rem 0;
  background: repeating-linear-gradient(
    180deg, rgba(224, 224, 224, .5) 0, rgba(202, 202, 202, .5) .44%, rgba(0, 0, 0, 0) .44%, rgba(0, 0, 0, 0) 17%
  ),
    #fcf59b;
  background-color: rgb(220, 179, 113);
  box-shadow: 0 1px 11px rgba(0, 0, 0, .62), 0 0 40px rgba(0, 0, 0, .1) inset;

  &::before,
  &::after {
    position: absolute;
    top: 30px;
    bottom: 16px;
    z-index: -1;
    background: transparent;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .7);
    content: "";
  }

  &::before {
    right: 25px;
    left: 25px;
    transform: skew(-15deg) rotate(-6deg);
  }

  &::after {
    right: 25px;
    left: 25px;
    transform: skew(15deg) rotate(6deg);
  }

  .content,
  .by {
    overflow: hidden;
    line-height: 36px;
    word-break: break-word;
  }

  .by {
    text-align: right;
  }
}

.ding {
  position: absolute;
  top: 9px;
  left: 45%;
  display: block;
  box-sizing: content-box;
  width: 30px;
  height: 30px;
  overflow: visible;
  background: radial-gradient(
    circle closest-side at 50% 50%, rgba(25, 119, 196, 1) 0, rgba(25, 119, 196, 1) 4%, rgba(12, 113, 201, 1) 77%, rgba(255, 255, 255, 0) 89%, rgba(255, 255, 255, 0) 100%
  ),
    radial-gradient(
    circle closest-side at 50% 50%, rgba(0, 0, 0, .4) 0, rgba(0, 0, 0, .2) 81%, rgba(255, 255, 255, 0) 92%, rgba(255, 255, 255, 0) 100%
  ),
    radial-gradient(
    circle closest-side at 50% 50%, rgba(64, 150, 238, 1) 0, rgba(64, 150, 238, 1) 100%
  ),
    rgba(255, 255, 255, .9);
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-position: 96% -4%, 71% 43%, 50% 50%;
  // -webkit-background-size: 20px 20px, 20px 20px, auto auto;
  background-size: 20px 20px, 20px 20px, auto auto;
  // -webkit-background-clip: border-box, border-box, border-box;
  background-clip: border-box, border-box, border-box;
  // -webkit-background-origin: padding-box, padding-box, padding-box;
  background-origin: padding-box, padding-box, padding-box;
  border: 0 solid rgba(0, 0, 0, 1);
  border-radius: 30px;
  outline: none;
  // -webkit-box-shadow: -4px 8px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: -4px 8px 5px 1px rgba(0, 0, 0, .2);
}

.panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding-top: 230px;
  overflow: hidden;
  background: hsla(0, 0%, 100%, .3);

  textarea,
  input {
    width: 90%;
    margin-bottom: 2rem;
    background: rgba(255, 255, 255, .5);
    border: 1px solid white;
    border-radius: 10px;

    &:active,
    &:focus {
      border-color: #1ecd97;
      outline: none;
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
    padding: 1rem;
    resize: none;
  }

  input {
    padding: .5rem;
  }

  button {
    display: block;
    width: 200px;
    height: 50px;
    margin: 0 auto;
    padding: 0;
    color: #1ecd97;
    font-size: 18px;
    font-family: Montserrat, sans-serif;
    letter-spacing: 1px;
    background: transparent;
    border: 2px solid #1ecd97;
    border-radius: 40px;
    cursor: pointer;
    -webkit-transition: background-color .3s, color .3s, width .3s,
      border-width .3s, border-color .3s;
    transition: background-color .3s, color .3s, width .3s, border-width .3s,
      border-color .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      color: #ffffff;
      background-color: #1ecd97;
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
