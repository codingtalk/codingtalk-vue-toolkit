<script lang="jsx" setup>
import { ref, defineComponent, onMounted, reactive } from "vue";
import { $dialog, $drawer, $message, $loading, utils } from "@codingtalk-vue-toolkit/index";
import CVT from "@codingtalk-vue-toolkit/index";
import entity from "@/entity";
import TimePicker from './time-picker.vue'

const { User } = entity;
const { CvtButton } = CVT;
const { _refMap, storeRef, getRef } = utils.vue.refUtil();

const tableMeta = reactive({
  column: [
    { label: "test", key: "name" },
    {
      label: "test1",
      key: "mobile",
      render: (row) => {
        return <p>{row.mobile}</p>;
      },
    },
  ],
  row: [{ name: "jerrytang", mobile: 16607574271 }],
});

const userQuery = reactive([
  { label: "关键字", key: "keyword" },
  { label: "手机号", key: "mobile" },
  {
    label: "注册时间", key: "nickname", render: ({ key, update }) => {
      return <TimePicker onChange={e => {
        update(key, e);
      }} />
    }
  }
]);

const userColumn = reactive([
  { label: "序号", key: "id", width: 200, sortable: true },
  { label: "昵称", key: "nickname" },
  { label: "手机号", key: "mobile" },
  {
    label: "头像",
    key: "avatar",
    width: 350,
    render: (row) => {
      return <img src="/src/assets/logo.png" />;
    },
  },
  { label: "创建时间", key: "createTime" },
  {
    label: "状态",
    key: "status",
    render: ({ row, key }) => {
      const v = row.toEnum('status');
      return <span style={`color:${v?.color}`}>{v?.label}</span>;
    }
  },
  {
    label: "操作",
    key: "operation",
    width: 300,
    fix: "right",
    render: (row) => {
      return <CvtButton type="primary" onClick={() => {
        getRef('cvtPageLoader').openRow(row, (rowInfo) => {
          const info = reactive(rowInfo);
          return defineComponent({
            setup() {
              return () => <div>{info.nickname}</div>;
            },
          })
        }, { entity: 'User', action: 'info' })
      }}>查看</CvtButton>;
    },
  },
]);
onMounted(() => {
  console.log(
    new User({
      name: "张三",
      userAccount: {
        balance: 0,
      },
    })
  );
  $dialog(
    defineComponent({
      setup() {
        return () => <div></div>;
      },
    }),
    {
      closeable: false,
      confirm: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject();
          }, 1000)
        })
      }
    }
  );
  setTimeout(() => {
    $message.tip("这是一个message tip");
    //$loading();
    getRef('cvtForm').init('User', 'login', {
      renderHook: {
        loginTime: (v, valid) => {
          return <TimePicker onChange={e => {
            console.log(v, valid());
            v.value = e;
          }} />;
        },
        time: (v, valid) => {
          return <TimePicker onChange={e => {
            v.value = e;
          }} />;
        }
      }
    });
    getRef('cvtDetail').init('User', 'info', () => {
      return new Promise((resolve) => {
        resolve({
          username: '张三',
          loginLog: [
            {
              ip: '192.168.1.1'
            }
          ]
        })
      });
    }, {
      init: () => {
        return {
          config: {
            type: 'default',
            col: 4
          },
          detail: [
            {
              "label": "关联订单",
              "key": "publish.sn",
              "type": "text"
            }
          ]
        }
      },
      renderHook: {
        'publish.sn': (v, info) => {
          return <p>{v}</p>
        }
      }
    })
    $drawer(
      defineComponent({
        setup() {
          return () => <div></div>;
        },
      }),
      {},
      {
        footerLeft: 'FooterLeft'
      }
    );
  }, 2000);
});

const cvtFormSubmitHandler = (e) => {
  const { form, callback } = e;
  console.log('form validate success ----->', form);
  callback();
}


</script>

<template>
  <div class="test">
    <p>--------------------- table ----------------------</p>
    <cvt-table :column="tableMeta?.column" :row="tableMeta?.row">
      <template v-slot:default="{ row }">
        <p>{{ row.mobile }}</p>
      </template>
    </cvt-table>
    <p>---------------------- selector ------------</p>
    <cvt-selector mode="remote" :config="{ entity: 'User', key: 'status' }" />
    <p>---------------------- page-loader ------------</p>
    <cvt-page-loader ref-key="cvtPageLoader" :ref="storeRef" :query="userQuery" :column="userColumn"
      :config="{ entity: 'User', action: 'page', enableRemoteConfig: 'User', hiddenModule: ['toolbar'] }"
      :check-filter="() => {}">

    </cvt-page-loader>
    <p>--------- charts ------------</p>
    <div class="charts">
      <div class="charts_container">
        <cvt-charts :json="{
          x: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          y: [
            {
              type: 'line',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }" />
      </div>
    </div>
    <p>----------------- form ---------------------</p>
    <cvt-form ref-key="cvtForm" :ref="storeRef" @submit="cvtFormSubmitHandler" />
    <p>----------------- detail -------------------</p>
    <cvt-detail ref-key="cvtDetail" :ref="storeRef"></cvt-detail>
  </div>
</template>

<style lang="less">
.test {
  text-align: left;
  background: #f7f7f7;

  .charts {
    display: flex;
    justify-content: center;

    .charts_container {
      width: 600px;
      height: 200px;
    }
  }
}
</style>
