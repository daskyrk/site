import { appConfig } from '@@/config';
import io from 'socket.io-client';

let isConnected = false;
const socket = io('http://localhost:8000')

socket.on('connect', m => {
  console.log('[socket] connected')
  isConnected = true
  cleanStoreSub();
  cleanStoreMsg();
})
socket.on('disconnect', m => {
  console.log('[socket] disconnect')
  isConnected = false
})

// 保存一下未连接之前或断开连接时的Subscribe和msg，连接后恢复注册和发送
const storeSub = [];
const cleanStoreSub = () => {
  storeSub.forEach(ags => socket.on(...ags))
}

const storeMsg = [];
const cleanStoreMsg = () => {
  storeMsg.forEach(ags => socket.emit(...ags))
}

/**
 * 在context、vue instance、vuex 中注入方法 $getConfig
 * usage:
 *   this.$getConfig(key)
 *   context.app.$getConfig(key)
 */
export default ({ app }, inject) => {
  inject('getConfig', (key) => key ? appConfig[key] : appConfig)

  inject('wsSend', (...args) => {
    if (isConnected) {
      cleanStoreMsg();
      socket.emit(...args);
    } else {
      storeMsg.push(args);
    }
  })
  inject('wsOn', (...args) => {
    if (isConnected) {
      cleanStoreSub();
      socket.on(...args);
    } else {
      storeSub.push(args);
    }
  })
}
