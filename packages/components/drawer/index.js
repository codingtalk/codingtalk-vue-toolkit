import { h, render } from "vue";
import { popupWrapper } from "../../utils/dom";
import Drawer from "./src/index.vue";

Drawer.install = (app) => {
  app.component(Drawer.name, Drawer);
};

export const $drawer = (child, props, slots) => {
  const eleWrapper = popupWrapper.getEle({ mask: true });
  const vNode = h(
    Drawer,
    {
      show: true,
      leaveHook: () => {
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
    return vNode?.component?.exposed  || vNode?.component?.ctx;
  };
  document.body.appendChild(eleWrapper);
  render(vNode, eleWrapper);
  return { getVNodeMethods };
};

export default Drawer;
