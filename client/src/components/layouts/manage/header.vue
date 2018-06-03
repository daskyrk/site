<template>
  <header class="manage-header">
    <div class="header-left">
      <el-breadcrumb v-if="$route.path !== '/admin'" separator-class="el-icon-arrow-right">
        <template v-for="path in paths">
          <el-breadcrumb-item :key='path.path' :to='path.url'>
            {{path.text}}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-dropdown @command='handleCommand'>
        <span class="el-dropdown-link">
          <img class="avatar" src="http://terminus-paas.oss-cn-hangzhou.aliyuncs.com/pmp/attachments/6fe96ed1-d713-4267-b9d9-d4016da6ef13.jpg" alt="avatar">
          <span>daskyrk</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <nuxt-link to='/'>前台</nuxt-link>
          </el-dropdown-item>
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
const map = {
  admin: '总览',
  article: '文章管理',
  add: '添加',
};

export default {
  computed: {
    paths() {
      const paths = [];
      const parts = this.$route.path.match(/\/\w+/g);

      if (parts) {
        parts.reduce((parent, item) => {
          paths.push({
            text: map[item.slice(1)],
            url: (parent += item),
          });
          return parent;
        }, '');
      }

      return paths;
    },
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.commit('user/LOGOUT');
        this.$router.push('/');
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.manage-header {
  padding: 0 1rem;
  height: $header-height;
  background-color: $white;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.header-right {
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    margin-right: 1rem;
  }
}
</style>
