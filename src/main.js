import { createApp, h, defineComponent } from "vue";
import App from "./App.vue";
import axios from "axios";
import _ from "lodash";
import * as echarts from "echarts";
import { install as CodingtalkVueToolkitInstall } from "@codingtalk-vue-toolkit/index";
import "@codingtalk-vue-toolkit/index.css";

import entity from "@/entity";
import configApiJson from "@/config/api";
import components from "@/components";

const app = createApp(App);
CodingtalkVueToolkitInstall(
  app,
  {
    axios,
    entity,
    lodash: _,
    echarts,
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
    apiOssURL: "",
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
app.mount("#app");
