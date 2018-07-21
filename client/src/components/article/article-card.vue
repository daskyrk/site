<template>
  <transition-group tag="div" name="slide-down">
    <nuxt-link v-for="article in list" :key='article._id' :to="`/article/${article._id}`">
      <div class="article-item">
        <img v-if="article.thumb" :src="article.thumb" class="article-thumb" alt="thumb">
        <svg v-else class="thumb-placeholder" aria-hidden="true">
          <use xlink:href="#icon-longmao"></use>
        </svg>
        <div class="content-wrap">
          <p class='title nowrap'>
            {{article.title}}
          </p>
          <div class="meta">
            <span class="time">{{format(article.createdAt)}}</span>
            <span>
              <i class="iconfont icon-chakan"></i>
              {{article.meta.views}}
            </span>
            <span>
              <i class="iconfont icon-pinglun"></i>
              {{article.meta.comments}}
            </span>
            <span>
              <i class="iconfont icon-xihuan"></i>
              {{article.meta.likes}}
            </span>
          </div>
          <div class="descript">
            {{article.descript || '文章没有描述，进去看看？' | textClip(60)}}
          </div>
        </div>
        <span v-if="topLikeId === article.id" class="ribbon">赞</span>
      </div>
    </nuxt-link>
  </transition-group>
</template>

<script>
import moment from 'moment';

export default {
  props: ['list'],

  computed: {
    topLikeId() {
      let max = 0;
      let id = null;
      this.list.forEach(t => {
        if (t.meta.likes > max) {
          max = t.meta.likes;
          id = t.id;
        }
      });
      return max === 0 ? null : id;
    },
  },

  methods: {
    format: function(timestamp) {
      const date = moment(timestamp);
      const week = date.weekday();
      const toWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return `${date.format('YYYY · MM · DD')} ${toWeek[week]}`;
    },
  },
};
</script>

<style lang='scss' scoped>
$article-card-height: 11rem;
$half-ribbon-width: 1rem;

.article-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $article-card-height;
  margin-bottom: 2rem;
  color: $color-text;
  border-radius: $radius;
  background-color: $white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    height: 30px;
    left: 2%;
    bottom: 0px;
    width: 96%;
    z-index: -1;
    transition: box-shadow 0.25s;
    box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.5);
    border-radius: 50%/50%;
  }

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 1px 20px rgba(0, 0, 0, 0.3);
    &::after {
      box-shadow: 0 0 30px 3px rgba(0, 0, 0, 0.5);
    }
  }

  .article-thumb {
    height: 100%;
    min-width: $article-card-height;
    background: white;
  }

  .thumb-placeholder {
    width: $article-card-height;
    height: $article-card-height;
  }

  .content-wrap {
    flex: 1;
    height: 100%;
    padding: 0.625rem;
    padding-right: 2.2rem;
    background: $white;
    overflow: hidden;

    .title {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .meta {
      display: flex;
      align-items: center;
      color: $color-text-sub;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;

      i {
        color: $color-text-sub-assist;
        vertical-align: middle;
      }

      span {
        margin-right: 0.75rem;
        line-height: 1.375rem;
      }

      .time {
        margin-right: 1.2rem;
      }
    }

    .descript {
      color: $color-text-assist;
    }
  }

  .ribbon {
    display: inline-block;
    top: -6px;
    right: 1rem;
    position: absolute;
    width: 2 * $half-ribbon-width;
    text-align: center;
    padding: 10px 0 4px;
    background: $orange;
    border-top-left-radius: $radius;
    color: $white;

    &:before {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      border-bottom: 6px solid #8d5a20;
      border-right: 4px solid transparent;
      right: -4px;
      top: 0;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -$half-ribbon-width;
      width: 0;
      height: 0;
      border-left: $half-ribbon-width solid $orange;
      border-right: $half-ribbon-width solid $orange;
      border-bottom: $half-ribbon-width solid transparent;
    }
  }
}

@media screen and (min-width: 1000px) {
  .article-item {
    height: $article-card-height + 1;
    .article-thumb {
      min-width: $article-card-height + 1;
    }

    .thumb-placeholder {
      width: $article-card-height + 1;
      height: $article-card-height + 1;
    }
  }
}
</style>