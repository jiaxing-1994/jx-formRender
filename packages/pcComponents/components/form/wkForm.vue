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
import { ref, provide } from "vue";
import { useNamespace } from "@lc/useHooks";
import Validator, { RuleType, ErrorType } from "@wk-libs/validator";

export type { RuleType };

const { ns, u } = useNamespace("form");
const props = withDefaults(
  defineProps<{
    layout?: string;
    model?: Record<string, any>;
    rules?: Record<string, RuleType[]>;
  }>(),
  {
    layout: "horizontal",
    rules: () => ({}),
  }
);

const errObj = ref<Record<string, ErrorType[]>>({});
provide("errObj", errObj);
provide("layout", props.layout);

const validator = new Validator();
// 验证表单
const validate = () => {
  if (props.model && props.rules) {
    const errRes = validator.validatorObj(props.model, props.rules);
    errRes !== true ? (errObj.value = errRes) : (errObj.value = {});
  }
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
