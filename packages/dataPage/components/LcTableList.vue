<template>
  <wk-table
    :columns="columns"
    :data="data"
  >
    <template #bodyCell="bodyCellProps">
      <section v-if="bodyCellProps.column.dataIndex === 'actions'">
        <a
          v-if="isShowCheck"
          class="mg-r_1"
          @click="onCheck(bodyCellProps.record)"
        >
          查看
        </a>
        <slot
          name="bodyCellActions"
          v-bind="bodyCellProps"
        ></slot>
        <a
          v-if="isShowDel"
          class="mg-r_1"
          @click="onDel(bodyCellProps.record)"
        >
          删除
        </a>
      </section>
      <slot
        v-else
        name="bodyCell"
        v-bind="bodyCellProps"
      ></slot>
    </template>
  </wk-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useFormTools, useFormConfig } from "lc/useHooks";
import { Configuration, CpnInfo, FormBaseInfo } from "lc/types";

const props = defineProps<{
  cpns: CpnInfo[];
  form: FormBaseInfo;
  data: Record<string, any>[];
  configuration: Configuration;
}>();

const emit = defineEmits<{
  (e: "del", value: string): void;
  (e: "check", value: string): void;
}>();

const { getTableListCpns } = useFormConfig();
const { getTabelColumns } = useFormTools();

const checkConfig = computed(() => {
  return props.configuration.defaultButtonConfig?.find((config) => config.type === "CHECK");
});
const isShowCheck = computed(() => {
  return !checkConfig.value || checkConfig.value.isShow;
});

const delConfig = computed(() => {
  return props.configuration.defaultButtonConfig?.find((config) => config.type === "DELETE");
});
const isShowDel = computed(() => {
  return !delConfig.value || delConfig.value.isShow;
});

const isHasActionColumns = computed(() => {
  return (
    !checkConfig.value || !delConfig.value || checkConfig.value.isShow || delConfig.value.isShow
  );
});

const columns = computed(() =>
  getTabelColumns(getTableListCpns(props.cpns), isHasActionColumns.value)
);

const onDel = ({ _id }: { _id: string }) => {
  emit("del", _id);
};
const onCheck = ({ _id }: { _id: string }) => {
  emit("check", _id);
};
</script>
