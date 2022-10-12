export const get = (s) => {
  return localStorage.getItem(s);
};

export const set = (s, v) => {
  localStorage.setItem(s, v);
};

export const remove = (s) => {
  localStorage.removeItem(s);
};

export default {
  tokenSet: (s) => {
    const { _cache } = window.$CVT;
    set(_cache?.tokenKey, s);
  },
  tokenGet: () => {
    const { _cache } = window.$CVT;
    return get(_cache?.tokenKey);
  },
  tokenRemove: () => {
    const { _cache } = window.$CVT;
    remove(_cache?.tokenKey);
  },
};
