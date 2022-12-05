<template>
  <div class="option-bar w_100 flex flex-between pd-x_1">
    <div class="flex flex-left">
      <h4>{{ formInfo && formInfo.name }}</h4>
      <div class="flex flex-left mg-l_2">
        <button
          class="mg-l_1 cs-p fs_md mode-btn"
          :class="{
            'mode-active': mode === 'pc',
          }"
        >
          <i class="iconfont f-diannaoyulan"></i>
        </button>
        <button
          class="mg-l_1 cs-p fs_md mode-btn"
          :class="{
            'mode-active': mode === 'mobile',
          }"
        >
          <i class="iconfont f-shoujiyulan"></i>
        </button>
        <button
          class="mg-l_1 cs-p fs_md mode-btn"
          :class="{
            'mode-active': mode === 'template',
          }"
        >
          <i class="iconfont f-B_renwuliebiao_fu"></i>
        </button>
      </div>
    </div>
    <div class="flex">
      <a class="action-btn">
        <i
          class="iconfont f-qingkong fs_md"
          style="margin-top: 2px"
        />
        清空
      </a>
      <a class="mg-l_1 action-btn">
        <i
          class="iconfont f-yulan fs_md"
          style="margin-top: 4px"
        />
        预览
      </a>
      <a class="mg-l_1 action-btn">
        <i
          class="iconfont f-baocun fs_md"
          style="margin-top: 4px"
        />
        保存
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import useFormDesignerStore from "@stores/formDesigerStore";
const formDesignerStore = useFormDesignerStore();
const { formInfo, mode } = storeToRefs(formDesignerStore);
</script>

<style lang="less" scoped>
@import "~style/color.less";
.option-bar {
  height: 50px;
  background: #f8fcff;
}
.mode-btn {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  color: @mainColor;
  background: #ebf6ff;
}
.mode-active {
  color: #ffffff;
  background: @mainColor;
}
</style>
