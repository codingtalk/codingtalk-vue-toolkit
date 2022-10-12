<template>
	<div class="cvt_uploader">
		<div class="uploader_list">
			<div class="list_item" :key="key" v-for="(item, key) in result">
				<div class="item_img">
					<img :src="`${item.url}?x-oss-process=image/resize,m_mfit,h_160`" alt />
				</div>
				<div class="item_delete" @click="deleteImg(key)">
					<i class="cvt-icon">&#xe69d;</i>
				</div>
			</div>
		</div>
		<div class="uploader_btn" @click="upload" v-if="result.length < max">
			<i class="cvt-icon">&#xe7d9;</i>
		</div>
	</div>
</template>

<script>
import OssUtil from '../../../utils/oss';
import { $message } from '../../message';

export default {
	name: 'cvt-uploader',
	props: {
		max: {
			type: Number,
			default() {
				return 3;
			}
		},
		value: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			result: this.value
		};
	},
	methods: {
		deleteImg(k) {
			this.result.splice(k, 1);
		},
		upload() {
			new OssUtil().uploadLocalFile().then(res => {
				const { callbackData } = res;
				const { status, data } = callbackData;
				if (status) {
					const { id, filename, url } = data;
					this.result.push({
						id,
						filename, url
					});
				}
			}).catch((reject) => {
				$message.tip('图片上传失败');
			});
		}
	},
	watch: {
		value: function (e) {
			this.result = e;
		},
		result: {
			handler: function (e) {
				this.$emit("change", e);
			},
			deep: true
		}
	}
};
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>