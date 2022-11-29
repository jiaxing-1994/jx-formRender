<template>
  <div
    class="table-header-col pd_1 flex"
    :style="{
      height: `${colHeight}px`,
      width: colWidth,
      left: colLeft,
    }"
  >
    <p class="w_24 ellipsis">
      {{ column.title }}
    </p>
    <div
      v-if="dragCol"
      ref="dragBar"
      class="drag-bar"
      :class="{
        'drag-bar_moving': isMoving,
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, inject, computed, Ref, PropType } from "vue";
import * as wkUtils from "@wk-libs/utils";
import { ColumnType } from "./wktTable.vue";
import { useMouseMove } from "@lc/useHooks";

export default defineComponent({
  name: "WkTableCol",
  props: {
    column: {
      type: Object as PropType<ColumnType>,
    },
    index: {
      type: Number as PropType<number>,
      default: 0,
    },
    minWidth: {
      type: Number as PropType<number>,
      default: 100,
    },
    maxWidth: {
      type: Number as PropType<number>,
      default: 1000,
    },
    dragCol: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props) {
    const colHeight = inject<Ref<number>>("colHeight");
    const colWidth = computed(() => {
      let width = "";
      if (props.column && props.column.width) {
        wkUtils.isString(props.column.width) && (width = props.column.width);
        wkUtils.isNumber(props.column.width) && (width = `${props.column.width}px`);
      }
      return width;
    });

    const colLeft = computed(() => {
      let left = "0px";
      if (props.column && props.column.left) {
        left = `${props.column.left}px`;
      }
      return left;
    });

    const dragBar = ref<HTMLElement | null>(null);
    const { mousePos, isMoving } = useMouseMove(dragBar);
    if (props.dragCol) {
      const dragColMovingCallback = inject<(index: number) => void>("dragColMovingCallback");
      watch(mousePos, () => {
        if (
          (props.column &&
            wkUtils.isNumber(props.column.width) &&
            props.column.width >= (props.column.minWidth || 0)) ||
          (props.minWidth &&
            props.column &&
            props.column.width! <= (props.column?.maxWidth || 0)) ||
          props.maxWidth
        ) {
          props.column!.width = Math.max(
            Math.min(Number(props.column!.width) + Number(mousePos.tickX), props.maxWidth),
            props.column!.minWidth || props.minWidth
          );
          if (dragColMovingCallback) {
            dragColMovingCallback(props.index);
          }
        }
      });
    }

    return {
      dragBar,
      colLeft,
      colWidth,
      isMoving,
      colHeight,
    };
  },
});
</script>

<style lang="less" scoped>
.table-header-col {
  position: absolute;
  height: 50px;
  padding: 10px;
  top: 0;
  left: 0;
  user-select: none;
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 40%;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #0000000f;
    z-index: 2;
  }
  .drag-bar {
    width: 3px;
    height: 100%;
    background-color: #fafafa;
    position: absolute;
    top: 0;
    right: 0px;
    z-index: 1;
    cursor: col-resize;
  }
  .drag-bar:hover {
    background-color: #0077dd;
  }
  .drag-bar_moving {
    background-color: #0077dd;
  }
}
.table-header-col:last-child::after {
  /*display: none;*/
}
</style>
