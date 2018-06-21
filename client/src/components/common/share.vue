<template>
  <div class="share-box">
    <el-popover placement="top-start" title="扫一扫用微信查看" trigger="hover">
      <span class="share-item" slot="reference">
        <i class="iconfont icon-wechat"></i>
      </span>
      <img :src="qrCodeImg" alt="qrCode">
    </el-popover>
    <span class="share-item" :key="share.type" v-for="share in shareList" @click="bindThis(share.click)">
      <i :class="['iconfont', `icon-${share.type}`]"></i>
    </span>
    <span class="share-item" ref="share_copy_btn" data-clipboard-tip='链接' :data-clipboard-text="url">
      <i class="iconfont icon-link"></i>
    </span>
  </div>
</template>

<script>
import Clipboard from 'clipboard';

export default {
  props: {
    detail: String,
  },

  data() {
    return {
      shareList: [
        {
          name: '微博',
          type: 'weibo',
          click: function() {
            this.shareWindow(
              `http://service.weibo.com/share/share.php?url=${this.url}&title=${
                this.title
              }&source=${this.url}&sourceUrl=${this.url}&content=${
                this.content
              }`,
            );
          },
        },
        {
          name: 'QQ空间',
          type: 'qzone',
          click: function() {
            this.shareWindow(
              `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${
                this.url
              }&title=${this.title}&summary=${this.content}&site=${this.url}`,
            );
          },
        },
        {
          name: '豆瓣',
          type: 'douban',
          click: function() {
            this.shareWindow(
              `https://www.douban.com/recommend/?url=${this.url}&title=${
                this.title
              }`,
            );
          },
        },
        {
          name: '人人网',
          type: 'renren',
          click: function() {
            this.shareWindow(
              `http://widget.renren.com/dialog/share?resourceUrl=${
                this.url
              }&srcUrl=${this.url}&title=${this.title}&description=${
                this.content
              }`,
            );
          },
        },
        {
          name: '印象笔记',
          type: 'evernote',
          click: function() {
            this.shareWindow(
              `https://www.evernote.com/clip.action?url=${this.url}&title=${
                this.title
              }`,
            );
          },
        },
        {
          name: 'twitter',
          type: 'twitter',
          click: function() {
            this.shareWindow(
              `http://twitter.com/share?text=${this.title}&url=${this.url}`,
            );
          },
        },
        {
          name: 'facebook',
          type: 'facebook',
          click: function() {
            this.shareWindow(
              `https://www.facebook.com/sharer/sharer.php?u=${this.url}`,
            );
          },
        },
        {
          name: 'google',
          type: 'google',
          click: function() {
            this.shareWindow(`https://plus.google.com/share?url=${this.url}`);
          },
        },
        {
          name: 'linkedin',
          type: 'linkedin',
          click: function() {
            this.shareWindow(
              `http://www.linkedin.com/shareArticle?title=${
                this.title
              }&summary=${this.content}&mini=true&url=${this.url}`,
            );
          },
        },
        {
          name: 'email',
          type: 'email',
          click: function() {
            this.shareWindow(`mailto:?subject=${this.title}&body=${this.url}`);
          },
        },
      ],
    };
  },

  computed: {
    url() {
      return `${this.process.env.site}${this.$route.fullPath}`;
    },
    title() {
      return document ? document.title : "daskyrk's blog";
    },
    content() {
      return this.detail || '';
    },
    qrCodeImg() {
      return `http://qr.topscan.com/api.php?text=${this.url}&w=180&el=h&m=10`
    }
  },

  mounted() {
    this.clipboard = new Clipboard(this.$refs.share_copy_btn);
    this.clipboard.on('success', e => {
      this.$message.success({
        message: `复制${e.trigger.getAttribute('data-clipboard-tip') ||
          ''}成功`,
        duration: 1000,
      });
      e.clearSelection();
    });
  },

  methods: {
    bindThis(fn) {
      fn.call(this);
    },
    shareWindow(url) {
      url = encodeURI(url);
      // 给打开的窗口命名
      const winName = 'newWin';
      // screen.availWidth 获得屏幕宽度
      // screen.availHeight 获得屏幕高度
      // 居中的算法是：
      // 左右居中： (屏幕宽度 - 窗口宽度)/2
      // 上下居中： (屏幕高度 - 窗口高度)/2
      const width = screen.availWidth / 4 * 2;
      // 窗口高度,需要设置
      const height = screen.availHeight / 3 * 2;
      // 窗口顶部位置,一般不需要改
      const top = (screen.availHeight - height) / 2;
      // 窗口放中央,一般不需要改
      const left = (screen.availWidth - width) / 2;
      // 新窗口的参数
      const features = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0';
      // 新窗口的左部位置，顶部位置，宽度，高度
      const params = `top=${top},left=${left},width=${width},height=${height},${features}`;
      // 打开新窗口
      const win = window.open(url, winName, params);
      // 新窗口获得焦点
      win.focus();
    },
  },
};
</script>

<style lang="scss">
.share-box {
  display: flex;
  justify-content: space-between;
  color: $darkgray;
  opacity: 0.8;
  &:hover {
    opacity: 1;
    color: $color-text-sub;
  }

  .share-item {
    display: inline-flex;
    height: 2.5rem;
    line-height: 2.5rem;
    cursor: pointer;

    > i {
      font-size: 2.5rem;
    }

    &:hover {
      i.icon-wechat {
        color: #7bc549;
      }

      i.icon-weibo {
        color: #ff763b;
      }

      i.icon-qzone {
        color: #fdbe3d;
      }

      i.icon-douban {
        color: #33b045;
      }

      i.icon-renren {
        color: #56b6e7;
      }

      i.icon-evernote {
        color: #2dbe60;
      }

      i.icon-twitter {
        color: #55acee;
      }

      i.icon-facebook {
        color: #44619d;
      }

      i.icon-google {
        color: #db4437;
      }

      i.icon-linkedin {
        color: #0077b5;
      }

      i.icon-email {
        color: #8570f7;
      }

      i.icon-link {
        color: #e67a1c;
      }
    }
  }
}
</style>

