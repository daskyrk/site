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
            <v-dialog v-model="dialogVisible" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn color="blue ma-0" small fab v-on="on" @click="showDialog(null)">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">新建标签</span>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-text-field
                            v-model="form.name"
                            label="名称"
                            :rules="rules.name"
                          />
                        </v-flex>
                        <v-flex xs12>
                          <v-textarea
                            v-model="form.descript"
                            label="描述"
                            :rules="rules.descript"
                            :counter="30"
                            clearable
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="grey" dark @click="onCancel">
                    关闭
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="onOk">
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
                  @click="showDialog(item)"
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
      valid: false,
      dialogVisible: false,
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
      rules: {
        name: [
          v => !!v || '必填',
        ],
        descript: [
          v => !!v || '必填',
          v => v.length < 30 || '少于30个字符',
        ],
      },
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
    resetForm() {
      this.form = { name: '', descript: '' }
      this.$refs.form.resetValidation()
    },
    showDialog(data) {
      if (data) {
        this.addMode = false
        this.form = { ...data }
      } else {
        this.addMode = true
        this.resetForm()
      }
      this.dialogVisible = true
    },
    onOk() {
      if (this.valid) {
        console.log('this.form:', this.form)
        if (this.addMode) {
          this.$store.dispatch('tag/addTag', this.form)
        } else {
          this.$store.dispatch('tag/updateTag', this.form)
        }
        this.dialogVisible = false
      }
    },
    deleteTag(data) {
      this.$store.dispatch('tag/delTag', data.id)
    },
    onCancel() {
      this.dialogVisible = false
      this.resetForm()
      // this.$refs.form.reset()
      // console.log('this.form:', this.form)
    },
  },
}
</script>
