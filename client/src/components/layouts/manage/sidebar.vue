<template>
  <div :class="['manage-sidebar', {fold: foldSidebar}]">
    <div class="logo-wrap"></div>
    <ul class="menus">
      <li v-for="(menu, index) in menus" :key='index'>
        <nuxt-link :to='menu.link' append>
          <div class="menu-item">
            <i :class="['iconfont', `icon-${menu.icon}`]"></i>
            <span>{{menu.text}}</span>
          </div>
        </nuxt-link>
      </li>
    </ul>

    <div class='toggle-side' @click="foldSidebar = !foldSidebar">
      <i class="iconfont icon-fold"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foldSidebar: false,
      menus: [
        {
          link: './article',
          text: '文章管理',
          icon: 'article',
        },
        {
          link: './setting',
          text: '系统设置',
          icon: 'setting',
        },
      ],
    };
  },
  methods: {
    toggleFold() {
      // this.
    },
  },
};
</script>


<style lang="scss" scoped>
$transition: all 0.3s;
$sidebar-bg: #1f2532;
$sidebar-bg-hover: #2c3242;
$sidebar-text: rgba(255, 255, 255, 0.65);
$sidebar-text-hover: $white;

.manage-sidebar {
  width: $manage-sidebar-open-width;
  background-color: $sidebar-bg;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid $grey;
  transition: width 0.3s;
  i {
    font-size: 18px;
  }

  &.fold {
    width: $manage-sidebar-close-width;
    .logo-wrap {
      background-image: url(~static/images/t-white.png);
    }
    .menu-item {
      i {
        transform: translateX(26px);
      }
      span {
        transform: scale(0);
      }
    }
    .toggle-side {
      i {
        transform: rotate(90deg);
      }
    }
  }
}

.logo-wrap {
  width: 100%;
  height: 64px;
  background-image: url(~static/images/logo_reverse.png);
  background-size: auto 24px;
  background-position: 50%;
  background-repeat: no-repeat;
  transition-property: background-image 0.3s;
}

.menus {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  text-align: center;
  .menu-item {
    display: flex;
    justify-content: center;
    color: $sidebar-text;
    height: 45px;
    line-height: 45px;
    &:hover {
      color: $sidebar-text-hover;
      background-color: $sidebar-bg-hover;
    }
    i {
      transition: $transition;
    }
    span {
      transition: $transition;
      margin-left: 10px;
    }
  }
}

.toggle-side {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $sidebar-text;
  border-top: 1px solid hsla(0, 0%, 100%, 0.25);
  background-color: $sidebar-bg;
  transition: $transition;
  cursor: pointer;
  i {
    font-size: 18px;
    transition: $transition;
  }
  &:hover {
    i {
      color: $sidebar-text-hover;
    }
  }
}
</style>
