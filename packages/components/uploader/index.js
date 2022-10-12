import Uploader from './src/index.vue'

Uploader.install = (app) => {
    app.component(Uploader.name, Uploader)
}

export default Uploader