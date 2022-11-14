<template>
  <div
    class="table-row absolute"
    :style="{
      transform: translate3d,
      width: width,
    }"
  >
    <slot></slot>
    <div
      v-if="fixed"
      class="table-shadow"
      :class="{
        'table-shadow_show': isShowShadow,
        'table-shadow_left': fixed === 'left',
        'table-shadow_right': fixed === 'right',
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, PropType, Ref } from "vue";
import type { ColumnType } from "./wktTable.vue";

export default defineComponent({
  name: "WkTableRow",
  props: {
    column: {
      type: Object as PropType<ColumnType>,
    },
    currIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
    originIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
    startRowIndex: {
      type: Number as PropType<number>,
      default: 0,
    },
    width: {
      type: [Number, String] as PropType<number | string>,
      default: "100%",
    },
    fixed: {
      type: [String, null] as PropType<string>,
      default: null,
    },
  },
  setup(props) {
    const colHeight = inject<number>("colHeight");
    const scrollTop = computed(() => {
      if (colHeight) {
        return props.startRowIndex * colHeight;
      }
      return 0;
    });
    const translate3d = computed(() => {
      if (colHeight) {
        return `translate3d(0px, ${scrollTop.value + props.currIndex * colHeight}px, 0px)`;
      }
      return null;
    });

    const isTouchLeft = inject<Ref<boolean>>("isTouchLeft");
    const isTouchRight = inject<Ref<boolean>>("isTouchRight");
    const isShowShadow = computed(() => {
      if (isTouchLeft && isTouchRight) {
        switch (props.fixed) {
          case "left":
            return !isTouchLeft.value;
          case "right":
            return !isTouchRight.value;
          default:
            return false;
        }
      }
      return false;
    });
    return {
      translate3d,
      isShowShadow,
    };
  },
});
</script>

<style lang="less" scoped>
.table-row {
  width: 100%;
  height: 60px;
}
.table-shadow {
  position: absolute;
  width: 20px;
  bottom: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  &_show {
    opacity: 1;
  }
  &_left {
    right: -20px;
    box-shadow: 8px 0px 8px -6px #ddd inset;
  }
  &_right {
    left: -20px;
    box-shadow: -8px 0px 8px -6px #ddd inset;
  }
}
</style>
