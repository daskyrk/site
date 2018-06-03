import Vue from 'vue'
import * as filters from '~/filters'


export default () => {
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
};