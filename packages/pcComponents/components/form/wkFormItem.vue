<template>
  <div
    :class="[
      ns,
      layout === 'vertical' && u('vertical'),
      layout === 'horizontal' && u('horizontal'),
    ]"
  >
    <div :class="[u('label')]">
      <label v-if="label">{{ label }}</label>
      <slot name="label"></slot>
    </div>
    <div :class="[u('content'), hasLabel && u('content', 'label')]">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, useSlots, Ref } from "vue";
import { useNamespace } from "@lc/useHooks";
const props = defineProps<{
  label: string;
}>();
const { ns, u } = useNamespace("form-item");
const layout = inject<Ref<string>>("layout");
const slots = useSlots();
const hasLabel = computed(() => {
  return props.label || slots.label;
});
</script>

<style lang="less" scoped>
.wk-form-item {
  //padding: 5px 10px;
  margin: 5px 10px;
  &_vertical {
    width: 100%;
  }
  &_horizontal {
    display: inline-block;
    white-space: nowrap;
  }
  &_label {
    width: 100px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    label {
      width: 100%;
      text-align: right;
      display: inline-block;
    }
    label::after {
      content: ":";
    }
  }
  &_content {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    width: calc(100% - 100px);
    &-label {
      width: calc(100% - 100px);
    }
  }
}
</style>
