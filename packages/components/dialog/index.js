import { h, render } from "vue";
import { popupWrapper } from "../../utils/dom";
import Dialog from "./src/index.vue";

Dialog.install = (app) => {
  app.component(Dialog.name, Dialog);
};

export const $dialog = (child, props, slots) => {
  const eleWrapper = popupWrapper.getEle({ mask: true });
  const vNode = h(
    Dialog,
    {
      show: true,
      afterClose: () => {
        document.querySelector("body")?.removeChild(eleWrapper);
      },
      ...props,
    },
    {
      default: () => h(child, {}),
      ...slots,
    }
  );
  const getVNodeMethods = () => {
    return vNode?.component?.exposed || vNode?.component?.ctx;
  };
  document.body.appendChild(eleWrapper);
  render(vNode, eleWrapper);
  return { getVNodeMethods };
};

export default Dialog;
