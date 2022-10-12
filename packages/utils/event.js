import emitter from "./emitter";

export const EVENT_DOCUMENT_CLICK = "document:click";

export const eventInit = () => {
    document.addEventListener("click", (e) => {
    emitter.emit(EVENT_DOCUMENT_CLICK, e);
  });
};
