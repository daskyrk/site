t<template>
  <transition-group
    tag="div"
    name="slide-down"
  >
    <nuxt-link
      v-for="post in list"
      :key="post.id"
      :to="`/post/${post.id}`"
    >
      <div class="post-item">
        <img
          v-if="post.thumb"
          :src="post.thumb"
          class="post-thumb"
          alt="thumb"
        >
        <svg
          v-else
          class="thumb-placeholder"
          aria-hidden="true"
        >
          <use xlink:href="#icon-longmao" />
        </svg>
        <div class="content-wrap">
          <p class="title nowrap">
            {{ post.title }}
          </p>
          <div class="meta">
            <span class="time">
              {{ format(post.createdAt) }}
            </span>
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
          <div class="descript">
            {{ post.descript || '文章没有描述，进去看看？' | textClip(60) }}
          </div>
        </div>
        <span
          v-if="topLikeId === post.id"
          class="ribbon"
        >
          赞
        </span>
      </div>
    </nuxt-link>
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
$post-card-height: 11rem;
$half-ribbon-width: 1rem;

.post-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $post-card-height;
  margin-bottom: 2rem;
  color: $color-text;
  background-color: $white;
  border-radius: $radius;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .3);

  &::after {
    position: absolute;
    bottom: 0;
    left: 2%;
    z-index: -1;
    width: 96%;
    height: 30px;
    border-radius: 50% / 50%;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, .5);
    transition: box-shadow .25s;
    content: "";
  }

  &:hover {
    box-shadow: 0 1px 20px rgba(0, 0, 0, .3);
    transform: scale(1.01);

    &::after {
      box-shadow: 0 0 30px 3px rgba(0, 0, 0, .5);
    }
  }

  .post-thumb {
    min-width: $post-card-height;
    height: 100%;
    background: white;
  }

  .thumb-placeholder {
    width: $post-card-height;
    height: $post-card-height;
  }

  .content-wrap {
    flex: 1;
    height: 100%;
    padding: .625rem;
    padding-right: 2.2rem;
    overflow: hidden;
    background: $white;

    .title {
      margin-bottom: .5rem;
      font-weight: 700;
      font-size: 1.2rem;
    }

    .meta {
      display: flex;
      align-items: center;
      margin-bottom: .5rem;
      color: $color-text-desc;
      font-size: .875rem;

      i {
        color: $color-text-holder;
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

    .descript {
      color: $color-text-sub;
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
}

@media screen and (min-width: 1000px) {
  .post-item {
    height: $post-card-height + 1;

    .post-thumb {
      min-width: $post-card-height + 1;
    }

    .thumb-placeholder {
      width: $post-card-height + 1;
      height: $post-card-height + 1;
    }
  }
}
</style>
