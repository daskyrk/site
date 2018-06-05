<template>
  <div class="tags">
    <div class="btn">
      <el-button size="small" @click="addTag" type="primary">增加标签</el-button>
      <div class="search">
        <el-input v-model="keyword" placeholder="name..." @keyup.enter.native="getData" icon="search" :on-icon-click="getData" size="small"></el-input>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tags"
        style="width: 100%"
        v-loading="fetch">
        <el-table-column
          label="名称"
          width="160"
          label-class-name="head"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont icon-tag mar"></i>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="320"
          label-class-name="head">
          <template slot-scope="scope">
            <i class="iconfont icon-descript mar"></i>
              {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="文章"
          width="80"
          label-class-name="head">
        </el-table-column>
        <el-table-column
          label="操作"
          width="240"
          label-class-name="head">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="editTag(scope.row)">修改</el-button>
            <el-button
              type="danger"
              size="small"
              @click="deleteTag(scope.row)"
              :disabled="scope.row.deleteing">{{ scope.row.deleteing ? '删除中' : '删 除' }}</el-button>
            <el-button type="text" class="darg" size="small"><i class="iconfont icon-list"></i></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          :current-page="currentPage"
          layout="prev, pager, next"
          :page-size="16"
          @current-change="pageChange"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-form :model="form" ref="form" v-if="dialogV">
      <el-form-item label="名称" prop="name" :rules="[
          { required: true, message: '名称', trigger: 'blur' }
        ]">
        <el-input v-model="form.name" :maxlength="20" placeholder="name"></el-input>
      </el-form-item>
      <el-form-item label="描述" class="descript">
        <el-input type="textarea" v-model="form.descript" :maxlength="100" :rows="3" placeholder="descript"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="dialogV = false">取 消</el-button>
    <el-button type="primary" @click="submit('form')" :disabled="posting">
      {{ posting ? '提交中' : '确 定'}}
    </el-button>
  </div>
</template>

<script>
export default {
  meta: {
    breadcrumb: '标签管理',
  },
  data() {
    return {
      fetch:false,
      tags: [],
      form: {
        name: '',
        descript: '',
      },
    };
  },
  methods: {
    addTag() {},
    getData(key) {},
  },
};
</script>
