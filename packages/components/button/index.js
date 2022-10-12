import Button from './src/index.vue'

Button.name = 'cvt-button';

Button.install = (app) => {
    app.component(Button.name, Button)
}

export default Button