import PageLoader from './src/index.jsx'

PageLoader.name = 'cvt-page-loader'
PageLoader.install = (app) => {
    app.component(PageLoader.name, PageLoader)
}

export default PageLoader