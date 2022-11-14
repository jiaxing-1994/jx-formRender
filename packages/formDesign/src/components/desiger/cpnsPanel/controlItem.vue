<template>
  <div
    class="drag-control"
    :class="{
      'cpn-disabled': label.indexOf('建设中') > -1,
    }"
  >
    <a class="cs_m br">
      <div
        class="mg-y_1"
        style="height: 22px; line-height: 1"
      >
        <i
          class="cpn-icon iconfont fc_6"
          :class="[cpnIcon[cpnType]]"
        ></i>
      </div>
      <p
        :title="label"
        class="ellipsis w_100 ta_c"
      >
        {{ label }}
      </p>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { cpnIcon } from "@lc/constants";

defineProps({
  label: {
    type: String,
  },
  cpnType: {
    type: String,
  },
});
</script>

<style lang="less" scoped>
@import "~style/color.less";
.drag-control {
  width: 31%;
  margin: 0 1%;
  user-select: none;
  margin-bottom: 10px;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    color: #333;
    background: #ffffff;
    box-shadow: 0 0 6px 0 #e5e5e5;
    border-radius: 4px;
  }
  a:hover {
    background: @mainColor;
    color: #ffffff;
    transition: all 0.3s ease-in-out;
    .cpn-icon {
      color: #ffffff;
    }
  }
}
.cpn-icon {
  font-size: 22px;
}
.cpn-disabled {
  a {
    pointer-events: none;
    cursor: not-allowed;
    background: #ebebeb;
    border: none;
    color: #ababab;
  }
}
</style>
