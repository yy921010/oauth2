
const isEmpty = val => val == null || !(Object.keys(val) || val).length;
const mask = (cc, num = 4, mask = '*') => cc.slice(-num).padStart(cc.length, mask);
module.exports = {
  isEmpty,
  mask
};
