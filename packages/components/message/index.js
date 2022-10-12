import { h, render } from 'vue'
import { popupWrapper } from '../../utils/dom';
import Tip from './src/tip.vue'


export const $message = {
    tip: (props) => {
        return new Promise((resolve, reject) => {
            const eleWrapper = popupWrapper.getEle();
            document.body.appendChild(eleWrapper)
            render(h(Tip, {
                show: true,
                leaveHook: () => {
                    document.querySelector('body')?.removeChild(eleWrapper)
                },
                ...typeof props === 'string' ? { msg: props } : props
            }), eleWrapper)
        })
    }
}