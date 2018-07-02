<template>
  <aside :class="['manage-sidebar', {fold: foldSidebar}]">
    <div class="logo"></div>

    <ul class="menus">
      <li v-for="(menu, index) in menus" :key='index'>
        <nuxt-link :to='menu.link'>
          <el-tooltip effect="dark" :disabled="!foldSidebar" :content="menu.text" placement="right">
            <div class="menu-item">
              <i :class="['iconfont', `icon-${menu.icon}`]"></i>
              <span>{{menu.text}}</span>
            </div>
          </el-tooltip>
        </nuxt-link>
      </li>
    </ul>

    <div class='toggle-side' @click="foldSidebar = !foldSidebar">
      <i class="iconfont icon-fold"></i>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      foldSidebar: false,
      menus: process.env.adminMenus,
    };
  },
};
</script>


<style lang="scss" scoped>
$transition: all 0.25s;
$sidebar-bg: #1f2532;
$sidebar-bg-hover: #2c3242;
$sidebar-text: rgba(255, 255, 255, 0.65);
$sidebar-text-hover: $white;
$manage-sidebar-open-width: 12.5rem;
$manage-sidebar-close-width: 4.5rem;

.manage-sidebar {
  width: $manage-sidebar-open-width;
  background-color: $sidebar-bg;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: width 0.25s;
  user-select: none;
  i {
    font-size: 1.125rem;
  }

  &.fold {
    width: $manage-sidebar-close-width;
    .logo {
      background-image: url(~static/images/t-white.png);
    }
    .menu-item {
      padding-left: 1.75rem;
      span {
        opacity: 0;
      }
    }
    .toggle-side {
      i {
        transform: rotate(90deg);
      }
    }
  }
}

.logo {
  width: 100%;
  height: $header-height;
  background-image: url(~static/images/logo_reverse.png);
  background-size: auto 1.5rem;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: background-image 0.3s;
}

.menus {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  text-align: center;
  > li {
    margin-top: 10px;
  }
  .menu-item {
    height: 3rem;
    line-height: 3rem;
    overflow: hidden;
    padding-left: 2.5rem;
    text-align: left;
    color: $sidebar-text;
    outline: none;
    transition: padding-left 0.3s;
    &:hover {
      color: $sidebar-text-hover;
      background-color: $sidebar-bg-hover;
    }
    i {
      transition: $transition;
    }
    span {
      transition: $transition;
      margin-left: 0.625rem;
    }
  }
}

.toggle-side {
  height: 2.5rem;
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
    font-size: 1.125rem;
    transition: $transition;
  }
  &:hover {
    i {
      color: $sidebar-text-hover;
    }
  }
}
</style>
