import moment from 'moment';

export function dateFormat(time, format) {
  return moment(time).format(format);
}
