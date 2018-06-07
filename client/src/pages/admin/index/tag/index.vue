<template>
  <div class="list">
    <div>
      <el-button type="primary" size="medium" @click="showDialog('添加标签')">添加</el-button>
      <dialog-form :title="dialogTitle" :dialogVisible="dialogVisible" :fields="fields" :fieldsValue="fieldsValue" :onOk="onOk" :onCancel="onCancel" :onClose="onClose">
      </dialog-form>
    </div>

    <div class="table">
      <el-table :data="list" style="width: 100%" v-loading="fetch">
        <el-table-column label="名称" width="160">
          <template slot-scope="scope">
            <i class="iconfont icon-tag"></i>
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="iconfont icon-description"></i>
            {{ scope.row.descript }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button type="info" size="small" @click="showDialog('修改标签', scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="deleteTag(scope.row)" :loading="scope.row._id === deletingId">{{ scope.row._id === deletingId ? '删除中' : '删 除' }}</el-button>
            <!-- <el-button type="text" class="darg" size="small">
              <i class="iconfont icon-drag"></i>
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination :current-page="query.pageNo" background layout="prev, pager, next" :page-size="query.pageSize" @current-change="pageChange" :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import DialogForm from '~/components/common/dialog-form';
import { mapState } from 'vuex';

export default {
  meta: {
    breadcrumb: '标签管理',
  },

  components: {
    DialogForm,
  },

  fetch({ store }) {
    return store.dispatch('tag/getTags');
  },

  data() {
    return {
      fetch: false,
      dialogVisible: false,
      dialogTitle: '',
      fields: [
        {
          $id: 'name',
          $type: 'input',
          label: '标签名',
          rules: [
            { required: true, message: '请输入标签名称', trigger: 'blur' },
          ],
          prop: 'name',
        },
        {
          $id: 'descript',
          $type: 'input',
          label: '标签描述',
          prop: 'descript',
          $el: {
            maxlength: 30,
            placeholder: '不超过30个字符',
          },
        },
      ],
      fieldsValue: undefined,
      addMode: true,
      deletingId: null,
    };
  },

  computed: mapState('tag', ['list', 'total', 'query']),

  methods: {
    pageChange(pageNo) {
      this.$store.dispatch('tag/getTags', {
        pageNo,
      });
    },
    showDialog(title, data = null) {
      this.addMode = !data;
      this.dialogTitle = title;
      this.fieldsValue = data;
      this.dialogVisible = true;
    },
    onOk(data) {
      if (this.addMode) {
        this.$store.dispatch('tag/addTag', data);
      } else {
        this.$store.dispatch('tag/updateTag', data);
      }
      this.dialogVisible = false;
    },
    deleteTag(data) {
      this.deletingId = data._id;
      this.$store.dispatch('tag/delTag', data._id).then(() => {
        this.deletingId = null;
      });
    },
    onCancel() {
      this.dialogVisible = false;
    },
    onClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.table {
  i {
    margin-right: 5px;
  }
}

.pagination {
  margin-top: 10px;
  .el-pagination {
    float: right;
  }
}
</style>

