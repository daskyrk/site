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
      // TODO: use nuxt-link-active
      menus.map(m => {
        m.active = false;
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
$transition: all .25s;
$sidebar-bg: #303642;
$sidebar-bg-hover: #222630;
$sidebar-text: rgba(255, 255, 255, .65);
$sidebar-text-hover: $white;
$manage-sidebar-open-width: 12.5rem;
$manage-sidebar-close-width: 4.5rem;
$sidebar-tip-width: .25rem;

.manage-sidebar {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: $manage-sidebar-open-width;
  background-color: $sidebar-bg;
  transition: width .25s;
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


  // .logo-wrap {
  //   display: flex;
  //   width: 100%;
  //   height: $header-height;
  // }
  .logo {
    width: 100%;
    height: $header-height;
    background-image: url(~assets/images/logo.svg);
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: contain;
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
    flex: 1;
    flex-direction: column;
    width: 100%;
    text-align: center;

    > li {
      position: relative;
      margin-top: 10px;

      &.active {
        &::before {
          position: absolute;
          left: 0;
          height: 100%;
          border-left: $sidebar-tip-width solid $green;
          content: "";
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
      padding-left: 3rem;
      overflow: hidden;
      color: $sidebar-text;
      line-height: 3rem;
      text-align: left;
      outline: none;
      transition: padding-left .3s;

      &:hover {
        color: $sidebar-text-hover;
        background-color: $sidebar-bg-hover;
      }

      i {
        transition: $transition;
      }

      span {
        margin-left: .625rem;
        transition: $transition;
      }
    }
  }

  .toggle-side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    color: $sidebar-text;
    background-color: $sidebar-bg;
    border-top: 1px solid hsla(0, 0%, 100%, .25);
    cursor: pointer;
    transition: $transition;

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
}

</style>
