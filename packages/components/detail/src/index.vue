<script lang="jsx">
import { ref, defineComponent } from 'vue';
import CvtGrid, { CvtGridItem } from '../../grid';
import CvtTable from '../../table';
import { getObjVal, genArrayByLength, _find } from '../../../utils/fn';
import axios from '../../../utils/axios';

const config = ref(null);
const info = ref(null);
const detail = ref([]);
const renderHook = ref(null);

export default defineComponent({
    setup(props, { }) {
        const getJsonItemByKey = (k) => {
            if (!k) {
                return;
            }
            return _find(detail.value, x => x.key === k);
        }
        const jsxFN = {
            wedget(item, _v) {
                const label = info.value?.toEnum ? info.value?.toEnum(item.path || item.key)?.label : undefined
                const v = _v || (label
                    ? label
                    : getObjVal(info.value?._raw || info.value, item.path || item.key));
                if (renderHook.value?.[item.key]) { 
                    return renderHook.value?.[item.key](v, info.value);
                }
                if (item.type === 'array') {
                    return <CvtTable column={jsxFN.array(item)} row={v} />
                } else {
                    return <div className="content_val">
                        <span>{v}</span>
                    </div>;
                }
            },
            array(val) {
                return val.config.template.map(i => ({
                    label: i.label,
                    key: i.key,
                    render: ({ row }) => {
                        const { key } = i;
                        return jsxFN.wedget(i, row[key]);
                    },
                }));
            }
        }
        return () => <div className="cvt_detail">
            {config.value?.type === 'section' ? config.value?.section.map((item, key) => {
                return <div className="detail_section">
                    <div className="section_title">
                        <span>{item.title}</span>
                    </div>
                    <div className="section_content">
                        <CvtGrid row={Math.ceil(item.field.length / item.col)} col={item.col}>
                            {genArrayByLength(Math.ceil((item.field.length / item.col) || 0) * item.col).map((item1, key1) => {
                                const jsonItem = getJsonItemByKey(item.field[item1])
                                return <CvtGridItem key={key1} label={item.col > 1 ? jsonItem?.label : null}>
                                    {jsonItem ? jsxFN.wedget(jsonItem) : null}
                                </CvtGridItem>
                            })}
                        </CvtGrid>
                    </div>
                </div>
            }) : <CvtGrid row={Math.ceil(detail.value.length / config.value?.col)} col={config.value?.col}>
                {genArrayByLength(Math.ceil((detail.value.length / config.value?.col) || 0) * config.value?.col).map((item, key) => {
                    const jsonItem = getJsonItemByKey(detail.value[key]?.key);
                    return <CvtGridItem key={key} label={jsonItem?.label}>
                        {jsonItem ? jsxFN.wedget(jsonItem) : null}
                    </CvtGridItem>
                })}
            </CvtGrid>}
        </div>
    },
    methods: {
        init: async (domain, key, loader, opt,) => {
            const { _apiDetailURL } = window.$CVT;
            info.value = await loader();
            renderHook.value = opt?.renderHook;
            if (opt.init) {
                const data = opt.init();
                config.value = data?.config;
                detail.value = data?.detail;
            } else {
                const res = await axios.request({
                    baseURL: _apiDetailURL,
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
                    config.value = data?.config;
                    detail.value = data?.detail;
                }
            }
        },
        refresh: async (loader) => {
            info.value = await loader();
        }
    }
})
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>