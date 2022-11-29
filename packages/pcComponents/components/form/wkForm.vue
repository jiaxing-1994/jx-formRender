<template>
  <div
    :class="[
      ns,
      layout === 'vertical' && u('vertical'),
      layout === 'horizontal' && u('horizontal'),
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide } from "vue";
import { useNamespace } from "@lc/useHooks";
const { ns, u } = useNamespace("form");
const props = defineProps<{
  layout?: string;
  model?: object;
}>();
provide("layout", props.layout);

// 验证表单
const validate = () => {
  return props.model;
};
defineExpose<{
  validate: typeof validate;
}>({
  validate,
});
</script>

<style lang="less" scoped>
.wk-form {
  width: 100%;
  &_vertical {
  }
  &_horizontal {
  }
}
</style>
