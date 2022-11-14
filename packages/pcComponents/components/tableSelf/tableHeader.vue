<template>
  <table-header-col
    v-for="(column, index) in columns"
    :key="index"
    :column="column"
    :index="index"
    :drag-col="dragCol"
  />
  <div
    v-if="fixed"
    class="table-shadow"
    :class="{
      'table-shadow_show': isShowShadow,
      'table-shadow_left': fixed === 'left',
      'table-shadow_right': fixed === 'right',
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, Ref, PropType } from "vue";
import type { ColumnType } from "./wktTable.vue";
import tableHeaderCol from "./tableHeaderCol.vue";

export default defineComponent({
  name: "TableHeaderRow",
  components: {
    tableHeaderCol,
  },
  props: {
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    fixed: {
      type: [String, null] as PropType<string>,
      default: null,
    },
    dragCol: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props) {
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
      isShowShadow,
    };
  },
});
</script>

<style lang="less" scoped>
.table-header {
}
.table-shadow {
  position: absolute;
  width: 20px;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
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
