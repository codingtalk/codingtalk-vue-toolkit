<template>
  <div class="cvt_input">
    <span v-if="label">{{ label }}：</span>
    <input :type="type" :value="value" @change="change" v-if="['text', 'password'].includes(type)">
    <textarea rows="3" :value="value" v-else></textarea>
  </div>
</template>

<script>
export default {
  name: "cvt-input",
  props: {
    type: {
      type: String,
      default() {
        return 'text'
      }
    },
    label: [String],
    value: {
      type: String
    }
  },
  methods: {
    change(e) {
      this.$emit('update:value', e?.target?.value);
    }
  }
};
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>