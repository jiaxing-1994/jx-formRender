<template>
  <div
    v-show="containerShow"
    class="controls_panel-container flex flex-top flex-wrap h_100 pd-l_1 of_a"
  >
    <h4 class="title">基础组件</h4>
    <cpn-draggable-wrap :drag-list="baseControlList"></cpn-draggable-wrap>
    <h4 class="title">高级组件</h4>
    <cpn-draggable-wrap :drag-list="advanceControlList"></cpn-draggable-wrap>
    <h4 class="title">布局组件</h4>
    <cpn-draggable-wrap :drag-list="contrainerControlList"></cpn-draggable-wrap>
  </div>
  <div
    class="absolute controls_panel-visible__btn white_bg fc_3 flex"
    @click="isShow = !isShow"
  >
    <span class="iconfont f-shouqi-"></span>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { cpns } from "@lc/constants";

const isShow = ref(true);
const containerShow = ref(true);
const controlsList = ref(cpns);
const baseControlList = computed(() => {
  return controlsList.value.filter((control) => !control.type || control.type === "base");
});
const advanceControlList = computed(() => {
  return controlsList.value.filter((control) => control.type === "advance");
});
const contrainerControlList = computed(() => {
  return controlsList.value.filter((control) => control.type === "layout");
});

watch(isShow, (newVal) => {
  if (newVal) containerShow.value = true;
  else {
    setTimeout(() => {
      containerShow.value = false;
    }, 400);
  }
});
</script>

<style lang="less" scoped></style>
