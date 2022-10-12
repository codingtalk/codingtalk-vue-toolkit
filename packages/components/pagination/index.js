import Pagination from "./src/index.vue";

Pagination.install = (app) => {
  app.component(Pagination.name, Pagination);
};

export default Pagination;
