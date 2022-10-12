export const _cloneDeep = (o) => {
  const { _ } = window.$CVT;
  return _.cloneDeep(o);
};

export const _get = (v, k) => {
  const { _ } = window.$CVT;
  return _.get(v, k);
};

export const _set = (v, k, o) => {
  const { _ } = window.$CVT;
  return _.set(v, k, o);
};

export const _find = (v, f) => {
  const { _ } = window.$CVT;
  return _.find(v, f);
};

export function isObjHasBlank(obj, skipAttr = []) {
  for (let i in obj) {
    if (!obj[i] && !skipAttr.includes(i)) {
      return true;
    }
  }
}

export function getObjVal(s, k, d = "--") {
  const { _ } = window.$CVT;
  return _.get(s, k, d);
}

export function toStringify(o) {
  return JSON.stringify(o);
}

export function toParse(s) {
  return JSON.parse(s);
}

export function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join("");
  return uuid;
}

export function genArrayByLength(l) {
  return Array.from({ length: l }, (v, i) => i);
}
