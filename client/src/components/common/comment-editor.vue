<template>
  <div class="comment-editor">
    <textarea rows="4" cols="20" name="content" maxlength="400" @focus="focus" :placeholder="holder" v-model="value">
    </textarea>
    <div class="editor-tools">
      <span class="tool-btn emoji">
        <i class="iconfont icon-biaoqing"></i>
        <transition name="fade">
          <emoji-box :onClick="insertEmoji" />
        </transition>
      </span>
      <span class="tool-btn" @click="insert('img')">
        <i class="iconfont icon-image"></i>
      </span>
      <span class="tool-btn" @click="insert('link')">
        <i class="iconfont icon-lianjie"></i>
      </span>
      <span class="tool-btn" @click="insert('code')">
        <i class="iconfont icon-daimakuai"></i>
      </span>
      <button @click="submit">
        提交
        <i class="iconfont icon-fabu"></i>
      </button>
    </div>
  </div>
</template>


<script>
import EmojiBox from '~/components/common/emoji-box';

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
    };
  },

  methods: {
    focus() {
      if (this.onFocus) {
        this.onFocus();
      }
    },
    insert(type) {
      const insertMap = {
        img: '\n![alt](src)',
        link: '[title](url)',
        code: '\n```\n\n```',
      };
      this.value += insertMap[type];
    },
    insertEmoji(emj) {
      this.value += emj;
    },
    submit() {
      this.onSubmit(this.value);
      this.value = '';
    },
  },
};
</script>

.<style lang="scss" scoped>
.comment-editor {
  flex: 1;
  textarea {
    width: 100%;
    min-height: 6em;
    max-height: 30em;
    overflow: auto;
    outline: none;
    padding: 0.5em;
    cursor: auto;
    font-size: 0.95em;
    line-height: 1.8em;
    border: 1px solid $platinum;
    border-radius: 4px;
    &:hover {
      border-color: $lightblack;
    }
    &:focus {
      border-color: $color-primary;
    }
  }

  .editor-tools {
    height: 2rem;
    line-height: 2rem;

    .tool-btn {
      width: 2em;
      height: 2em;
      border-radius: $radius;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      &:hover {
        background: $color-hover-bg;
      }
    }

    .emoji {
      position: relative;
      .emoji-box {
        display: none;
        position: absolute;
        top: 2rem;
        left: 0;
      }

      &:hover {
        .emoji-box {
          display: block;
        }
      }
    }

    button {
      float: right;
      border: none;
      border-radius: 4px;
      text-align: center;
      vertical-align: middle;
      background: transparent;
      white-space: nowrap;
      cursor: pointer;
      padding: 0 0.5rem;
      outline: none;
      &:hover {
        background: $color-hover-bg;
      }
    }
  }
}
</style>

