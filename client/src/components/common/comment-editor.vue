<template>
  <div class="comment-editor">
    <textarea
      v-model="value"
      :placeholder="holder"
      rows="4"
      cols="20"
      name="content"
      maxlength="400"
      @focus="focus"
    />
    <div class="editor-tools">
      <span class="tool-btn emoji">
        <i class="iconfont icon-biaoqing" />
        <transition name="fade">
          <emoji-box :on-click="insertEmoji" />
        </transition>
      </span>
      <span
        class="tool-btn"
        @click="insert('img')"
      >
        <i class="iconfont icon-image" />
      </span>
      <span
        class="tool-btn"
        @click="insert('link')"
      >
        <i class="iconfont icon-lianjie" />
      </span>
      <span
        class="tool-btn"
        @click="insert('code')"
      >
        <i class="iconfont icon-daimakuai" />
      </span>
      <button @click="submit">
        提交
        <i class="iconfont icon-fabu" />
      </button>
    </div>
  </div>
</template>


<script>
import EmojiBox from '~/components/common/emoji-box'

export default {
  components: {
    EmojiBox,
  },

  props: {
    content: String,
    placeholder: String,
    onFocus: Function,
    onSubmit: {
      required: true,
      type: Function,
    },
  },

  data() {
    return {
      value: this.content || '',
      holder: this.placeholder || '想说点什么呢~',
    }
  },

  methods: {
    focus() {
      if (this.onFocus) {
        this.onFocus()
      }
    },
    insert(type) {
      const insertMap = {
        img: '\n![alt](src)',
        link: '[title](url)',
        code: '\n```\n\n```',
      }
      this.value += insertMap[type]
    },
    insertEmoji(emj) {
      this.value += emj
    },
    submit() {
      this.onSubmit(this.value)
      this.value = ''
    },
  },
}
</script>

.<style lang="scss" scoped>
.comment-editor {
  flex: 1;

  textarea {
    width: 100%;
    min-height: 6em;
    max-height: 30em;
    padding: .5em;
    overflow: auto;
    font-size: .95em;
    line-height: 1.8em;
    border: 1px solid $c-platinum;
    border-radius: 4px;
    outline: none;
    cursor: auto;

    &:hover {
      border-color: $c-lightblack;
    }

    &:focus {
      border-color: $color-primary;
    }
  }

  .editor-tools {
    height: 2rem;
    line-height: 2rem;

    .tool-btn {
      display: inline-block;
      width: 2em;
      height: 2em;
      text-align: center;
      border-radius: $radius;
      cursor: pointer;

      &:hover {
        background: $color-hover-bg;
      }
    }

    .emoji {
      position: relative;

      .emoji-box {
        position: absolute;
        top: 2rem;
        left: 0;
        display: none;
      }

      &:hover {
        .emoji-box {
          display: block;
        }
      }
    }

    button {
      float: right;
      padding: 0 .5rem;
      white-space: nowrap;
      text-align: center;
      vertical-align: middle;
      background: transparent;
      border: none;
      border-radius: 4px;
      outline: none;
      cursor: pointer;

      &:hover {
        background: $color-hover-bg;
      }
    }
  }
}
</style>
