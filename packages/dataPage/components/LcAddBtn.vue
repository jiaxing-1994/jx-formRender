<template>
  <wk-button
    class="mg-x_1"
    type="primary"
    @click="onToAdd"
  >
    新增
  </wk-button>
</template>

<script lang="ts" setup>
import { FormBaseInfo } from "@lc/types";

defineProps<{
  form: FormBaseInfo | undefined;
}>();
const emit = defineEmits<{
  (e: "onToAdd"): void;
}>();

const onToAdd = () => {
  emit("onToAdd");
};
</script>
