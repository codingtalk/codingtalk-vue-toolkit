<script lang="jsx">
import { defineComponent } from "vue";

export default defineComponent({
	name: "cvt-step",
	props: {
		active: {
			type: Number,
			default() {
				return 0
			}
		},
		value: {
			type: Array,
			default() {
				return []
			}
		}
	},
	setup(props, { slots }) {
		return () => {
			return 
				<div className="cvt_step">
					{props.value.map((i, index) => {
						return <div {...props.active >= index + 1 ? { className: 'step_item step_item--active' } : { className: 'step_item' }}>
							<div className="item_dot">
								<span>{index + 1}</span>
							</div>
							<div className="item_text">
								<span>{i.title}</span>
							</div>
						</div>
					})}
				</div>
		};
	},
});
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
