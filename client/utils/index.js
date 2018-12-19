export function setLS(LSKey, value) {
  localStorage.setItem(LSKey, JSON.stringify(value))
}

export function getLS(LSKey) {
  return JSON.parse(localStorage.getItem(LSKey))
}

export function removeLS(LSKey) {
  localStorage.removeItem(LSKey)
}

export const regexp = {
  email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  url: /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/,
}
