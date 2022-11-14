<template>
  <a-button
    class="button"
    v-bind="parentAttrs"
    @click.stop="onClick"
  >
    <slot></slot>
  </a-button>
</template>

<script lang="ts" setup>
import { useAttrs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  jumpTo: string;
}>();
const { push } = useRouter();
const parentAttrs = useAttrs();
const onClick = () => {
  if (props.jumpTo) {
    push(props.jumpTo);
  }
};
</script>

<style lang="less" scoped>
.button {
  font-size: inherit;
}
</style>
