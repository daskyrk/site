// 批量注册全局组件
import '~/components/global'
import Vue from 'vue'
import EmptyHolder from '~/components/common/empty-holder'

export default () => {
  Vue.component('empty-holder', EmptyHolder)
}
