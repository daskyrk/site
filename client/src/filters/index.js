import moment from 'moment';

export function dateFormat(time, format) {
  return moment(time).format(format);
}

export function textClip(text = '', limit = 20, append = '...') {
  return text.length > limit ? text.slice(0, limit) + append : text;
}

export function waterMark(src) {
  return `${src}?imageView2/0/q/75|watermark/2/text/ZGFza3lyay5tZQ==/font/5b6u6L2v6ZuF6buR/fontsize/280/fill/I0ZDRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim`;
}
