
import { defineComponent } from "vue";
import CvtCheck from '../../check';
import "../style/index.less";

export default defineComponent({
  name: "cvt-table",
  props: {
    checkFilter: {
      type: Function
    },
    column: {
      type: Array,
      default() {
        return [];
      },
    },
    row: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, { slots }) {
    const getCellVal = (row, col, rowKey) => {
      return (col.render && col.render({ row, key: rowKey })) || row[col.key] || row._raw?.[col.key];
    };
    return () => <div className="cvt_table">
      {slots.default ? (
        <div className="table_customize">
          {props.row.map((row, rowKey) => {
            return <div key={rowKey} className="customize_item">
              {slots.default?.({
                row,
              })}
            </div>;
          })}
        </div>
      ) : (
        <div className="table_main">
          <table cellspacing="0" style="table-layout: fixed">
            <thead>
              <tr>
                {props.checkFilter ? <th></th> : null}
                {props.column.map((col, colKey) => {
                  return <th key={colKey} {...col.width ? { style: `min-width:${col.width}px;width:${col.width}px;` } : {}} {...col.fix ? { className: `col_fix--${col.fix}` } : {}}>
                    {col.sortable ?
                      <div className="th_wrap">
                        <span>{col.label}</span>
                        <i class="cvt-icon">&#xe609;</i>
                      </div>
                      : <span>{col.label}</span>}
                  </th>;
                })}
              </tr>
            </thead>
            <tbody>
              {props.row.map((row, rowKey) => {
                return <tr key={rowKey}>
                  {props.checkFilter ? <td className="col_check">
                    <CvtCheck />
                  </td> : null}
                  {props.column.map((col, colKey) => {
                    return <td key={colKey} {...col.fix ? { className: `col_fix--${col.fix}` } : {}}>{getCellVal(row, col, rowKey)}</td>;
                  })}
                </tr>
              })}
            </tbody>
          </table>
        </div>
      )}
      {!props.row.length ? <div className="table_no">
        <p>暂无更多数据</p>
      </div> : ''}
    </div>
  },
});
