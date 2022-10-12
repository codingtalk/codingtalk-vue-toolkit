<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  type: {
    type: String,
    default() {
      return "success";
    },
  },
  show: {
    type: Boolean,
    default() {
      return false;
    },
  },
  leaveHook: {
    type: Function,
  },
  msg: {
    type: String,
    default() {
      return "未填写";
    },
  },
});

let visible = ref(props.show);

onMounted(() => {
    setTimeout(() => {
        visible.value = false;
    }, 2000)
});
const onAfterLeave = (el) => {
  props.leaveHook && props.leaveHook();
};
</script>

<template>
  <transition name="cvt_message_tip_fade" @after-leave="onAfterLeave">
    <div class="cvt_message_tip" :class="`cvt_message_tip--${type}`" v-if="visible">
      <div class="tip_icon">
        
      </div>
      <div class="tip_text">{{ msg }}</div>
    </div>
  </transition>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/tip.less");
</style>
