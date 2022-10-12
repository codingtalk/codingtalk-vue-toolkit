<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  fixed: {
    type: Boolean,
    default() {
      return false;
    },
  },
  leaveHook: {
    type: Function,
  },
  show: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

let visible = ref(props.show);

const onAfterLeave = (el) => {
  props.leaveHook && props.leaveHook();
};
</script>

<template>
  <transition name="cvt_loading_fade" @after-leave="onAfterLeave">
    <div class="cvt_loading" :class="{'cvt_loading--fixed': fixed}">
      <div class="loading_item loading_item_1"></div>
      <div class="loading_item loading_item_2"></div>
      <div class="loading_item loading_item_3"></div>
      <div class="loading_item loading_item_4"></div>
      <div class="loading_item loading_item_5"></div>
    </div>
  </transition>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>

