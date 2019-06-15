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
    post: {
      type: Object,
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
        postId: this.post.id,
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
          post: this.post,
          pageUrl: location.href,
        })
        .then(res => {
          if (res.success) {
            this.getComments({ pageNo: 1 })
            this.pid = undefined
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

<style lang="scss" scoped>
.comment-box {
  .summary {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .line {
      flex-grow: 1;
      height: 1px;
      margin-left: 1.25rem;
      background-color: $color-split;
    }
  }


  .comment-pad {
    margin-top: 2rem;
  }
}
</style>
