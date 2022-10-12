import { core } from "@codingtalk-vue-toolkit/index";

const _tableField = {
    nickname: {
        type: 'string',
        default: ''
    },
    userAccount: {
        isEntity: true,
        type: 'UserAccount',
        default: null
    },
};

class User extends core.Entity {
    static _requestConfig = {
        app: 'test',
        domain: 'user'
    }

    static _form = {}

    static _options = {}

    constructor(user) {
        super(user, { _tableField });
    }
}

export default User;