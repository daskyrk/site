<template>
  <div class="wish-page">
    <div class="wish-form">
      <div>
        <textarea
          v-model="content"
          placeholder="Hi，想说点什么呢"
          maxlength="300"
        />
      </div>
      <div class="row-2 flex-box">
        <input
          v-model="name"
          placeholder="来自"
        >
        <button
          color="blue darken-1"
          @click="submit"
        >
          提交
        </button>
      </div>
    </div>
    <div class="wish-list flex-box">
      <div
        v-for="wish in list"
        :key="wish.id"
        class="wish-item"
      >
        <div class="rotate-card-container">
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
              <textarea
                v-if="logined"
                v-model="replyMap[wish.id]"
                class="reply"
                maxlength="200"
                placeholder="回复点什么?"
              />
              <div
                v-if="logined"
                class="reply-action"
              >
                <button @click="replyWish(wish.id)">
                  回复
                </button>
                <button @click="clearReply(wish.id)">
                  清空
                </button>
                <button @click="deleteWish(wish.id)">
                  删除
                </button>
              </div>
              <h4
                v-else
                class="card-title"
              >
                {{ wish.reply || '主人还没回复您的留言(⊙o⊙)…' }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      dialogVisible: false,
      validate: false,
      content: '',
      contentRules: [
        v => !!v || '写点什么吧...',
        v => v.length <= 300 || '内容太多啦',
      ],
      name: '',
      nameRules: [
        v => !!v || '忘了写名字呢',
        v => (v && v.length <= 15) || '名字太长啦',
      ],
    }
  },

  computed: {
    ...mapState('wish', ['list']),
    ...mapState('user', ['logined']),
    replyMap() {
      const replyMap = {}
      this.$store.state.wish.list.forEach(item => {
        replyMap[item.id] = item.reply
      })
      return replyMap
    },
  },

  async fetch({ store }) {
    await store.dispatch('wish/getWishes')
  },

  methods: {
    submit() {
      if (this.list.length > 50) {
        return this.$msg('留言有些多了，待我先归档一下~')
      }
      if (!this.name) {
        return this.$msg('忘了署名啊')
      }
      if (!this.content) {
        return this.$msg('没什么想说的吗')
      }
      const name = this.name
      const content = this.content
      this.$store.dispatch('wish/add', { name, content })
      this.name = ''
      this.content = ''
    },
    replyWish(id) {
      const reply = this.replyMap[id]
      this.$store.dispatch('wish/reply', { id, reply })
    },
    clearReply(id) {
      this.replyMap[id] = ''
    },
    deleteWish(id) {
      this.$store.dispatch('wish/delete', id)
    },
  },
}
</script>


<style lang="scss" scoped>
.wish-wall {
  width: 70%;
}

.add-btn {
  position: fixed;
  bottom: 6%;
  left: 6%;
  z-index: 10;
}

.wish-page {
  width: 60%;

  .wish-list {
    flex-wrap: wrap;
  }

  .wish-item {
    width: 300px;
    margin-bottom: 30px;
  }

  @include sm-width() {
    width: 90%;

    .wish-list,
    .wish-form,
    .wish-item {
      width: 100%;
    }

  }
}

.wish-form {
  width: 500px;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 60px;
  text-align: center;

  textarea,
  input,
  button {
    border: 1px solid $color-text-sub;
    border-radius: $radius;
    outline: none;
    transition: all ease-in 0.1s;

    &:hover,
    &:focus,
    &:active {
      border: 1px solid $c-orange;
    }
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 6px;
  }

  input {
    padding: 6px;
  }

  button {
    width: 80px;
    height: 36px;
    background-color: transparent;
    border: thin solid currentColor;
    transition: all ease-in 0.1s;

    &:hover {
      color: $c-orange;
    }
  }
}

.card {
  position: relative;
  width: 100%;
  background: transparent;
  border-radius: 6px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1);

  .content {
    position: absolute;
    top: 0;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 9rem;
    padding: 0.9375rem 1.5rem;
    color: $c-white;
    font-size: 0.875rem;
    background-image: url(~assets/images/blog8.jpg);
    background-position: 50%;
    background-size: cover;
    border-radius: 6px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
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
      background-color: rgba(0, 0, 0, 0.56);
      border-radius: 6px;
      content: '';
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
    margin-top: 0.625rem;
    font-weight: 700;
    font-size: 1rem;
  }

  .action {
    color: $color-white-6;
  }

  .stats {
    i {
      margin: 4px;
    }
  }

  .reply {
    width: 100%;
    height: 100%;
    margin-bottom: 0.25rem;
    color: $color-white-6;
    background: transparent;
    border-radius: $radius;
    outline: none;
    resize: none;

    &:focus {
      border-color: $c-red;
    }
  }

  .reply-action {
    button {
      color: $color-white-6;
      background: transparent;
      border-radius: 20px;
      outline: none;

      &:hover {
        color: $color-active-red;
        border-color: $color-active-red;
      }
    }
  }
}

.rotate-card-container {
  perspective: 800px;

  .card-rotate {
    background: transparent;
    box-shadow: none;
    transform-style: preserve-3d;
    transition: all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1);
  }

  &:hover {
    .card-rotate {
      transform: rotateY(180deg);
    }
  }
}

@include md-width() {
  .wish-list {
    width: 80%;
  }
}

@include sm-width() {
  .wish-list {
    width: 90%;
  }
}
</style>
