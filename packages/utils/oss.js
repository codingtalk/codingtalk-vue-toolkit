import axios from './axios';

export default class OssUtil {
  constructor() { }

  _openFile() {
    return new Promise((resolve) => {
      const pom = document.createElement("input");
      pom.setAttribute("type", "file");
      pom.addEventListener("change", function (e) {
        resolve(e);
      });
      pom.style.display = "none";
      if (document.createEvent) {
        const event = document.createEvent("MouseEvents");
        event.initEvent("click", true, true);
        pom.dispatchEvent(event);
      } else {
        pom.click();
      }
    });
  }

  _generateKey() {
    const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
    const maxPos = chars.length;
    let name = "";
    for (let i = 0; i < 7; i++) {
      name += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return `${name}${new Date().getTime()}`;
  }

  _getAuthorize() {
    const { _apiOssURL } = window.$CVT;
    if (!_apiOssURL) {
      throw "configure -> _apiOssURL is missed";
    }
    return new Promise((resolve) => {
      axios.request({
        baseURL: _apiOssURL,
        url: "",
        params: {},
        data: {}
      }).then(res => {
        const { status, data } = res;
        if (status) {
          resolve(data);
        }
      }).finally(() => {
      });
    });
  }

  _post(authorize, file) {
    const { _axios } = window.$CVT;
    return new Promise((resolve) => {
      const formData = new FormData();
      formData.append("policy", authorize.policy);
      formData.append("OSSAccessKeyId", authorize.accessKey);
      formData.append("success_action_status", "200");
      formData.append("callback", authorize.callback);
      formData.append("signature", authorize.signature);
      formData.append("key", authorize.dir + this._generateKey());
      formData.append("dir", authorize.dir);
      formData.append("file", file);
      _axios({
        url: "//" + authorize.host,
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        resolve(res);
      });
    });
  }

  uploadLocalFile() {
    return new Promise((resolve, reject) => {
      this._openFile().then((e) => {
        const file = e.path[0].files[0];
        this._getAuthorize().then((authorize) => {
          this._post(authorize, file).then((res) => {
            const { status, data } = res;
            if (status === 200) {
              resolve({ file, callbackData: data });
              return;
            }
            reject();
          });
        });
      });
    });
  }

  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this._getAuthorize().then((authorize) => {
        this._post(authorize, file).then((res) => {
          const { status, data } = res;
          if (status === 200) {
            resolve({ file, callbackData: data });
            return;
          }
          reject();
        });
      });
    });
  }
}
