<template>
    <div class="cvt_check" :class="{'cvt_check--active': v}" @click="change">
        <i class="cvt-icon">&#xec9e;</i>
    </div>
</template>
  
<script>
export default {
    name: "cvt-input",
    props: {
        checked: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    data() {
        return {
            v: this.checked
        }
    },
    methods: {
        change(e) {
            this.v = !this.v;
            this.$emit('update:checked', this.v);
        }
    }
};
</script>
  
<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>