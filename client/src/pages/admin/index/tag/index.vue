<template>
  <div class="tags">
    <div class="add-tag-form">

      <el-form :model="form" :inline="true" status-icon :rules="rules" ref="form" label-width="160px" class="add-tag-form">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="descript">
          <el-input placeholder="不超过30字" maxlength='30' v-model="form.descript">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- <div class="search">
        <el-input v-model="keyword" placeholder="name..." @keyup.enter.native="getData" icon="search" :on-icon-click="getData" size="small"></el-input>
      </div> -->
    </div>
    <div class="table">
      <el-table :data="tags" style="width: 100%" v-loading="fetch">
        <el-table-column label="名称" width="160" label-class-name="head" show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont icon-tag mar"></i>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="描述" min-width="320" label-class-name="head">
          <template slot-scope="scope">
            <i class="iconfont icon-descript mar"></i>
            {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column prop="count" label="文章" width="80" label-class-name="head">
        </el-table-column>
        <el-table-column label="操作" width="240" label-class-name="head">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="editTag(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteTag(scope.row)" :disabled="scope.row.deleteing">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
            <el-button type="text" class="darg" size="small">
              <i class="iconfont icon-list"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination :current-page="currentPage" layout="prev, pager, next" :page-size="16" @current-change="pageChange" :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  meta: {
    breadcrumb: '标签管理',
  },
  data() {
    return {
      fetch: false,
      tags: this.$store.state.tag.tags,
      total: 0,
      currentPage: this.$store.state.tag.pagination.pageNo,
      form: {
        name: '',
        descript: '',
      },
      rules: {
        name: [{ required: true, trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('tag/addTag', this.form).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
            });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    pageChange(pageNo) {},
  },
};
</script>
