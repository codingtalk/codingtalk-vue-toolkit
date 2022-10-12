export const popupWrapper = {
    getEle: (opt = {}) => {
    const { mask } = opt;
    const eleWrapper = document.createElement("div");
    eleWrapper.setAttribute(
      "class",
      `cvt_popup_wrapper${mask ? " cvt_popup_wrapper--mask" : ""}`
    );
    window.$CVT._popupWrapperZIndex++;
    eleWrapper.style.zIndex = String(window.$CVT._popupWrapperZIndex - 1);
    return eleWrapper;
  },
};
