<template>
  <transition-group tag="div" name="slide-down">
    <div class="article-item" v-for="article in list" :key='article._id'>
      <div class="meta">
        <p class="time">{{format(article.createdAt)}}</p>
        <p class="summary">
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
        </p>
      </div>
      <div class="content-wrap">
        <p class='title'>
          <nuxt-link :to="`/article/${article._id}`">{{article.title}}</nuxt-link>
        </p>
        <div class="descript">
          {{article.descript}}
        </div>
      </div>
    </div>
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
  min-height: 180px;
  margin-bottom: 3rem;
  color: $color-text;
  border-bottom: 1px solid $color-border;

  .meta {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    border-right: 1px solid $color-border;

    i {
      font-size: 1.3rem;
    }

    .time {
      margin-bottom: 20px;
    }

    .summary {
      display: flex;
      justify-content: space-around;
      span {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .content-wrap {
    flex: 1;
    padding: 10px 20px;
    overflow: hidden;

    .title {
      margin-bottom: 0.5rem;
      font-size: 1.6rem;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>