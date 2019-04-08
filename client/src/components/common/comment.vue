<template>
  <div class="comment-box">
    <div class="summary">
      <strong class="total">
        {{ total }} 条评论
      </strong>
      <span class="line" />
    </div>
    <comment-form
      v-if="!pid"
      :on-submit="addComment"
    />
    <ol class="comment-list comment-pad">
      <comment-item
        v-for="comment in data"
        :key="comment.id"
        :comment="comment"
        :target-id="pid"
        :show-reply="showReply"
        :like-comment="likeComment"
      />
    </ol>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { setLS, getLS, regexp } from '~/utils'
import CommentForm from '~/components/common/comment-form'
import CommentItem from '~/components/common/comment-item'

export default {
  components: {
    CommentForm,
    CommentItem,
  },

  props: {
    postId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      likeComments: [],
      pid: '',
    }
  },

  computed: {
    ...mapState('comment', ['list', 'total']),
    data: function() {
      return this.dealList(this.list)
    },
  },

  beforeMount() {
    this.likeComments = getLS('comment-like') || []
  },

  mounted() {
    this.getComments()
  },

  methods: {
    async getComments(params = {}) {
      const res = await this.$store.dispatch('comment/getComments', {
        ...params,
        postId: this.postId,
      })
    },
    dealList() {
      if (!this.list.length) {
        return []
      }
      const list = this.addPName(this.list)
      const { true: pList = [], false: childList = [] } = _.groupBy(
        list,
        item => !item.pid,
      )
      const data = pList.map(item => {
        item.children = this.findChildren(item, childList)
        item.depth = 1
        childList.map(
          child => (child.children = this.findChildren(child, childList)),
        )
        return item
      })
      console.log('data:', data)
      return data
    },
    addPName(list) {
      const commentMap = {}
      list.forEach(item => {
        commentMap[item.id] = item
      })
      return list.map(item => {
        const pComment = commentMap[item.pid]
        const enchancedItem = {
          ...item,
          isLiked: this.isLiked(item.id),
          form: {
            comp: CommentForm,
            addComment: this.addComment,
          },
        }

        if (!pComment) {
          return enchancedItem
        }
        return {
          ...enchancedItem,
          pName: pComment.author.name,
        }
      })
    },
    findChildren(item, list = []) {
      return list.filter(i => i.pid === item.id)
    },
    addComment(data) {
      this.$store
        .dispatch('comment/addComment', {
          ...data,
          pid: this.pid,
          postId: this.postId,
          pageUrl: location.href,
        })
        .then(res => {
          if (res.success) {
            this.getComments({ pageNo: 1 })
          }
        })
    },
    isLiked(id) {
      return this.likeComments.includes(id)
    },
    likeComment(id) {
      if (this.isLiked(id)) {
        return
      }
      this.$store.dispatch('comment/likeComment', id).then(res => {
        if (res.success) {
          this.likeComments.push(id)
          setLS('comment-like', this.likeComments)
        }
      })
    },
    showReply(commentId) {
      this.pid = commentId
    },
  },
}
</script>

<style lang="scss">
.comment-box {
  .summary {
    position: relative;
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: space-between;
    .line {
      height: 1px;
      flex-grow: 1;
      background-color: $color-split;
      margin-left: 1.25rem;
    }
  }

  .author-info {
    margin-left: 4rem;
    margin-top: 0.4rem;
    display: flex;

    input {
      width: 100%;
      height: 2em;
      padding: 0.5rem;
      background: transparent;
      border: 1px solid $platinum;
      border-radius: 4px;
      margin-right: 1rem;
      outline: none;
      &:hover {
        border-color: $lightblack;
      }
      &:focus {
        border-color: $color-primary;
      }
      &:last-child {
        margin-right: 0;
      }

      &.error {
        border-color: $color-danger;
      }
    }
  }

  .comment-pad {
    margin-top: 2rem;
  }
}
</style>
