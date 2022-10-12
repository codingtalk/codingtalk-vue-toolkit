<script>
export default {
  name: "cvt-grid-item",
  props: {
    label: {
      type: String,
      default() {
        return "";
      },
    },
  },
};
</script>

<template>
  <div class="cvt_grid_item">
    <div class="item_label" v-if="label">
      <span>{{ label }}：</span>
    </div>
    <div class="item_box">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/item.less");
</style>
