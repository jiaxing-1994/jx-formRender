<template>
  <div
    :class="[
      ns,
      layout === 'vertical' && u('vertical'),
      layout === 'horizontal' && u('horizontal'),
    ]"
  >
    <label v-if="label">{{ label }}</label>
    <div :class="[u('content')]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, Ref } from "vue";
import { useNamespace } from "@lc/useHooks";
const { ns, u } = useNamespace("form-item");
defineProps<{
  label: string;
}>();
const layout = inject<Ref<string>>("layout");
</script>

<style lang="less" scoped>
.wk-form-item {
  padding: 5px 10px;
  margin: 5px 10px;
  &_vertical {
    width: 100%;
  }
  &_horizontal {
    display: inline-block;
  }
  label {
    display: inline-block;
    margin-right: 10px;
  }
  label::after {
    content: ":";
  }
  &_content {
    display: inline-block;
    border: solid 1px #e3e3e3;
    padding: 3px;
  }
}
</style>
