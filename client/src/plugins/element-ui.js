import '../assets/style/element-variables.scss'

import Element from 'element-ui'
import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, { locale })
}
