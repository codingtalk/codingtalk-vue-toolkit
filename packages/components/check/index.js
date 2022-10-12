import Check from "./src/index.vue";

Check.install = (app) => {
  app.component(Check.name, Check);
};

export default Check;
