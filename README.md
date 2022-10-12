# codingtalk-vue-toolkit

[docs]()
[example]()
[gitee]()

`codingtalk-vue-toolkit` is a js-tookit & ui-components which is based on vue3,
# Installation

```shell
npm install codingtalk-vue-toolkit
```

# Why codingtalk-vue-toolkit

We usually building front-apps via third ui libaries for convenience. However, some fundamental functions like (http, paginate tool, data handler) is required, but these never provide. `codingtalk-vue-toolkit` make pre-bulding front-apps easier by a command `npm install codigntalk-vue-codingtalk` with some simple confifguration.

# Quick Start

### setup
in main.js

```js
import axios from "axios";
import _ from "lodash";
import * as echarts from "echarts";
import { install as CodingtalkVueToolkitInstall } from "codingtalk-vue-toolkit/";

const app = createApp(App);
CodingtalkVueToolkitInstall(
  app,
  {
    axios,
    entity,
    lodash: _,
    echarts, // not required
  },
  {
    cache: {
      tokenKey: "jwt-token",
      jwtKey: "user-access-token",
    },
    apiJSON: configApiJson,
    apiFormURL: "/api/sys.form.user.login.json",
    apiDetailURL: "/api/sys.detail.user.json",
    apiEntityURL: "/api/sys.entity.user.json",
    apiOssURL: "", // oss authorize url
    genBaseUrl: (domain) => {
      let baseUrl = "";
      if (process.env.NODE_ENV === "local") {
        baseUrl = domain.local;
      } else if (process.env.NODE_ENV === "test") {
        baseUrl = domain.test;
      } else if (process.env.NODE_ENV === "production") {
        baseUrl = domain.prod;
      } else {
        baseUrl = domain.dev;
      }
      return baseUrl;
    },
  },
  components
);
```

### page-loader

```js
const userQuery = reactive([
  { label: "关键字", key: "keyword" },
  { label: "手机号", key: "mobile" },
  {
    label: "注册时间", key: "nickname", render: ({ key, update }) => {
      return <TimePicker onChange={e => {
        update(key, e);
      }} />
    }
  }
]);

const userColumn = reactive([
  { label: "序号", key: "id", width: 200, sortable: true },
  { label: "昵称", key: "nickname" },
  { label: "手机号", key: "mobile" },
  {
    label: "头像",
    key: "avatar",
    width: 350,
    render: (row) => {
      return <img src="/src/assets/logo.png" />;
    },
  },
  { label: "创建时间", key: "createTime" },
  {
    label: "状态",
    key: "status",
    render: ({ row, key }) => {
      const v = row.toEnum('status');
      return <span style={`color:${v?.color}`}>{v?.label}</span>;
    }
  },
  {
    label: "操作",
    key: "operation",
    width: 300,
    fix: "right",
    render: (row) => {
      return <CvtButton type="primary" onClick={() => {
        getRef('cvtPageLoader').openRow(row, (rowInfo) => {
          const info = reactive(rowInfo);
          return defineComponent({
            setup() {
              return () => <div>{info.nickname}</div>;
            },
          })
        }, { entity: 'User', action: 'info' })
      }}>查看</CvtButton>;
    },
  },
]);
```

```html
  <cvt-page-loader ref-key="cvtPageLoader" :ref="storeRef" :query="userQuery" :column="userColumn"
    :config="{ entity: 'User', action: 'page', enableRemoteConfig: 'User', hiddenModule: ['toolbar'] }"
    :check-filter="() => {}">

  </cvt-page-loader>
```
