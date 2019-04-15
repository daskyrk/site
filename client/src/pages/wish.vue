<template>
  <div class="wish-wall">
    <div class="wish-form">
      <textarea
        ref="wish"
        class="wish"
        name="wish"
        maxlength="300"
        autofocus
        placeholder="Hi，想说点什么呢"
      />
      <div class="flex-box form-action">
        <input
          ref="name"
          name="name"
          type="text"
          placeholder="From: 路过的朋友"
        >
        <v-btn color="success" @click="submit">
          提交
        </v-btn>
      </div>
    </div>
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
      if (this.list.length > 40) {
        return this.$message('留言有些多了，待我先归档一下~')
      }
      const name = this.$refs.name.value || '路过的朋友'
      const content = this.$refs.wish.value.slice(0, 300)
      if (!content.length) {
        return this.$message('没有想说的吗~')
      }
      this.$store.dispatch('wish/add', { name, content })
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

.wish-form {
  margin-bottom: 2rem;

  textarea,
  input {
    border: 1px solid $color-border;
    border-radius: $radius;

    &:active,
    &:focus {
      border-color: $c-green;
      outline: none;
    }

  }

  textarea {
    width: 100%;
    height: 7rem;
    margin-bottom: 2rem;
    padding: 1rem;
    resize: none;
  }

  input {
    width: 70%;
    height: 2.25rem;
    padding: 0 1rem;
  }

}

.wish-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
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
    min-height: 9rem;
    padding: .9375rem 1.5rem;
    color: $c-white;
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

  .reply {
    width: 100%;
    height: 100%;
    margin-bottom: .25rem;
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
    transition: all .8s cubic-bezier(.34, 1.45, .7, 1);
  }

  &:hover {
    .card-rotate {
      transform: rotateY(180deg);
    }
  }
}

</style>
