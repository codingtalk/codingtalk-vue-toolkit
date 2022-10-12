import Input from "./src/index.vue";

Input.install = (app) => {
  app.component(Input.name, Input);
};

export default Input;
