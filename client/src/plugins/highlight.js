const hljs = require('highlight.js/lib/highlight');

const languages = [
  'xml',
  'bash',
  'coffeescript',
  'css',
  'markdown',
  'http',
  'java',
  'javascript',
  'json',
  'less',
  'makefile',
  'nginx',
  'php',
  'python',
  'scss',
  'sql',
  'stylus',
];

// languages.forEach(lang => {
//   const langPath = `highlight.js/lib/languages/${lang}`;
//   hljs.registerLanguage(lang, require(langPath));
// });

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'))
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'))
hljs.registerLanguage('coffeescript', require('highlight.js/lib/languages/coffeescript'))
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'))
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'))
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'))
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'))
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'))
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'))
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'))
hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'))
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'))
hljs.registerLanguage('php', require('highlight.js/lib/languages/php'))
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'))
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'))
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'))
hljs.registerLanguage('stylus', require('highlight.js/lib/languages/stylus'))

hljs.configure({
  classPrefix: '', // don't append class prefix
});

exports.hljs = hljs;
exports.languages = languages;
