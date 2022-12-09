<template>
  <div class="w_24 ta_r flex flex-right">
    <p class="ellipsis">
      {{ cpn.lable }}
    </p>
    <span v-if="cpn.searchMarks.length === 1">:</span>
    <wk-popover
      v-else
      placement="bottom"
      trigger="click"
    >
      <template #content>
        <p
          v-for="(item, index) in compares"
          :key="index"
          :class="['cs_p', compareIndex === index && u('active')]"
          @click="onSwitchType(index)"
        >
          {{ item.name }}
        </p>
      </template>
      <img
        v-if="currCompare"
        :class="[u('img')]"
        :title="currCompare && currCompare.name"
        :src="getImg(`${currCompare.value}.svg`)"
      />
    </wk-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { CpnInfo } from "@lc/types";
import { CPN_TYPE_TO_SEARCH_MARKS, SEARCH_MARK_INFO } from "@lc/constants";
import { useNamespace } from "@lc/useHooks";
import { getImg } from "../assets/imgs";

const props = defineProps<{
  defaultType: string;
  cpn: CpnInfo;
}>();
const emit = defineEmits<{
  (e: "change", value: string): void;
}>();

const { u } = useNamespace("lc-search-label", false);

const compares = computed(() => {
  return CPN_TYPE_TO_SEARCH_MARKS[props.cpn.cpnType]
    .map((item) => SEARCH_MARK_INFO[item])
    .filter((type) => props.cpn.searchMarks.includes(type.value));
});
const compareIndex = ref(0);
const initIndex = () => {
  if (props.defaultType) {
    const findIndex = compares.value.findIndex((item) => item.value === props.defaultType);
    compareIndex.value = Math.max(findIndex, 0);
  }
};
initIndex();
const onSwitchType = (index: number) => {
  compareIndex.value = index;
  emit("change", currCompare.value?.value);
};
// 当前选择的搜索类型
const currCompare = computed(() => {
  return compares.value[compareIndex.value] || null;
});
</script>

<style lang="less">
.lc-search-label {
  &_active {
    color: #006cc6;
  }
  &_img {
    width: 15px;
    height: 15px;
    margin-left: 3px;
  }
}
</style>
