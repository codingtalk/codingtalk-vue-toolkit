import { core } from "@codingtalk-vue-toolkit/index";

const _tableField = {
    balance: {
        type: 'int',
        default: 0
    },
};

class UserAccount extends core.Entity {
    static _requestConfig = {
        app: 'www',
        domain: 'tenant'
    }

    static _form = {}

    static _options = {}

    constructor(userAccount) {
        super(userAccount, { _tableField });
    }
}

export default UserAccount;