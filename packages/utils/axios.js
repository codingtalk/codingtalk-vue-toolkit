import localCache from "./localCache";

class Axios {
  constructor() {
    this.queue = {};
  }

  getInsideConfig() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
  }

  interceptors(instance, url) {
    instance.interceptors.request.use(
      (config) => {
        const { _cache, _req } = window.$CVT;
        if (_req && _req.before) {
          _req.before(config);
        }
        if (localCache.tokenGet()) {
          config.headers[_cache?.jwtKey] = localCache.tokenGet();
        }
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res) => {
        const { _cache, _req } = window.$CVT;
        if (_req && _req.after) {
          _req.after(res);
        }
        if (res.headers[_cache?.jwtKey]) {
          localCache.tokenSet(res.headers[_cache?.jwtKey]);
        }
        this.destroy(url);
        const { data } = res;
        return data;
      },
      (error) => {
        this.destroy(url);
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    const { _axios } = window.$CVT;
    const instance = _axios.create();
    options = Object.assign(this.getInsideConfig(options), options);
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default new Axios();
