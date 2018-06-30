import moment from 'moment';

export function dateFormat(time, format) {
  return moment(time).format(format);
}

export function textClip(text = '', limit = 20, append = '...') {
  return text.length > limit ? text.slice(0, limit) + append : text;
}
