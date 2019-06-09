import { appConfig } from '@@/config';

if (process.env.NODE_ENV === 'production') {
  function getCopyright(split = '\n', wrapBefore = '\n', wrapAfter = '') {
    return [
      wrapBefore,
      '著作权归作者所有。',
      '商业转载请联系作者获得授权，非商业转载请注明出处。',
      '作者：' + appConfig.owner || 'lijun',
      '链接：' + location.href,
      '来源：' + appConfig.site || 'https://lijun.space',
      wrapAfter,
    ].join(split)
  }

  // 拼接成text
  const buildText = content => {
    return content + getCopyright()
  }

  // 拼接成html
  const buildHtml = content => {
    return content + getCopyright('<br />', '<div>', '</div>')
  }

  if (window.getSelection) {
    document.addEventListener('copy', e => {
      // clipboard.js触发的复制不用加版权信息
      if (
        e.target.nodeName === 'TEXTAREA' &&
        e.target.parentNode.tagName === 'BODY'
      ) {
        return
      }
      const content = window.getSelection().toString()
      e.clipboardData.setData('text/plain', buildText(content))
      e.clipboardData.setData('text/html', buildHtml(content))
      e.preventDefault()
    })
  }
}
