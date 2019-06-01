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
                            v-model="form.description"
                            label="描述"
                            :rules="rules.description"
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

            <confirm tip="确定要彻底删除废弃标签吗？" :ok="() => cleanTags()">
              <v-btn
                fab
                small
                color="red"
              >
                <i class="material-icons">delete_forever</i>
              </v-btn>
            </confirm>
          </template>
          <v-data-table
            :headers="headers"
            :items="list"
            disable-initial-sort
          >
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td><span :class="item.removed && 'removed-tag'">{{ item.name }}</span></td>
              <td>
                {{ item.description }}
              </td>
              <td>
                {{ item.createdAt | dateFormat('YYYY.MM.DD') }}
              </td>
              <td class="text-xs-right">
                <v-btn
                  fab
                  small
                  color="success"
                  class="mr-2"
                  :disabled="item.state === 1"
                  @click="showDialog(item)"
                >
                  <v-icon> edit </v-icon>
                </v-btn>
                <confirm v-if="item.removed" tip="确定要恢复吗？" :ok="() => removeTag(item, false)">
                  <v-btn
                    fab
                    small
                    color="info"
                  >
                    <i class="material-icons">restore_from_trash</i>
                  </v-btn>
                </confirm>
                <confirm v-else tip="确定要废弃吗？" :ok="() => removeTag(item, true)">
                  <v-btn
                    fab
                    small
                    color="danger"
                  >
                    <i class="material-icons">delete</i>
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
          value: 'description',
        },
        {
          text: '创建时间',
          value: 'createdAt',
        },
      ],
      form: {
        name: '',
        description: '',
      },
      rules: {
        name: [
          v => !!v || '必填',
        ],
        description: [
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
      this.form = { name: '', description: '' }
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
    removeTag(data, removed) {
      this.$store.dispatch('tag/updateTag', { ...data, removed })
    },
    cleanTags() {
      this.$store.dispatch('tag/cleanTags')
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

.<style lang="scss">
.removed-tag {
  color: $color-disabled;
  text-decoration: line-through $color-disabled;
}
</style>
