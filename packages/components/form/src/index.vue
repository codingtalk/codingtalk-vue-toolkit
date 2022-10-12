<script setup>
import { reactive, ref } from 'vue';
import CvtFormField from './field.vue'
import CvtButton from "../../button";
import CvtStep from '../../step';
import axios from '../../../utils/axios';
import formToolkit from '../../../core/formToolkit';

const props = defineProps({
	config: {
		type: Object,
		default() {
			return {};
		},
	},
	hiddenModule: {
		type: Object,
		default() {
			return [];
		},
	},
});

const emits = defineEmits(["submit"]);
const config = reactive({
	type: 'default',
	section: [],
	step: {
		active: 0,
		list: [],
	}
});
const formJson = ref([]);
const renderHook = ref(null);

const init = async (domain, key, opt, fillFormCallback) => {
	const { _apiFormURL } = window.$CVT;
	renderHook.value = opt?.renderHook;
	const res = await axios.request({
		baseURL: _apiFormURL,
		url: "",
		params: {
			domain,
			key
		},
		data: {}
	}).finally(() => {
	});
	const { status, data } = res;
	if (status) {
		config.type = data?.config?.type;
		if (config.type === 'section') {
			config.section = [...data?.config?.section];
		} else {
			config.step.list = [...data?.config?.step, ...[{ title: '完成' }]];
		}
		formJson.value = data?.form;
		if (fillFormCallback) {
			const formObj = {};
			for (let i in formJson.value) {
				const { key, opt } = formJson.value[i];
				formObj[key] = opt;
			}
			fillFormCallback().then(res => {
				formToolkit.fill(formObj, res);
			})
		}
	}
}

const submit = () => {
	const formObj = {};
	return new Promise((resolve, reject) => {
		for (let i in formJson.value) {
			const { key, opt } = formJson.value[i];
			formObj[key] = opt;
		}
		const { ok, form } = formToolkit.validate(formObj);
		if (!ok) {
			for (let i in formObj) {
				const { _validator } = formObj[i];
				if (!_validator?.ok) {
					reject(_validator?.msg);
					return;
				}
			}
		}
		emits('submit', {
			form, callback: () => {
				config.step.active++;
			}
		});
		resolve(form);
	});
}

defineExpose({
	init,
	submit
})

</script>

<template>
	<div class="cvt_form">
		<slot :form="formJson" v-if="$slots.default"></slot>
		<template v-else>
			<div class="form_step" v-if="config.type === 'step'">
				<CvtStep :value="config.step.list" :active="config.step.active" />
			</div>
			<div class="form_content">
				<CvtFormField :type="config.type" :json="formJson" :section="config.section"
					:visible="config.step.list[config.step.active]?.field"
					:render-hook="renderHook"
					v-if="config.type !== 'step' || (config.type === 'step' && config.step.active < config.step.list.length - 1)" />
				<template v-else>
					<div class="content_result">
						<div class="result_icon">
							<i class="cvt-icon">&#xe726;</i>
						</div>
						<div class="result_tip">
							<h3>添加成功</h3>
							<p>成功添加后可点击下方按钮查看详情</p>
						</div>
						<div class="result_btn">
							<CvtButton type="primary">查看详情</CvtButton>
						</div>
					</div>
				</template>
			</div>
			<div class="form_submit"
				v-if="!hiddenModule.includes('submit') && config.step.active < config.step.list.length - 1 && config.type === 'step'">
				<template v-if="config.step.active === config.step.list.length - 2">
					<CvtButton style="marginRight:20px;" @click="config.step.active--" v-if="config.step.active > 0">上一步
					</CvtButton>
					<CvtButton type="primary" @click="submit">提交</CvtButton>
					<CvtButton style="marginLeft:20px;">重置</CvtButton>
				</template>
				<template v-else>
					<CvtButton style="marginRight:20px;" @click="config.step.active--" v-if="config.step.active > 0">上一步
					</CvtButton>
					<CvtButton type="primary" @click="config.step.active++">下一步</CvtButton>
				</template>
			</div>
		</template>
	</div>
</template>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
