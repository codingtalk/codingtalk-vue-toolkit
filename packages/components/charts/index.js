import Charts from "./src/index.vue";

Charts.install = (app) => {
  app.component(Charts.name, Charts);
};

export default Charts;
