import Selector from './src/index.vue'

Selector.name = 'cvt-selector'
Selector.install = (app) => {
    app.component(Selector.name, Selector)
}

export default Selector