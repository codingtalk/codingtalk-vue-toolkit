import { h, render } from 'vue'
import { popupWrapper } from '../../utils/dom';
import Loading from './src/index.vue'

Loading.name = 'cvt-loading'
Loading.install = (app) => {
    app.component(Loading.name, Loading)
}

export const $loading = (child, props) => {
    return new Promise((resolve, reject) => {
        const eleWrapper = popupWrapper.getEle();
        document.body.appendChild(eleWrapper)
        render(h(Loading, {
            show: true,
            fixed: true,
            leaveHook: () => {
                document.querySelector('body')?.removeChild(eleWrapper)
            },
            ...props
        }, h(child, {})), eleWrapper)
    })
}

export default Loading;