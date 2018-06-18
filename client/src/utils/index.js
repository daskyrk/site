
export function setLS(LSKey, value) {
  localStorage.setItem(LSKey, JSON.stringify(value));
}

export function getLS(LSKey) {
  return JSON.parse(localStorage.getItem(LSKey));
}

export function removeLS(LSKey) {
  localStorage.removeItem(LSKey);
}