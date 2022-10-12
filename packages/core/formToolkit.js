import { toRaw, isProxy } from "vue";
import { _get, _set } from "../utils/fn";

const formToolkit = {
  validate: (obj, config = { rqeuire: [] }) => {
    const result = {
      ok: true,
      form: null,
    };
    const { log4js } = window.$CVT;
    const getVal = (f, obj, i) => {
      return _get(f, obj[i].keyPath ? `${obj[i].keyPath}.${i}` : `${i}`);
    };
    const setVal = (f, obj, i, v) => {
      _set(f, obj[i].keyPath ? `${obj[i].keyPath}.${i}` : `${i}`, v);
    };
    const _loop = (obj) => {
      if (Array.isArray(obj)) {
        return obj.map((i) => _loop(i));
      }
      const f = {};
      for (const i in obj) {
        if (i === "FILED") {
          continue;
        }
        if (obj[i].skip) {
          continue;
        }
        if (obj[i].require && !obj[i].value) {
          if (config.rqeuire?.length && !config.rqeuire?.includes(i)) {
            continue;
          }
          log4js.log(`validate error: key-------> ${i}`);
          obj[i]._validator = {
            ok: false,
            msg: obj[i].errorTip || "请校验输入信息",
          };
          result.ok = false;
        }
        if (obj[i].isJson) {
          setVal(
            f,
            obj,
            i,
            isProxy(obj[i].value) ? toRaw(obj[i].value) : obj[i].value
          );
          continue;
        }
        if (obj[i].toStr) {
          setVal(f, obj, i, JSON.stringify(obj[i].value));
          continue;
        }
        if (obj[i].skipFill && !obj[i].value) {
          continue;
        }
        if (Array.isArray(obj[i].value)) {
          if (!obj[i].value.length) {
            setVal(f, obj, i, []);
            continue;
          }
          obj[i].value.forEach((j) => {
            let isSkipRow = false;
            if (!f[i]) {
              setVal(f, obj, i, []);
            }
            for (const k in j) {
              if (
                j[k].skipRowValue !== undefined &&
                j[k].skipRowValue === j[k].value
              ) {
                isSkipRow = true;
              }
            }
            if (isSkipRow) {
              return;
            }
            getVal(f, obj, i)?.push(_loop(j));
          });
          continue;
        }
        if (
          typeof obj[i].value === "object" &&
          Object.keys(obj[i].value).length
        ) {
          setVal(f, obj, i, _loop(obj[i].value));
          continue;
        }
        setVal(f, obj, i, obj[i].value);
      }
      return f;
    };
    result.form = _loop(obj);
    return result;
  },
  fill: (form, obj) => {
    const { _entityCollection } = window.$CVT;
    for (const i in form) {
      if (i === "FILED") {
        continue;
      }
      if (form[i].skip) {
        form[i].value =
          obj[i] ||
          (() => {
            const type = form[i].type.split("|")[0];
            if (type === "array") {
              return [];
            }
            if (type === "string") {
              return "";
            }
            if (type === "boolean") {
              return false;
            }
            return {};
          })();
        continue;
      }
      if (form[i].skipFill) {
        continue;
      }
      if (form[i].toStr) {
        form[i].value = obj[i].toParse();
        continue;
      }
      const [typeValid, entity] = form[i].type.split(">");
      const [type] = typeValid.split("|");
      if (type === "array") {
        obj[i] &&
          obj[i].forEach((j) => {
            form[i].value.push(
              formToolkit.fill(
                _entityCollection[entity]
                  .formUtil()
                  .generator("update", "default"),
                j
              )
            );
          });
        continue;
      }
      if (type === "object") {
        form[i].value = formToolkit.fill(
          _entityCollection[entity].formUtil().generator("update", "default"),
          obj[i]
        );
        continue;
      }
      form[i].value = obj[i];
    }
    return form;
  },
};

export default formToolkit;
