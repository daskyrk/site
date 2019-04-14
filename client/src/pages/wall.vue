<template>
  <div class="wish-wall">
    <div class="wish-list">
      <div
        v-for="wish in list"
        :key="wish.id"
        class="rotate-card-container"
      >
        <div class="card card-rotate">
          <div class="content front">
            <h4 class="card-title">
              {{ wish.content }}
            </h4>
            <div class="flex-box action">
              <div class="author">
                <span>{{ wish.name }}</span>
              </div>
              <div class="v-middle stats">
                <i class="iconfont icon-time" />{{ wish.createdAt | fromNow }}
              </div>
            </div>
          </div>
          <div class="content back">
            <div class="reply">
              主人还没回复您的留言(⊙o⊙)…
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="panel">
      <textarea ref="wish" class="wish" name="wish" maxlength="300" placeholder="想说点什么呢" />
      <input
        ref="name"
        name="name"
        type="text"
        placeholder="路过的朋友"
      >
      <button @click="submit">
        提交
      </button>
    </div> -->
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'WishWall',

  layout: 'default-gray',

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
.wish-list {
  display: flex;
  flex-wrap: wrap;
}

.card {
  position: relative;
  width: 330px; // TODO: update
  min-width: 18.75rem;
  margin: .75rem;
  background: transparent;
  border-radius: 6px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all .8s cubic-bezier(.34, 1.45, .7, 1);

  .content {
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 8rem;
    padding: .9375rem 1.5rem;
    color: $white;
    font-size: .875rem;
    background-image: url(~assets/images/blog8.jpg);
    background-position: 50%;
    background-size: cover;
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
      0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
    backface-visibility: hidden;

    > * {
      z-index: 2;
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .56);
      border-radius: 6px;
      content: "";
    }

  }

  .front {
    position: relative;
    z-index: 2;
  }

  .back {
    z-index: 5;
    height: 100%;
    transform: rotateY(180deg);
  }

  // .header {
  //   margin: -40px 20px 0;
  //   padding: 0;
  //   background-color: #999999;
  //   border-radius: 3px;
  // }

  // .header-image {
  //   position: relative;
  //   z-index: 1;
  //   margin-top: -30px;
  //   margin-right: 15px;
  //   margin-left: 15px;
  //   padding: 0;
  //   border-radius: 6px;

  //   img {
  //     width: 100%;
  //     height: auto;
  //     border-radius: 6px;
  //     box-shadow: 0 5px 15px -8px rgba(0, 0, 0, .24),
  //       0 8px 10px -5px rgba(0, 0, 0, .2);
  //     pointer-events: none;
  //   }

  //   .shadow {
  //     position: absolute;
  //     top: 12px;
  //     z-index: -1;
  //     width: 100%;
  //     height: 100%;
  //     background-size: cover;

  //     transform: scale(.94);
  //     filter: blur(12px);
  //     transition: opacity .45s;
  //   }
  // }
  .card-title {
    z-index: 2;
    margin-top: .625rem;
    font-weight: 700;
  }

  .action {
    color: $color-white-6;
  }
}

.rotate-card-container {
  perspective: 800px;

  .card-rotate {
    background: transparent;
    box-shadow: none;
    transform-style: preserve-3d;
    transition: all .8s cubic-bezier(.34, 1.45, .7, 1);
  }

  &:hover {
    .card-rotate {
      transform: rotateY(180deg);
    }
  }
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
