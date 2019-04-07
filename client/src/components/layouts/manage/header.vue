<template>
  <header class="manage-header">
    <div class="header-left">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <template v-for="item in breadcrumb">
          <el-breadcrumb-item
            :key="item.path"
            :to="item.url"
          >
            {{ item.title }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <span class="header-operation">
        <img
          :src="user.avatar"
          class="avatar"
          alt="avatar"
        >
      </span>
      <nuxt-link
        class="header-operation op"
        to="/"
      >
        <i class="iconfont icon-switch" />
      </nuxt-link>
      <span
        class="header-operation op"
        @click="logout"
      >
        <i class="iconfont icon-logout" />
      </span>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    breadcrumb() {
      return this.$store.state.breadcrumb
    },
    user() {
      return this.$store.state.user.userInfo
    },
  },
  methods: {
    logout(command) {
      this.$store.commit('user/LOGOUT')
      this.$router.push('/')
    },
  },
}
</script>


<style lang="scss" scoped>
$header-bg: #3c4049;
$header-bg-hover: #222630;
$header-color: #aab1c3;
$header-color-hover: $white;

.manage-header {
  padding-left: $layout-padding;
  height: $header-height;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  z-index: 9;
  background: $header-bg;
  color: $header-color;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  /deep/ .el-breadcrumb__inner {
    a,
    &.is-link {
      color: $header-color;
      &:hover {
        color: $header-color-hover;
      }
    }
  }
}

.header-right {
  display: flex;
  height: 100%;
  .avatar {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
  }
}

.header-operation {
  display: flex;
  width: 4.5rem;
  align-items: center;
  justify-content: center;

  i {
    font-size: 1.25rem;
  }

  &.op:hover {
    cursor: pointer;
    color: $header-color-hover;
    background-color: $header-bg-hover;
  }
}
</style>
