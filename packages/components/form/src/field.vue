<script lang="jsx">
import { toRefs, defineComponent, h } from 'vue'
import CvtInput from '../../input'
import CvtUploader from '../../uploader'
import CvtRatio from '../../ratio'
import CvtTable from '../../table'
import CvtButton from '../../button'
import CvtGrid, { CvtGridItem } from '../../grid'
import { genArrayByLength, _find } from '../../../utils/fn';
import formToolkit from '../../../core/formToolkit';

export default defineComponent({
	props: {
		visible: {
			type: Array,
			default() {
				return [];
			},
		},
		section: {
			type: Array,
			default() {
				return [];
			},
		},
		json: {
			type: Object,
			default() {
				return [];
			},
		},
		type: {
			type: String,
			default() {
				return 'default';
			},
		},
		renderHook: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	setup(props, { slots, emit }) {
		const { type, section, json, visible } = toRefs(props);
		const getJsonItemByKey = (k) => {
			return _find(json.value, x => x.key === k);
		}
		const jsxFN = {
			array: {
				column: (item) => {
					return [...item.config.template.map(i => ({
						label: i.label,
						key: i.key,
						render: ({ row }) => {
							const { key } = i;
							return jsxFN.wedget(i, row[key])
						},
					})), {
						label: "操作",
						key: "operation",
						width: 150,
						fix: "right",
						render: ({ row, key }) => {
							return <CvtButton type="primary" onClick={() => { jsxFN.array.del(item, key) }}>删除</CvtButton>;
						},
					}]
				},
				add: (item) => {
					const formObj = {};
					const { _ } = window.$CVT
					for (let i in item.config.template) {
						const { key, opt } = _.cloneDeep(item.config.template[i]);
						formObj[key] = opt;
					}
					item.opt.value.push(formObj);
				},
				del: (item, k) => {
					item.opt.value.splice(k, 1);
				},
			},
			wedget: (item, opt) => {
				const v = opt || item.opt;
				if (props.renderHook?.[item.key]) {
					const formObj = {};
					for (let i in props.json) {
						const { key, opt } = props.json[i];
						formObj[key] = opt;
					}
					return props.renderHook?.[item.key](v, () => {
						return formToolkit.validate(formObj);
					})
				}
				if (['text', 'password', 'textarea'].includes(item.type)) {
					return <CvtInput type={item.type} vModel:value={v.value} />
				} else if (item.type === 'file') {
					return <CvtUploader onChange={(e) => v.value = e} />
				} else if (item.type === 'ratio') {
					return <CvtRatio option={item.config.ratio} vModel:value={v.value} />
				} else if (item.type === 'array') {
					return <>
						<div className="array_table">
							<CvtTable column={jsxFN.array.column(item)} row={v.value} />
						</div>
						<div className="array_btn">
							<CvtButton onClick={() => { jsxFN.array.add(item) }}>添加</CvtButton>
						</div>
					</>
				}
			},
			section: () => section.value.map((item, key) => {
				return <div className="field_section" key={key}>
					<div className="section_title">
						<div className="title_left">
							<span>{item.title}</span>
						</div>
					</div>
					<div className="section_main">
						<CvtGrid row={Math.ceil(item.field.length / item.col)} col={item.col}>
							{genArrayByLength(Math.ceil((item.field.length / item.col) || 0) * item.col).map((item1, key1) => {
								const jsonItem = getJsonItemByKey(item.field[item1])
								return <CvtGridItem key={key1} label={item.col > 1 ? jsonItem?.label : null}>
									{jsonItem ? jsxFN.wedget(jsonItem) : null}
								</CvtGridItem>
							})}
						</CvtGrid>
					</div>
				</div >
			}),
			defaultAndStep: () => json.value.filter(i => props.type === 'step' ? visible.value.includes(i.key) : true).map(item => {
				return <div className="field_item">
					<div className="item_title">
						<span>{item.label}</span>
						{!item.opt.require ? <span>（选填）</span> : null}
					</div>
					<div className={`item_content item_content--${item.type}`}>
						{jsxFN.wedget(item)}
					</div >
					{item.tip ? <div className="item_tip">
						<p>{item.tip}</p>
					</div> : null}
				</div >
			})
		}
		return () => {
			return <div className="cvt_form_field">
				{type.value === 'section' ? jsxFN.section() : jsxFN.defaultAndStep()}
			</div >
		}
	}
})



</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/field.less");
</style>
