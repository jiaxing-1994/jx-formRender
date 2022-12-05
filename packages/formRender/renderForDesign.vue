<template>
  <draggable
    item-key="cpnKey"
    :component-data="{
      class: 'render h_100 w_100 flex flex-wrap flex-left',
    }"
    :sort="false"
    :list="list"
    v-bind="draggableOptions"
    :group="{ name: 'formRender', pull: true }"
  >
    <template #item="{ element }">
      <div>{{ element.cpnKey }}</div>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import { FormBaseInfo } from "lc/types";
defineProps<{
  list: FormBaseInfo[];
}>();
const draggableOptions = {
  animation: 200,
  disabled: false,
  ghostClass: "ghost",
};
</script>

<style scoped></style>
