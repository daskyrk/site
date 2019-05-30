<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          class="card-tabs"
          title="标签"
        >
          <template slot="operation">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="blue ma-0" small fab v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">新建标签</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-text-field label="名称" required />
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          v-model="form.descript"
                          prepend-icon="iconfont icon-description"
                          label="描述"
                          :counter="200"
                          clearable
                        />
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="grey" dark @click="dialog = false">
                    关闭
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="dialog = false">
                    保存
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <v-data-table
            :headers="headers"
            :items="list"
            hide-actions
          >
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>
                {{ item.descript }}
              </td>
              <td class="text-xs-right">
                <v-btn
                  fab
                  small
                  color="green"
                  class="mr-2"
                  :disabled="item.state === 1"
                  @click="updateComment(item, 1)"
                >
                  <v-icon> edit </v-icon>
                </v-btn>
                <confirm tip="确定要删除吗？" :ok="() => deleteTag(item)">
                  <v-btn
                    fab
                    small
                    color="red"
                  >
                    <v-icon> delete </v-icon>
                  </v-btn>
                </confirm>
              </td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  meta: {
    breadcrumb: '标签管理',
  },

  components: {
    // DialogForm,
  },

  data() {
    return {
      dialog: false,
      dialogTitle: '',
      headers: [
        {
          sortable: false,
          text: '标签名',
          value: 'name',
        },
        {
          sortable: false,
          text: '标签描述',
          value: 'descript',
        },
      ],
      form: {
        name: '',
        descript: '',
      },
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
      fetch: state => state.fetch['/post#get'],
    }),
    ...mapState('tag', ['list', 'total', 'query']),
  },

  async fetch({ store }) {
    await store.dispatch('tag/getTags')
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
      this.deletingId = data.id
      this.$store.dispatch('tag/delTag', data).then(() => {
        this.deletingId = null
      })
    },
    isDeleting(row) {
      return row.id === this.deletingId
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
