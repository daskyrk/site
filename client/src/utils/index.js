
// setLS('a.arr', [1,2]);
export function setLS(keyPath, value) {
  const LSPath = keyPath.split('.');
  const LSKey = LSPath.splice(0, 1);
  let json = JSON.parse(localStorage.getItem(LSKey)) || {};
  if (LSPath.length) {
    const key = LSPath.splice(-1)[0];
    const target = LSPath.reduce((pre, next) => pre[next], json);
    if (Array.isArray(target) && !Number.isInteger(+key)) {
      throw new TypeError(`can not set attr '${key}' to Array '${target}'`);
    }
    target[key] = value;
  } else {
    json = value;
  }
  localStorage.setItem(LSKey, JSON.stringify(json));
}

export function getLS(keyPath) {
  const LSPath = keyPath.split('.');
  const LSKey = LSPath.splice(0, 1);
  const json = JSON.parse(localStorage.getItem(LSKey)) || {};
  const result = LSPath.reduce((pre, next) => pre[next], json);
  return result;
}

export function removeLS(keyPath) {
  const LSPath = keyPath.split('.');
  const LSKey = LSPath.splice(0, 1);
  if (LSPath.length) {
    const json = JSON.parse(localStorage.getItem(LSKey)) || {};
    const key = LSPath.splice(-1);
    const target = LSPath.reduce((pre, next) => pre[next], json);
    delete target[key];
    localStorage.setItem(LSKey, JSON.stringify(json));
  } else {
    localStorage.removeItem(LSKey);
  }
}