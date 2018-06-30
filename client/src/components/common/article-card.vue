<template>
  <transition-group tag="div" name="slide-down">
    <nuxt-link v-for="article in list" :key='article._id' :to="`/article/${article._id}`">
      <div class="article-item">
        <img :src="article.thumb" class="article-thumb" alt="thumb">
        <div class="content-wrap">
          <p class='title'>
            {{article.title}}
          </p>
          <div class="meta">
            <span class="time">{{format(article.createdAt)}}</span>
            <span>
              <i class="iconfont icon-view"></i>
              {{article.meta.views}}
            </span>
            <span>
              <i class="iconfont icon-comment"></i>
              {{article.meta.comments}}
            </span>
            <span>
              <i class="iconfont icon-like"></i>
              {{article.meta.likes}}
            </span>
          </div>
          <div class="descript">
            {{article.descript || '文章没有描述，进去看看？' | textClip(60)}}
          </div>
        </div>
      </div>
    </nuxt-link>
  </transition-group>
</template>

<script>
import moment from 'moment';

export default {
  props: ['list'],
  computed: {
    fetch() {
      return this.$store.state.article.fetch;
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
.article-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 11rem;
  margin-bottom: 3rem;
  color: $color-text;
  border-radius: $radius;
  box-shadow: 0 0 20px 0px #cccccc8c;

  &:hover {
    box-shadow: 0 4px 50px 0px #ccc;
    transform: scale(1.02);
  }

  .article-thumb {
    height: 100%;
    min-width: 11rem;
  }

  .content-wrap {
    flex: 1;
    height: 100%;
    padding: 10px 20px;
    overflow: hidden;

    .title {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .meta {
      display: flex;
      align-items: center;
      color: $color-text-sub;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;

      .time {
        margin-right: 1.2rem;
      }

      span {
        margin-right: 0.75rem;
      }
    }

    .descript {
      color: $color-text-assist;
    }
  }
}

@media screen and (min-width: 1000px) {
  .article-item {
    height: 12rem;
    .article-thumb {
      min-width: 12rem;
    }
  }
}
</style>