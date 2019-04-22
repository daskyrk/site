import upperFirst from 'lodash/upperFirst'

export const set = property => (state, payload) => (state[property] = payload)

export const toggle = property => state => (state[property] = !state[property])

export const setList = props => {
  const obj = {};
  props.forEach(p => obj[`set${upperFirst(p)}`] = set(p));
  return obj;
}

export const toggleList = props => {
  const obj = {};
  props.forEach(p => obj[`toggle${upperFirst(p)}`] = toggle(p));
  return obj;
}
