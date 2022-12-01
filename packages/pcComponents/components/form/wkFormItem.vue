<template>
  <div :class="[ns]">
    <div
      :class="[
        u('wrap'),
        layout === 'vertical' && u('vertical'),
        layout === 'horizontal' && u('horizontal'),
      ]"
    >
      <div :class="[u('label')]">
        <label v-if="label">{{ label }}</label>
        <slot name="label"></slot>
      </div>
      <div
        :class="[
          u('content'),
          hasLabel && u('content', 'label'),
          errMsg && 'ant-form-item-has-error',
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
import { ErrorType } from "@wk-libs/validator";
const props = defineProps<{
  label: string;
  name: string; // 字段标识，用来判断校验错误字段
}>();
const { ns, u } = useNamespace("form-item");

const layout = inject<Ref<string>>("layout");

const slots = useSlots();
const hasLabel = computed(() => {
  return props.label || slots.label;
});

const errObj = inject<Ref<Record<string, ErrorType[]>>>("errObj");
const errMsg = computed(() => {
  if (errObj && errObj.value[props.name] && errObj.value[props.name].length > 0) {
    return errObj.value[props.name][0].errMsg;
  }
  return "";
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
    width: calc(100% - 110px);
    &-label {
      width: calc(100% - 110px);
    }
    &-wrap {
      max-width: 300px;
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
