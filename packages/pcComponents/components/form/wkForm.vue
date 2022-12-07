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
import { ref, provide, watch } from "vue";
import { useNamespace } from "@lc/useHooks";
import Validator, { RuleType, ErrorType } from "@wk-libs/validator";

export type { RuleType };

const { ns, u } = useNamespace("form");
const props = withDefaults(
  defineProps<{
    layout?: string;
    model?: Record<string, any>;
    rules?: Record<string, RuleType[]>;
    ignoreKeys?: string[];
  }>(),
  {
    layout: "horizontal",
    rules: () => ({}),
  }
);

const rules = ref(props.rules || []);
watch(
  () => props.rules,
  () => {
    rules.value = props.rules || [];
  }
);
provide("model", props.model);
provide("rules", rules);

const errObj = ref<Record<string, ErrorType[]>>({}); // 整体校验
provide("errObj", errObj);
provide("layout", props.layout);

const validator = new Validator();
// 验证表单
const validate = (): Record<string, any> | null => {
  let errRes: boolean | Record<string, ErrorType[]> = true;
  if (props.model && props.rules) {
    errRes = validator.validatorObj(props.model, props.rules, props.ignoreKeys);
    errRes !== true ? (errObj.value = errRes) : (errObj.value = {});
  }
  return errRes === true ? props.model || {} : null;
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
