<template>
  <div
    :class="[
      ns,
      layout === 'vertical' && u('vertical'),
      layout === 'horizontal' && u('horizontal'),
    ]"
  >
    <div :class="[u('wrap')]">
      <div
        v-if="!isNoLabel"
        :class="[u('label')]"
      >
        <label :class="[isRequired && u('label', 'required')]">
          {{ label }}
        </label>
        <slot name="label"></slot>
      </div>
      <div
        :class="[
          u('content'),
          errMsg && 'ant-form-item-has-error',
          !isNoLabel && u('content', 'label'),
        ]"
      >
        <div :class="[u('content', 'wrap')]">
          <slot></slot>
        </div>
      </div>
    </div>
    <div :class="[u('err'), errMsg && u('has', 'err')]">
      {{ errMsg }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject, computed, useSlots, Ref } from "vue";
import { useNamespace } from "@lc/useHooks";
import Validator, { RuleType } from "@wk-libs/validator";

const props = defineProps<{
  label?: string;
  name?: string; // 字段标识，用来判断校验错误字段
}>();
const { ns, u } = useNamespace("form-item");

const layout = inject<Ref<string>>("layout");

const model = inject<Record<string, any>>("model");
const rules = inject<Ref<Record<string, RuleType[]>>>("rules");

// 当前控件的值
const value = computed(() => {
  if (model && props.name && model[props.name] !== undefined) {
    return model[props.name];
  }
  return null;
});
// 当前控件的规则
const rule = computed(() => {
  if (rules && props.name && rules.value[props.name] !== undefined) {
    return rules.value[props.name];
  }
  return [];
});

// 动态校验
const validator = new Validator();
const errMsg = computed(() => {
  const res = validator.validator(value.value, rule.value);
  if (res !== true) {
    return res[0].errMsg;
  }
  return "";
});

const isRequired = computed(() => rule.value.find((item) => item.validatorType === "REQUIRED"));

const slots = useSlots();
const isNoLabel = computed(() => {
  return slots.label || !props.label;
});
</script>

<style lang="less" scoped>
.wk-form-item {
  padding: 5px 10px;
  //margin: 5px 10px;
  &_wrap {
    width: 100%;
  }
  &_vertical {
    width: 100%;
  }
  &_horizontal {
    display: inline-block;
    white-space: nowrap;
    vertical-align: top;
    .wk-form-item_wrap {
      display: inline-block;
    }
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
    &-required::before {
      content: "*";
      color: #ff4d4f;
      margin-right: 5px;
    }
    label::after {
      content: ":";
    }
  }
  &_content {
    display: inline-block;
    padding: 3px;
    vertical-align: middle;
    width: 100%;
    &-label {
      width: calc(100% - 110px);
    }
    &-wrap {
      //max-width: 300px;
    }
  }
  &_err {
    padding-left: 110px;
    bottom: 0px;
    max-height: 0px;
    color: #ff4d4f;
    transition: all 0.5s;
  }
  &_has-err {
    max-height: 20px;
  }
}
</style>
