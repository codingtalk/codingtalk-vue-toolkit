
import { ref, reactive, watch, defineComponent } from "vue";
import CvtButton from "../../button";
import CvtTable from "../../table";
import CvtGrid, { CvtGridItem } from "../../grid";
import CvtInput from "../../input";
import CvtSelector from "../../selector";
import CvtPagination from "../../pagination";
import { $dialog } from "../../dialog";
import "../style/index.less";

export default defineComponent({
  props: {
    title: {
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
    query: {
      type: Array,
      default() {
        return [];
      },
    },
    order: {
      type: Array,
      default() {
        return [];
      },
    },
    column: {
      type: Array,
      default() {
        return [];
      },
    },
    formPreHook: {
      type: Function
    },
    checkFilter: {
      type: Function
    }
  },
  emits: ['loaded', 'add'],

  setup(props, {
    slots,
    emit }) {
    const params = reactive({ pageIndex: 1, pageSize: 10 });
    const form = reactive({
      qo: {},
      query: {},
      order: {}
    });
    const isLoading = ref(false);
    const pageData = ref([]);
    const pageTotal = ref(0);


    function queryUpdate(k, v, isEvent = false) {
      form.query[k] = isEvent ? v.target?.value : v;
    }
    function queryReset() {
      params.pageIndex = 1;
      form.query = {};
    }
    function pageIndexUpdate(v) {
      params.pageIndex = v;
    }
    function getAdaptReq() {
      if (props.query) {
        for (let i in props.query) {
          const { key, value } = props.query[i];
          if (value) {
            form.query[key] = value;
          }
        }
      }
      if (props.formPreHook) {
        for (let i in props.formPreHook()?.query) {
          form.query[i] = ![undefined].includes(props.formPreHook()?.query[i]) ? props.formPreHook()?.query[i] : form.query[i];
        }
      }
      const { _entityCollection } = window.$CVT;
      isLoading.value = true;
      return _entityCollection[props.config.entity].sendApi(props.config.action, {
        params,
        body: form,
      }, { parse4Entity: true, enableRemoteConfig: props.config?.enableRemoteConfig });
    };

    function openRow(row, callback, config) {
      const { _entityCollection } = window.$CVT;
      const { id } = row;
      _entityCollection[config.entity].sendApi(config.action, {
        params: { id },
        body: {},
      }, { parse4Entity: true, enableRemoteConfig: props.config?.enableRemoteConfig }).then(res => {
        const { status, data } = res;
        if (status) {
          $dialog(
            callback(data),
            {
              confirm: () => {
                return new Promise((resolve) => {
                  resolve();
                })
              }
            }
          );
        }
      })
    }
    function init() {
      getAdaptReq().then((res) => {
        const { status, data, page } = res;
        const { _entityCollection } = window.$CVT;
        isLoading.value = false;
        if (status) {
          pageData.value = data;
          pageTotal.value = page.total;
          emit("loaded", pageData.value);
        }
      });
    };

    const throttleInit = ((fn) => {
      const { _ } = window.$CVT;
      return _.throttle(fn, 300, {
        leading: true,
        trailing: false
      })
    })(init)
    watch(
      () => [form, params, props.query, props.order],
      (val, preVal) => {
        throttleInit();
      },
      {
        deep: true,
        immediate: true
      }
    )
    return {
      props,
      slots,
      emit,
      openRow,
      init,
      queryUpdate,
      queryReset,
      pageData,
      pageTotal,
      pageIndexUpdate,
      form,
      params,
    }
  },
  render() {
    return <div className="cvt_page-loader">
      {!this.props.config.hiddenModule?.includes('query') ?
        <div className="loader_query">
          {this.slots.query ? this.slots.query({
            update: this.queryUpdate,
            reset: this.queryReset
          }) : <>
            <div className="query_left">
              <CvtGrid col={4} row={1}>
                {this.query.map((item, key) => <CvtGridItem key={key} label={item.label}>
                  {item.render
                    ? item.render({ key: item.key, update: this.queryUpdate })
                    : <CvtInput onChange={(e) => { this.queryUpdate(item.key, e, true) }} />}
                </CvtGridItem>)}
              </CvtGrid>
            </div >
            <div className="query_right">
                <CvtButton onClick={() => { 
                  this.queryReset();
                }}>重置</CvtButton>
            </div>
          </>}
        </div > : null
      }
      {!this.props.config.hiddenModule?.includes('toolbar') ? (
        this.slots.toolbar ? this.slots.toolbar() : <div className="loader_toolbar">
          <div className="toolbar_left">
            <div className="left_title">
              <span>{this.props.title}</span>
            </div>
          </div>
          <div className="toolbar_right">
            <div className="right_section">
              <div className="section_item">
                <CvtButton type="primary" onClick={() => { this.emit('add') }}>新增</CvtButton>
              </div>
            </div>
            <div className="right_section">
              <div className="section_item">
                <i className="cvt-icon">&#xe602;</i>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="loader_content">
        {this.slots.default ? this.slots.default({
          data: this.pageData
        }) : <CvtTable column={this.props.column} row={this.pageData} checkFilter={this.props.checkFilter} />}
      </div>
      {!this.props.config.hiddenModule?.includes('footer') ?
        <div className="loader_footer">
          {this.slots.footer ? this.slots.footer({ total: this.pageTotal, index: this.params.pageIndex, change: this.pageIndexUpdate }) : <>
            <div className="footer_left"></div>
            <div className="footer_right">
              <div className="right_total">
                <span>共查询到{Number(this.pageTotal).toLocaleString()}条相关记录</span>
              </div>
              <div className="right_size">
                <CvtPagination size={this.params.pageSize} total={this.pageTotal} onChange={e => { this.params.pageIndex = e }} />
              </div>
              <div className="right_page">
                <CvtSelector placeholder="10条/页" option={[
                  {
                    label: '10条/页',
                    value: 10,
                  },
                  {
                    label: '20条/页',
                    value: 20,
                  },
                  {
                    label: '50条/页',
                    value: 50,
                  },
                ]} />
              </div>
            </div>
          </>}
        </div> : null
      }
    </div >
  }
});