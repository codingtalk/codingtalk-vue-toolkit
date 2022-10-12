import axios from '../utils/axios';

export default class Request {

    constructor() {
        const { _apiJSON, _genBaseUrl } = window.$CVT;
        this.apiJSON = _apiJSON
        this.genBaseUrl = _genBaseUrl
    }

    do(app, module, method, form, config = {}) {
        const { params, body } = form;
        const { log4js } = window.$CVT;
        let url = ''
        try {
            url = this.apiJSON[app].modules[module][method].path;
        } catch (e) {
            // eslint-disable-next-line no-undef
            log4js.error(`
      request.js =====> api json configure is error
      full path ======> ${app}/${module}/${method}
      `);
        }
        if (config.showLoading) {

        }
        return axios.request({
            baseURL: this.genBaseUrl(this.apiJSON[app].domain),
            url,
            params,
            data: body
        }).finally(() => {
        });
    }
}