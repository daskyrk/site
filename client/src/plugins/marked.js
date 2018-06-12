import marked from 'marked';
import { hljs, languages } from './highlight';
const renderer = new marked.Renderer();

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
      return Hljs.highlight(lang, code).value;
    }
    return Hljs.highlightAuto(code).value;
  },
});

export default content => {
  if (typeof content !== 'string') {
    return '';
  }

  return marked(content, { renderer });
};
