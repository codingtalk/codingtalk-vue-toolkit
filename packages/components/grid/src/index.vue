<script>
export default {
  name: "cvt-grid",
  props: {
    title: [String],
    border: [Boolean],
    col: {
      type: Number,
      default() {
        return 2;
      },
    },
    row: {
      type: Number,
      default() {
        return 2;
      },
    },
    config: {
      type: Object,
      default() {},
    },
  },
};
</script>

<template>
  <div class="cvt_grid" :class="{ 'cvt_grid--border': border }">
    <div class="grid_title" v-if="title">
      <span>{{ title }}</span>
    </div>
    <div
      class="grid_content"
      :style="{
        gridTemplateColumns: `repeat(${this.col},1fr)`,
        gridTemplateRows: `repeat(${this.row},1fr)`,
      }"
      v-if="$slots.default"
    >
      <slot></slot>
    </div>
    <div class="grid_content--no-grid">
      <slot name="noGrid"></slot>
    </div>
  </div>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
