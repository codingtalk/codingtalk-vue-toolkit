import Request from "./request";
import formToolkit from "./formToolkit";
import { _cloneDeep, _get, _set, toParse, _find } from "../utils/fn";
import { $message } from "../components";
import axios from "../utils/axios";

const _baseTableField = {
  id: {
    type: "int",
    default: 0,
  },
  sn: {
    type: "int",
    default: 0,
  },
  status: {
    type: "int",
    default: 0,
  },
  isDelete: {
    type: "int",
    default: 0,
  },
  createTime: {
    type: "string",
    default: "",
  },
  updateTime: {
    type: "string",
    default: "",
  },
  deleteTime: {
    type: "string",
    default: "",
  },
};

class Entity {
  _tableField = [];
  request = null;
  _raw = null;
  constructor(entity, { _tableField }) {
    const { _entityCollection } = window.$CVT;
    this._tableField = Object.assign(_cloneDeep(_baseTableField), _tableField);
    for (const i in this._tableField) {
      if (entity && this._tableField[i].isEntity) {
        const v = _get(entity, i);
        const e = _entityCollection[this._tableField[i].type];
        if (e) {
          this[i] = Array.isArray(v) ? v.map((j) => new e(j)) : new e(v);
        }
        continue;
      }
      this[i] = entity
        ? this._fieldDo(entity, i)
        : _get(this._tableField, `${i}.default`);
      this._raw = entity;
    }
  }

  _fieldDo(entity, i) {
    if (!this._tableField[i].do) {
      return _get(entity, i);
    }
    const { parse } = this._tableField[i].do;
    if (parse) {
      return toParse(_get(entity, i) || "{}");
    }
  }

  toEnum(key, dv = "--") {
    const tar = _find(this._remoteConfig?.enumValues, (x) => x.key === key);
    if (tar) {
      return _find(tar.list, (x) => x.value === this[key]);
    }
    return dv;
  }

  static async sendApi(
    method,
    form = { params: {}, body: {} },
    config = {
      errorTip: "",
      parse4Entity: false,
      showLoading: false,
      enableRemoteConfig: false,
    }
  ) {
    const { app, domain } = this._requestConfig;
    let remoteConfig = null;
    if (config.enableRemoteConfig) {
      const { _apiEntityURL } = window.$CVT;
      const { status, data } = await axios
        .request({
          baseURL: _apiEntityURL,
          url: "",
          params: {
            domain: config.enableRemoteConfig,
          },
          data: {},
        })
        .finally(() => {});
      if (status) {
        remoteConfig = data;
      }
    }
    return new Request()
      .do(app, domain, method, form, { showLoading: config.showLoading })
      .then((res) => {
        const { status, message } = res;
        if (!status) {
          if (config.errorTip) {
            if (typeof config.errorTip === "function") {
              config.errorTip(res);
            } else {
              $message.tip(config.errorTip);
            }
          } else {
            $message.tip(message);
          }
        }
        if (config.parse4Entity) {
          if (Array.isArray(res.data)) {
            res.data = res.data.map((i) => {
              const _i = new this(i);
              _i._remoteConfig = remoteConfig;
              return _i;
            });
          } else {
            const _i = new this(res.data);
            _i._remoteConfig = remoteConfig;
            res.data = _i;
          }
        }
        return res;
      });
  }

  static formUtil() {
    return {
      generator: (module, type) => {
        const f = _get(this._form, `${module}.${type}`);
        for (const i in f) {
          f[i] = Object.assign(f[i], { _validator: { ok: true, msg: "" } });
        }
        return {
          ..._cloneDeep(f),
          FILED(s) {
            const _self = this;
            let k = "";
            const sr = s.split(".");
            for (let i in sr) {
              const r = sr[i].match(/(\S+)\[(\d+)\]$/);
              if (r && r.length === 3) {
                k = k + `${r[1]}.value[${r[2]}]`;
                continue;
              }
              k =
                k + (i == sr.length - 1 ? `${sr[i]}.value` : `${sr[i]}.value.`);
            }
            return {
              get val() {
                return _get(_self, k);
              },
              set val(v) {
                _set(_self, k, v);
              },
              get valid() {
                return _get(_self, k.slice(0, k.length - 6));
              },
            };
          },
        };
      },
      validate: (json) => {
        return formToolkit.validate(json);
      },
      fill: (f, json, config) => {
        for (const i in f) {
          f[i] = Object.assign(f[i], { _validator: { ok: true, msg: "" } });
        }
        return formToolkit.fill(f, json, config);
      },
    };
  }
}

export default Entity;
