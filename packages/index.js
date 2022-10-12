import components from "./components";
import Log4js from "./utils/log4js";
import Entity from "./core/entity.class";
import Request from "./core/request";
import "./style/reset.less";
import "./style/global.less";
import "./icon/iconfont.less";
import * as dom from "./utils/dom";
import * as vue from "./utils/vue";
import * as fn from "./utils/fn";
import * as emitter from "./utils/emitter";
import * as day from "./utils/day";
import { get, set, remove } from "./utils/localCache";
import OssUtil from "./utils/oss";
import { eventInit } from "./utils/event";

window.$CVT = {
  log4js: new Log4js(),
  version: "1.0.0",
  _popupWrapperZIndex: 1000,
};

export const install = (app, lib, config, _components) => {
  const { axios, entity, lodash, echarts } = lib;
  const { apiJSON, genBaseUrl, apiFormURL, apiDetailURL, apiEntityURL, apiOssURL, cache, req } =
    config;
  window.$CVT._axios = axios;
  window.$CVT._entityCollection = entity;
  window.$CVT._ = lodash;
  window.$CVT._apiJSON = apiJSON;
  window.$CVT._genBaseUrl = genBaseUrl;
  window.$CVT._apiFormURL = apiFormURL;
  window.$CVT._apiDetailURL = apiDetailURL;
  window.$CVT._apiEntityURL = apiEntityURL;
  window.$CVT._apiOssURL = apiOssURL;
  window.$CVT._cache = cache;
  window.$CVT._req = req;
  window.$CVT._echarts = echarts;
  window.$CVT._components = _components;
  for (let key in components) {
    const component = components[key];
    app.component(components[key].name, component);
  }
  eventInit();
};

export const core = {
  Entity,
  Request,
};

export const utils = {
  dom,
  vue,
  fn,
  emitter,
  day,
  localCache: {
    get,
    set,
    remove,
  },
  OssUtil,
};

export { $dialog, $drawer, $message, $loading } from "./components";

export default {
  ...components,
};
