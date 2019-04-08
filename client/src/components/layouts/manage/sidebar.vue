<template>
  <aside :class="['manage-sidebar', {fold: foldSidebar}]">
    <div class="logo" />
    <!-- <div class="logo-wrap">
      <div class="owner">{{owner}}</div>
    </div> -->

    <ul class="menus">
      <li
        v-for="(menu, index) in menus"
        :key="index"
        :class="{ active: menu.active }"
      >
        <nuxt-link :to="menu.link">
          <el-tooltip
            :disabled="!foldSidebar"
            :content="menu.text"
            effect="dark"
            placement="right"
          >
            <div class="menu-item">
              <i :class="['iconfont', `icon-${menu.icon}`]" />
              <span>{{ menu.text }}</span>
            </div>
          </el-tooltip>
        </nuxt-link>
      </li>
    </ul>

    <div
      class="toggle-side"
      @click="foldSidebar = !foldSidebar"
    >
      <i class="iconfont icon-fold" />
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      foldSidebar: false,
      owner: this.$getConfig('owner'),
    }
  },

  computed: {
    menus() {
      const menus = this.$getConfig('adminMenus');
      const path = this.$route.path
      let longestMatch = menus[0]
      menus.map(m => {
        if (path.includes(m.link) && m.link.length > longestMatch.link.length) {
          longestMatch = m
        }
      })
      longestMatch.active = true
      return menus
    },
  },
}
</script>


<style lang="scss" scoped>
$transition: all 0.25s;
$sidebar-bg: #303642;
$sidebar-bg-hover: #222630;
$sidebar-text: rgba(255, 255, 255, 0.65);
$sidebar-text-hover: $white;
$manage-sidebar-open-width: 12.5rem;
$manage-sidebar-close-width: 4.5rem;
$sidebar-tip-width: 0.25rem;

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
    // .owner {
    //   opacity: 0;
    //   flex: 0;
    //   transform: scale(0);
    // }
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

// .logo-wrap {
//   display: flex;
//   width: 100%;
//   height: $header-height;
// }

.logo {
  width: 100%;
  height: $header-height;
  background-image: url(~assets/images/logo.svg);
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: $transition;
}

// .owner {
//   flex: 1;
//   display: inline-flex;
//   align-items: center;
//   color: $white;
//   opacity: 1;
//   font-size: 1.125rem;
//   letter-spacing: 0.25rem;
//   transition: $transition;
// }

.menus {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  text-align: center;
  > li {
    position: relative;
    margin-top: 10px;
    &.active {
      &::before {
        content: '';
        left: 0;
        height: 100%;
        position: absolute;
        border-left: $sidebar-tip-width solid $green;
      }
      .menu-item {
        color: $sidebar-text-hover;
        background-color: $sidebar-bg-hover;
        i {
          color: $green;
        }
      }
    }
  }
  .menu-item {
    height: 3rem;
    line-height: 3rem;
    overflow: hidden;
    padding-left: 3rem;
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
