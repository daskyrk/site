import dayjs from 'dayjs'

export function dateFormat(time, format) {
  return dayjs(time).format(format)
}

export function fromNow(time) {
  return dayjs(time).fromNow()
}

export function toNow(time) {
  return dayjs(time).toNow(true)
}

export function textClip(text = '', limit = 20, append = '...') {
  return text.length > limit ? text.slice(0, limit) + append : text
}

export function waterMark(src) {
  return `${src}?imageView2/0/q/75|watermark/2/text/ZGFza3lyay5tZQ==/font/5b6u6L2v6ZuF6buR/fontsize/280/fill/I0ZDRkFGQQ==/dissolve/100/gravity/SouthEast/dx/10/dy/10|imageslim`
}

// https://images.weserv.nl
export function dealImg(src, options) {
  let params = ''
  if (options) {
    params =
      '&' +
      Object.keys(options)
        .reduce((all, k) => all.concat(`${k}=${options[k]}`), [])
        .join('&')
  }
  const url = src.startsWith('https://')
    ? src.substring('https://'.length)
    : src.startsWith('http://')
      ? src.substring('http://'.length)
      : src
  return `https://images.weserv.nl/?url=${url}${params}`
}
