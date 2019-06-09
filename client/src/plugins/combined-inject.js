import { appConfig } from '@@/config';

/**
 * 在context、vue instance、vuex 中注入方法 $getConfig
 * usage:
 *   this.$getConfig(key)
 *   context.app.$getConfig(key)
 */
export default ({ app }, inject) => {
  inject('getConfig', (key) => key ? appConfig[key] : appConfig)
}
