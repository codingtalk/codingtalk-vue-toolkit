<script lang="jsx">
import { defineComponent, shallowRef } from "vue";

export default defineComponent({
    name: "cvt-charts",
    props: {
        json: {
            type: Object,
            default() {
                return {
                    x: [],
                    y: []
                }
            }
        }
    },
    data() {
        const { _ } = window.$CVT;
        return {
            echartsInstance: null,
            throttleReSize: _.throttle(() => {
                this.echartsInstance?.resize();
            }, 500),
        }
    },
    mounted() {
        this.init();
        this.resizeListener();
    },
    methods: {
        init() {
            const { _echarts } = window.$CVT;
            if (!_echarts) {
                throw 'charts init error: =====> echarts is required';
            }
            this.echartsInstance = shallowRef(_echarts.init(this.$el));
            var option;
            option = {
                xAxis: {
                    show: false,
                    type: 'category',
                    data: this.json.x,
                },
                yAxis: {
                    show: false,
                    type: 'value'
                },
                series: this.json.y.map(i => {
                    const { type, data } = i;
                    return {
                        data,
                        type,
                        smooth: true,
                        itemStyle: {
                            color: '#0770FF'
                        },
                        areaStyle: {
                            color: new _echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(58,77,233,0.8)'
                            }, {
                                offset: 1,
                                color: 'rgba(58,77,233,0.3)'
                            }])

                        }
                    }
                })
            };

            option && this.echartsInstance.setOption(option);
        },
        resizeListener() {
            window.addEventListener("resize", () => {
                this.throttleReSize();
            });
        }
    },
    setup(props, { slots }) {
        return () => {
            return <div class="cvt_charts"></div>;
        };
    },
});
</script>

<style lang="less">
@import url("../../../style/var.less");
@import url("../../../style/mixins.less");
@import url("../style/index.less");
</style>
