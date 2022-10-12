<script setup>
const props = defineProps({
  type: {
    type: String,
    default() {
      return "default";
    },
  },
  disabled: {
    type: Boolean,
    default() {
      return false;
    },
  }
});
</script>

<template>
  <button class="cvt_button" :class="`cvt_button--${type} ${disabled ? 'cvt_button--disabled' : ''}`" :disabled="disabled">
    <div class="button_wrap">
      <span>
        <slot></slot>
      </span>
    </div>
  </button>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
