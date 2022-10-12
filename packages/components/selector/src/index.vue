<script setup>
import { ref, reactive, onBeforeMount, toRefs } from "vue";
import axios from '../../../utils/axios';
import { _find } from '../../../utils/fn';
import { EVENT_DOCUMENT_CLICK } from '../../../utils/event';
import emitter from '../../../utils/emitter';

const props = defineProps({
  mode: {
    type: String,
    default() {
      return '';
    },
  },
  placeholder: {
    type: String,
    default() {
      return "";
    },
  },
  multiple: {
    type: String,
    default() {
      return false;
    },
  },
  option: {
    type: String,
    default() {
      return [];
    },
  },
  placeholder: {
    type: String,
    default() {
      return "";
    },
  },
  config: {
    type: Object,
    default() {
      return {};
    },
  },
});

const activeData = ref([]);
let listVisible = ref(false);
let listData = ref([]);

const init = async (opt) => {
  if (props.option.length > 0) {
    const { option } = toRefs(props);
    listData.value = option.value;
  }
  if (props.mode === 'remote') {
    const { _apiEntityURL } = window.$CVT;
    const { domain, key } = props.config;
    const res = await axios.request({
      baseURL: _apiEntityURL,
      url: "",
      params: {
        domain
      },
      data: {}
    }).finally(() => {
    });
    const { status, data } = res;
    if (status) {
      const tar = _find(data?.enumValues, x => x.key === key);
      if (tar) {
        listData.value = tar.list.map(i => ({
          label: i.label,
          value: i.value
        }));
      }
    }
  }
}

const selectHandler = (item) => {
  if (!props.multiple) {
    activeData.value = [item];
    return;
  }
  if (_find(activeData.value, x => x.value === item.value)) {
    activeData.value = activeData.value.filter(x => x.value === item.value);
    return;
  }
  activeData.value.push(item);
}

onBeforeMount(() => {
  init();
  emitter.on(EVENT_DOCUMENT_CLICK, e => {
    const { path } = e;
    if (!_find(path.map(el => el.className), x => x === 'cvt_selector')) {
      listVisible.value = false;
    }
  })
});
</script>

<template>
  <div class="cvt_selector" @click="listVisible = true">
    <div class="selector_tag">
      <div class="tag_list">
        <div class="list_item" v-if="!activeData.length">
          <div class="item_wrap">
            <span>{{placeholder}}</span>
          </div>
        </div>
        <div class="list_item" :key="key" v-for="(item, key) in activeData">
          <div class="item_wrap">
            <span>{{item.label}}</span>
            <i class="cvt-icon" v-if="multiple">&#xe64d;</i>
          </div>
        </div>
      </div>
      <div class="tag_icon">
        <i class="cvt-icon" v-html="listVisible ? '&#xe600;' : '&#xe772;'"></i>
      </div>
    </div>
    <div class="selector_list" v-if="listVisible">
      <div class="list_item" :class="{'list_item--check': activeData.map(i => i.value).includes(item.value)}" :key="key"
        @click="selectHandler(item)" v-for="(item, key) in listData">
        <span>{{ item.label }}</span>
        <i class="cvt-icon">&#xec9e;</i>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
