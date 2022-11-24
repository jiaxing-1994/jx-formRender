<template>
  <designer>
    <template #left>
      <cpns-panel></cpns-panel>
    </template>
    <template #header>
      <menus-panel></menus-panel>
    </template>
    <template #render>
      <form-render-for-edit :list="formDesignerStore.cpnList"></form-render-for-edit>
    </template>
    <template #right>
      <props-panel></props-panel>
    </template>
  </designer>
</template>

<script lang="ts" setup>
import Designer from "@layouts/designer.vue";
import useFormDesignerStore from "@stores/formDesigerStore";
const formDesignerStore = useFormDesignerStore();
</script>

<style lang="less" scoped></style>
