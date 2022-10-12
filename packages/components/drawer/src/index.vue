<script setup>
import { onMounted, ref, reactive } from "vue";
import CvtButton from "../../button";
const props = defineProps({
  show: {
    type: Boolean,
    default() {
      return false;
    },
  },
  leaveHook: {
    type: Function,
  },
  title: {
    type: String,
    default() {
      return "未填写";
    },
  },
  beforeOpen: {
    type: Function,
  },
  hiddenBtn: {
    type: Array,
  },
  hiddenHeader: {
    type: Boolean,
  },
  hiddenFooter: {
    type: Boolean,
  },
  confirm: {
    type: Function,
  },
  confirmText: {
    type: String,
    default() {
      return "确定";
    },
  },
  cancelText: {
    type: String,
    default() {
      return "取消";
    },
  },
  closeable: {
    type: Boolean,
    default() {
      return true;
    },
  }
});
onMounted(() => {
  props.beforeOpen &&
    props.beforeOpen().then(() => {
      visible.value = true;
    });
});

const visible = ref(props.beforeOpen ? false : props.show);
const loading = reactive({
  confirm: false
});
const onAfterLeave = (el) => {
  props.leaveHook && props.leaveHook();
};

const ok = () => {
  if (loading.confirm) {
    return;
  }
  if (!props.confirm) {
    visible.value = false;
    return;
  }
  loading.confirm = true;
  props.confirm().then(() => {
    visible.value = false;
    loading.confirm = false;
  })
}

defineExpose({
  ok
})
</script>

<template>
  <transition name="cvt_drawer-fade" @after-leave="onAfterLeave">
    <div class="cvt_drawer cvt_drawer--right" @click="() => {
      if (closeable) {
        visible = false;
      }
    }" v-if="visible">
      <div class="drawer_container" @click.stop>
        <div class="container_header" v-if="!hiddenHeader">
          <div class="header_left">
            <span>{{ props.title }}</span>
          </div>
          <div class="header_right">
            <div class="right_close" @click="visible = false" v-if="closeable">
              <i class="cvt-icon">&#xe64d;</i>
            </div>
          </div>
        </div>
        <div class="container_main">
          <slot></slot>
        </div>
        <div class="container_footer" v-if="!props.hiddenFooter">
          <slot name="footer" v-if="$slots.footer"></slot>
          <template v-else>
            <div class="footer_left">
              <slot name="footerLeft"></slot>
            </div>
            <div class="footer_right">
              <slot name="footerRight" v-if="$slots.footerRight"></slot>
              <template v-else>
                <CvtButton v-if="!props.hiddenBtn?.includes('cancel')" @click="visible = false">{{props.cancelText}}
                </CvtButton>
                <CvtButton type="primary" v-if="!props.hiddenBtn?.includes('confirm')" @click="ok">
                  {{props.confirmText}}</CvtButton>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
