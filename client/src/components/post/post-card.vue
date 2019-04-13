t<template>
  <transition-group
    tag="div"
    class="post-group"
    name="slide-down"
  >
    <div
      v-for="post in list"
      :key="post.id"
      class="post-item-container"
    >
      <nuxt-link :to="`/post/${post.id}`">
        <article class="post-item">
          <div
            v-if="post.thumb"
            class="post-thumb"
            :style="{background: `url(${post.thumb}) 0 0 no-repeat`}"
          />
          <div
            v-else
            class="post-thumb"
          />
          <div class="meta">
            <span>
              <i class="iconfont icon-chakan" />
              {{ post.meta.views }}
            </span>
            <span>
              <i class="iconfont icon-pinglun" />
              {{ post.meta.comments }}
            </span>
            <span>
              <i class="iconfont icon-xihuan" />
              {{ post.meta.likes }}
            </span>
          </div>
          <div class="content">
            <h2 class="title nowrap">
              {{ post.title }}
            </h2>
            <div class="description">
              {{ post.description || '文章没有描述，进去看看？' | textClip(60) }}
            </div>
            <div class="time">
              {{ format(post.createdAt) }}
            </div>
          </div>
          <!-- <span
          v-if="topLikeId === post.id"
          class="ribbon"
        >
          赞
        </span> -->
        </article>
      </nuxt-link>
    </div>
  </transition-group>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    list: {
      type: Array,
      required: true,
      // default: []
    },
  },

  computed: {
    topLikeId() {
      let max = 0
      let id = null
      this.list.forEach(t => {
        if (t.meta.likes > max) {
          max = t.meta.likes
          id = t.id
        }
      })
      return max === 0 ? null : id
    },
  },

  methods: {
    format: function(timestamp) {
      const date = moment(timestamp)
      const week = date.weekday()
      const toWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      return `${date.format('YYYY · MM · DD')} ${toWeek[week]}`
    },
  },
}
</script>

<style lang='scss'>
$post-card-height: 300px;
$half-ribbon-width: 1rem;
$desc-line-height: 26px;

.post-group {
  text-align: center;
}

.post-item-container {
  display: inline-block;
  width: 33%;
  padding: 1rem;
  text-align: center;
}

.post-item {
  position: relative;
  height: $post-card-height;
  overflow: hidden;
  color: $color-text;
  background-color: $ghostwhite;
  border-radius: $radius;
  box-shadow: 0 0 20px rgba(0, 0, 0, .1);
  transition: box-shadow .5s;

  .post-thumb {
    min-width: 100%;
    height: 70%;
    background: url(~assets/images/post-bg.jpg) 0 0 no-repeat;
    background-size: cover;
    transition: filter .3s, transform .5s;
  }

  .thumb-placeholder {
    width: 100%;
    height: 70%;
  }

  .content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    background-color: $ghostwhite;
    transition: background-color .3s;

    .title {
      margin-bottom: .5rem;
      font-weight: bold;
      font-size: 1.2rem;
    }

    .description {
      left: 20px;
      height: 0;
      margin: 0;
      padding: 0;
      color: $color-text-sub;
      font-size: 14px;
      line-height: $desc-line-height;
      opacity: 0;
      transition: height .3s .1s, opacity .3s;
    }

    .time {
      color: $color-text-desc;
      font-size: .875rem;
    }
  }

  .meta {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding: .5rem;
    overflow: hidden;
    color: $platinum;
    font-size: 14px;
    text-align: right;
    opacity: 0;
    transition: all .3s;
    transition-delay: .1s;

    i {
      vertical-align: middle;
    }

    span {
      margin-right: .75rem;
      line-height: 1.375rem;
    }

    .time {
      margin-right: 1.2rem;
    }
  }

  .ribbon {
    position: absolute;
    top: -6px;
    right: 1rem;
    display: inline-block;
    width: 2 * $half-ribbon-width;
    padding: 10px 0 4px;
    color: $white;
    text-align: center;
    background: $orange;
    border-top-left-radius: $radius;

    &:before {
      position: absolute;
      top: 0;
      right: -4px;
      width: 0;
      height: 0;
      border-right: 4px solid transparent;
      border-bottom: 6px solid #8d5a20;
      content: "";
    }

    &:after {
      position: absolute;
      bottom: -$half-ribbon-width;
      left: 0;
      width: 0;
      height: 0;
      border-right: $half-ribbon-width solid $orange;
      border-bottom: $half-ribbon-width solid transparent;
      border-left: $half-ribbon-width solid $orange;
      content: "";
    }
  }

  &:hover {
    box-shadow: 0 1px 20px rgba(0, 0, 0, .3);

    .meta {
      background-color: rgba(0, 0, 0, .5);
      opacity: 1;
    }

    .content {
      background-color: $white;
    }

    .post-thumb {
      transform: scale(1.1);
      filter: blur(3px);
    }

    .description {
      height: 3 * $desc-line-height;
      opacity: 1;
      transition: height .3s, opacity .3s .1s;
    }
  }
}


@include md-width () {
  .post-item-container {
    width: 45%;
  }
}

@include sm-width () {
  .post-item-container {
    width: 80%;
  }
}

</style>
