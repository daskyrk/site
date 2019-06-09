import marked from 'marked'
import { hljs, languages } from './highlight'
const renderer = new marked.Renderer()

marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  highlight(code, lang) {
    if (languages.includes(lang)) {
      return hljs.highlight(lang, code).value
    }
    return hljs.highlightAuto(code).value
  },
})

// 段落解析
// const paragraphParse = text => {
//   const textIsImage = text.includes('<img')
//   if (textIsImage) return `<div class="image-package">${text}</div>`
//   return `<p>${text}</p>`
// }
// renderer.paragraph = paragraphParse

// 替换列表中checkbox的代码，改变一下样式
renderer.listitem = (text, isTask, checked) => {
  if (!isTask) {
    return text;
  }
  return `
<li class="checkbox-container">
  <label class="checkbox-label">
    <input disabled type="checkbox"${checked?' checked':''}>
    <span class="input-title">
      ${text.replace(/<input .+>/, '')}
    </span>
    <span class="checkbox-custom" />
  </label>
</li>
`
}

export default content => {
  if (typeof content !== 'string') {
    return ''
  }

  return marked(content, { renderer })
}
