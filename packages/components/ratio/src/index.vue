<script lang="jsx">
import { ref, defineComponent } from "vue";

export default defineComponent({
	name: "cvt-ratio",
	props: {
		option: {
			type: Array,
			default() {
				return []
			}
		},
		value: {
			type: Object,
			default() {
				return ''
			}
		}
	},
	setup(props, { slots, emit }) {
		let active = ref(props.value);
		return () => <div className="cvt_ratio">
			{props.option.map(i => {
				return <div {...active.value === i.value
					? { className: 'ratio_item ratio_item--active' }
					: { className: 'ratio_item' }} onClick={() => {
						active.value = i.value;
						emit('update:value', i.value);
					}}>
					<div className="item_dot"></div>
					<div className="item_text">
						<span>{i.label}</span>
					</div>
				</div>
			})}
		</div>
	},
});
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
