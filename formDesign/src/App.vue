<template>
  <a-config-provider :locale="local">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      document.documentElement.addEventListener("touchmove", (e: TouchEvent) => {
        e.preventDefault();
      });
    });
    return {
      local: zhCN,
    };
  },
});
</script>

<style lang="less">
@import "ant-design-vue/dist/antd.less";
@import "~style/global.less";
@primary-color: #155bd4;
#app {
  height: 100%;
  overflow: hidden;
}
.ant-form-inline .ant-form-item > .ant-form-item-label {
  flex: inherit;
}
.ant-form-item {
  margin-bottom: 0;
}
.ant-form-inline .ant-form-item {
  margin-bottom: 10px;
  margin-right: 0px;
}
.ant-form-item-label {
  width: 100px;
}
.ant-form-item-control {
  width: 220px;
}
.ant-form-item-control .ant-select {
  min-width: 166px;
}
.ant-popover,
.ant-picker-dropdown,
.ant-select-dropdown {
  z-index: 5000;
}
</style>
