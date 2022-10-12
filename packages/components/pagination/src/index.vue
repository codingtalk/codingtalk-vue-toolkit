<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default() {
      return 0;
    },
  },
  index: {
    type: Number,
    default() {
      return 1;
    },
  },
  size: {
    type: Number,
    default() {
      return 10;
    },
  }
});

const emits = defineEmits(["change"]);

let active = ref(props.index);

let count = computed(() => {
  return Math.ceil(props.total / props.size) || 1;
})

const selectPage = (item) => {
  active.value = item;
  emits("change", item);
}

</script>

<template>
  <div class="cvt_pagination">
    <div class="pagination_pre">
      <i class="cvt-icon">&#xe659;</i>
    </div>
    <div class="pagination_list">
      <div class="list_item"
      :key="key" 
      :class="{ 'list_item--active': active === item }"
      @click="selectPage(item)"
      v-for="(item, key) in count">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="pagination_next">
      <i class="cvt-icon">&#xe60e;</i>
    </div>
  </div>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
