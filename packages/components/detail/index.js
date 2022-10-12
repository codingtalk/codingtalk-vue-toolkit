import Detail from './src/index.vue'


Detail.name = 'cvt-detail'
Detail.install = (app) => {
    app.component(Detail.name, Detail)
}

export default Detail