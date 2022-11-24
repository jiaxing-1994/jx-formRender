<template>
  <draggable
    item-key="cpnKey"
    :component-data="{
      class: 'drag-wrap w_100 flex flex-wrap flex-left',
    }"
    :clone="onClone"
    :sort="false"
    :list="dragList"
    :group="{ name: 'formRender', pull: 'clone', put: false }"
  >
    <template #item="{ element }">
      <control-item
        v-bind="element"
        @click="onClick(element)"
      ></control-item>
    </template>
  </draggable>
</template>

<script lang="ts" setup>
import { inject, PropType } from "vue";
import { deepCopy, uuid } from "@wk-libs/utils";
import { ControlFormType } from "@myTypes/index.d";

defineProps({
  dragList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

const onClone = (element: any) => {
  if (element.label.indexOf("建设中") > -1) {
    return;
  }
  return {
    ...deepCopy(element),
    cpnKey: `k_${element.cpnType}_${uuid("", "", 6)}`,
    label: `${element.label}${uuid("label", "mix", 6)}`,
    gridX: 24,
    width: 8,
    labelWidth: 100,
  };
};

const onAddControl = inject<(cpn: ControlFormType) => void>("onAddControl");
const onClick = (cpn: ControlFormType) => {
  if (cpn.label && cpn.label.indexOf("建设中") > -1) {
    return;
  }
  if (onAddControl) {
    onAddControl({
      ...cpn,
    });
  }
};
</script>

<style lang="ts" scoped></style>
