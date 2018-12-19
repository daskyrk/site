<template>

  <ccard title="标签列表">
    <div slot="op">
      <el-button 
        type="primary" 
        size="small" 
        @click="showDialog('添加标签')">添加</el-button>
      <dialog-form 
        :title="dialogTitle" 
        :dialog-visible="dialogVisible" 
        :fields="fields" 
        :fields-value="fieldsValue" 
        :on-ok="onOk" 
        :on-cancel="onCancel" 
        :on-close="onClose"/>
    </div>

    <el-table 
      v-loading="fetch" 
      v-if="list.length" 
      :data="list" 
      style="width: 100%">
      <el-table-column 
        label="名称" 
        width="160">
        <template slot-scope="scope">
          <i class="iconfont icon-tag"/>
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column 
        label="描述" 
        show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="iconfont icon-description"/>
          {{ scope.row.descript }}
        </template>
      </el-table-column>
      <el-table-column 
        label="操作" 
        width="240">
        <template slot-scope="scope">
          <el-button 
            type="info" 
            icon="el-icon-edit" 
            circle 
            size="small" 
            @click="showDialog('修改标签', scope.row)"/>
          <el-button 
            :loading="isDeleting(scope.row) " 
            type="danger" 
            icon="el-icon-delete" 
            circle 
            size="small" 
            @click="deleteTag(scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
    <empty-holder v-else/>

    <el-pagination 
      slot="footer" 
      :current-page="query.pageNo" 
      :page-size="query.pageSize" 
      :total="total" 
      background 
      layout="prev, pager, next" 
      @current-change="pageChange"/>
  </ccard>
</template>

<script>
import DialogForm from '~/components/common/dialog-form'
import { mapState } from 'vuex'

export default {
  meta: {
    breadcrumb: '标签管理',
  },

  components: {
    DialogForm,
  },

  async fetch({ store }) {
    await store.dispatch('tag/getTags')
  },

  data() {
    return {
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
    }
  },

  computed: {
    ...mapState({
      fetch: state => state.fetch['admin/article#get'],
    }),
    ...mapState('tag', ['list', 'total', 'query']),
  },

  methods: {
    pageChange(pageNo) {
      this.$store.dispatch('tag/getTags', {
        pageNo,
      })
    },
    showDialog(title, data = null) {
      this.addMode = !data
      this.dialogTitle = title
      this.fieldsValue = data
      this.dialogVisible = true
    },
    onOk(data) {
      if (this.addMode) {
        this.$store.dispatch('tag/addTag', data)
      } else {
        this.$store.dispatch('tag/updateTag', data)
      }
      this.dialogVisible = false
    },
    deleteTag(data) {
      this.deletingId = data._id
      this.$store.dispatch('tag/delTag', data._id).then(() => {
        this.deletingId = null
      })
    },
    isDeleting(row) {
      return row._id === this.deletingId
    },
    onCancel() {
      this.dialogVisible = false
    },
    onClose() {
      this.dialogVisible = false
    },
  },
}
</script>
