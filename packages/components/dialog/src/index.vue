<script setup>
import { onMounted, ref, reactive } from "vue";
import CvtButton from '../../button';
const props = defineProps({
  show: {
    type: Boolean,
    default() {
      return false;
    },
  },
  title: {
    type: String,
    default() {
      return "未填写";
    },
  },
  confirm: {
    type: Function,
  },
  afterClose: {
    type: Function,
  },
  beforeOpen: {
    type: Function,
  },
  hiddenFooter: {
    type: Boolean,
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
const onAfterClose = (el) => {
  props.afterClose && props.afterClose();
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
  }).catch(e => {

  }).finally(() => {
    loading.confirm = false;
  });
}

defineExpose({
  ok
})

</script>

<template>
  <Transition name="cvt_dialog-fade" @after-leave="onAfterClose">
    <div class="cvt_dialog cvt_dialog--center" @click="() => {
      if (closeable) {
        visible = false;
      }
    }" v-if="visible">
      <div class="dialog_container" @click.stop>
        <div class="container_header">
          <div class="header_left">
            <span>{{ title }}</span>
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
                <CvtButton @click="visible = false">{{props.cancelText}}</CvtButton>
                <CvtButton type="primary" :disabled="loading.confirm" @click="ok">{{props.confirmText}}</CvtButton>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
