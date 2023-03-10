<template>
  <div
    ref="tableRef"
    class="table bd_s-1 br_1"
    :class="{
      table_select: canRowSelect,
    }"
    :style="{
      height: `${height}px`,
    }"
  >
    <div class="absolute-c">
      <a-empty v-if="data.length === 0 && !load"></a-empty>
      <wk-loading v-if="load"></wk-loading>
    </div>
    <div class="table-header flex flex-between">
      <div
        ref="tableHeaderRef"
        class="table-header_viewport flex flex-between flex1"
      >
        <div class="table-header_container flex">
          <div
            v-if="canRowSelect"
            class="table-header_select table_select-row table-fixed"
          >
            <table-select-header
              :data="data"
              :visible-rows="visibleRows"
              :start-row-index="startRowIndex"
              :columns="fixedLeftColumns"
              :row-key="rowKey"
              :row-selection="rowSelection"
            ></table-select-header>
          </div>
          <div
            v-if="fixedLeftColumns.length > 0"
            key="left"
            class="table-header_left table_left table-fixed"
          >
            <table-header
              :drag-col="dragCol"
              :columns="fixedLeftColumns"
              fixed="left"
            ></table-header>
          </div>
          <div class="table-header_middle">
            <div
              ref="tableHeaderMiddleContainerRef"
              class="table-header_middle-container"
            >
              <table-header
                :drag-col="dragCol"
                :columns="middleColumns"
              ></table-header>
            </div>
          </div>
          <div
            v-if="fixedRightColumns.length > 0"
            class="table-header_right table_right table_fixed"
          >
            <table-header
              :drag-col="dragCol"
              :columns="fixedRightColumns"
              fixed="right"
            ></table-header>
          </div>
        </div>
      </div>
      <div
        v-if="isShowHeaderScrollbar"
        class="table-header_scrollbar"
      ></div>
    </div>
    <div
      ref="tableBodyRef"
      class="table-body flex flex-between flex-top"
    >
      <div
        ref="tableBodyContainerRef"
        class="table-body_container flex"
      >
        <div
          v-if="canRowSelect"
          ref="tableBodySelectRef"
          class="table_select-row table-fixed"
          :style="{
            height: `${cacheHeight.tableBodyScrollHeight}px`,
          }"
        >
          <table-select-rows
            :data="data"
            :visible-rows="visibleRows"
            :start-row-index="startRowIndex"
            :columns="fixedLeftColumns"
            :row-key="rowKey"
            :row-selection="rowSelection"
          ></table-select-rows>
        </div>
        <div
          v-if="fixedLeftColumns.length > 0"
          ref="tableBodyLeftRef"
          class="table_left table-fixed"
        >
          <table-rows
            :data="data"
            :visible-rows="visibleRows"
            :start-row-index="startRowIndex"
            :columns="fixedLeftColumns"
            fixed="left"
          ></table-rows>
        </div>
        <div class="table_middle">
          <div
            ref="tableBodyMiddleContainerRef"
            class="table_middle-container"
          >
            <table-rows
              :data="data"
              :visible-rows="visibleRows"
              :start-row-index="startRowIndex"
              :columns="middleColumns"
            ></table-rows>
          </div>
        </div>
        <div
          v-if="fixedRightColumns.length > 0"
          ref="tableBodyRightRef"
          class="table_right table-fixed"
        >
          <table-rows
            :data="data"
            :visible-rows="visibleRows"
            :start-row-index="startRowIndex"
            :columns="fixedRightColumns"
            fixed="right"
          ></table-rows>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  provide,
  reactive,
  useSlots,
  nextTick,
  computed,
  onMounted,
  onUnmounted,
  PropType,
} from "vue";
import * as wkUtils from "@wk-libs/utils";
import tableRows, { VisibleType } from "./tableRows.vue";
import tableSelectRows, { RowSelectionType } from "./tableSelectRows.vue";
import tableSelectHeader from "./tableSelectHeader.vue";
import tableHeader from "./tableHeader.vue";

export enum FixedEnum {
  left = "left",
  right = "right",
}
export interface CustomRenderParamsType {
  text: any;
  record: Record<string, any>;
  index: number;
  column: ColumnType;
}
export type CustomRenderType = (params: CustomRenderParamsType) => any;

export type CustomRenderAsyncType = (params: CustomRenderParamsType) => Promise<any>;

export interface ColumnType {
  title: string;
  dataIndex: string;
  width?: number | string;
  fixed?: string;
  customRender?: CustomRenderType;
  customRenderAsync?: CustomRenderAsyncType;
  slotName?: string;
  minWidth?: number;
  maxWidth?: number;
  widthPercent?: number;
  left?: number;
}

let colHeight = 60;
export default defineComponent({
  name: "WkTableSelf",
  components: {
    tableRows,
    tableHeader,
    tableSelectRows,
    tableSelectHeader,
  },
  props: {
    columns: {
      type: Array as PropType<ColumnType[]>,
      default: () => [],
    },
    data: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
    rowSelection: {
      type: [Object, null] as PropType<RowSelectionType | null>,
      default: null,
    },
    rowKey: {
      type: [Function, null] as PropType<(data: null) => string | null>,
      default: null,
    },
    height: {
      type: Number as PropType<number>,
      default: 300,
    },
    load: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    dragCol: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
  },
  setup(props) {
    provide("colHeight", colHeight);
    const slots = useSlots();
    provide("slots", slots);
    const rowSelectList = ref<string[]>(props.rowSelection?.selectedRowKeys || []);
    const rowSelectDataList = ref<string[]>([]);
    let isFirstChange = true;
    watch(
      () => props.rowSelection,
      () => {
        if (!isFirstChange) {
          return;
        }
        isFirstChange = false;
        rowSelectList.value = props.rowSelection?.selectedRowKeys || [];
      }
    );
    watch(
      rowSelectList,
      () => {
        if (props.rowSelection?.onChange) {
          props.rowSelection?.onChange(rowSelectList.value, rowSelectDataList.value);
        }
      },
      {
        deep: true,
      }
    );
    provide("rowSelectList", rowSelectList);
    provide("rowSelectDataList", rowSelectDataList);

    const { getColumnWidth, getDomWH } = useTool();

    const fixedLeftColumns = reactive<ColumnType[]>([]); // ???????????????
    const middleColumns = reactive<ColumnType[]>([]); // ???????????????
    const fixedRightColumns = reactive<ColumnType[]>([]); //???????????????

    const canRowSelect = computed(() => {
      return !!props.rowSelection;
    });

    // ?????????????????? ???????????????????????????????????????
    const handleColumns = () => {
      fixedLeftColumns.length = 0;
      fixedRightColumns.length = 0;
      middleColumns.length = 0;
      props.columns.forEach((column) => {
        const { fixed } = column;
        if (fixed === FixedEnum.left) {
          // ????????????
          fixedLeftColumns.push(wkUtils.deepCopy(column));
        } else if (fixed === FixedEnum.right) {
          // ????????????
          fixedRightColumns.push(wkUtils.deepCopy(column));
        } else {
          middleColumns.push(wkUtils.deepCopy(column));
        }
      });
      // ?????????????????????????????????????????????????????? ??????????????????????????????width???????????????????????????
      const setWidth = (columns: ColumnType[], isFixed = false) => {
        const noWidthColumns = columns.filter((column) => !column.width);
        const widthPercent = Number((1 / noWidthColumns.length).toFixed(2));
        columns.forEach((column) => {
          !column.width && (isFixed ? (column.width = 60) : (column.widthPercent = widthPercent));
        });
      };
      setWidth(fixedLeftColumns, true);
      setWidth(fixedRightColumns, true);
      setWidth(middleColumns);
    };

    // ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    const cacheWidth = reactive({
      tableBodyWidth: 0, // ????????????
      tableSelectWidth: 40,
      tableHeaderClientWidth: 0, // ??????????????????
      leftFixedWidth: 0, // ??????????????????
      rightFixedWidth: 0, // ??????????????????
      middleWidth: 0, // ????????????
    });
    const cacheHeight = reactive({
      tableHeight: 0, // ????????????
      tableBodyHeight: 0, // ????????????
      tableBodyScrollHeight: 0, // ??????????????????
    });

    const tableRef = ref<HTMLElement | null>(null); // ??????dom
    const tableHeaderRef = ref<HTMLElement | null>(null); // ????????????dom
    const tableBodyRef = ref<HTMLElement | null>(null); // ???????????????dom
    const tableBodySelectRef = ref<HTMLElement | null>(null); // ???????????????dom
    const tableBodyLeftRef = ref<HTMLElement | null>(null); // ????????????????????????dom
    const tableBodyRightRef = ref<HTMLElement | null>(null); // ????????????????????????dom
    const tableBodyContainerRef = ref<HTMLElement | null>(null); //??????????????????dom
    const tableBodyMiddleContainerRef = ref<HTMLElement | null>(null); //????????????????????????dom
    const tableHeaderMiddleContainerRef = ref<HTMLElement | null>(null); // ??????????????????????????????dom

    // ???????????? ?????????????????????????????????
    const initContainerHeight = () => {
      cacheHeight.tableBodyScrollHeight = props.data.length * colHeight;
      tableBodyMiddleContainerRef.value &&
        wkUtils.setStyleByDom(
          tableBodyMiddleContainerRef.value,
          "height",
          `${cacheHeight.tableBodyScrollHeight}px`
        );
      tableBodyLeftRef.value &&
        wkUtils.setStyleByDom(
          tableBodyLeftRef.value,
          "height",
          `${cacheHeight.tableBodyScrollHeight}px`
        );
      tableBodyRightRef.value &&
        wkUtils.setStyleByDom(
          tableBodyRightRef.value,
          "height",
          `${cacheHeight.tableBodyScrollHeight}px`
        );
      tableBodySelectRef.value &&
        wkUtils.setStyleByDom(
          tableBodySelectRef.value,
          "height",
          `${cacheHeight.tableBodyScrollHeight}px`
        );
    };
    // ?????????????????????
    const initContainerWidth = (type = "all") => {
      if (
        tableRef.value &&
        tableBodyRef.value &&
        tableHeaderRef.value &&
        tableBodyMiddleContainerRef.value &&
        tableHeaderMiddleContainerRef.value
      ) {
        // ??????????????????
        const setLeftWidth = () => {
          if (tableRef.value) {
            const leftFixedDoms = wkUtils.getDomByClass(tableRef.value, "table_left");
            cacheWidth.leftFixedWidth = fixedLeftColumns.reduce(
              (a: number, b: ColumnType) => a + getColumnWidth(b.width),
              0
            );
            Array.from(leftFixedDoms).forEach((dom) => {
              wkUtils.setStyleByDom(dom, "width", `${cacheWidth.leftFixedWidth}px`);
            });
          }
        };

        // ??????????????????
        const setRightWidth = () => {
          if (tableRef.value) {
            const rightFixedDoms = wkUtils.getDomByClass(tableRef.value, "table_right");
            cacheWidth.rightFixedWidth = fixedRightColumns.reduce(
              (a: number, b: ColumnType) => a + getColumnWidth(b.width),
              0
            );
            Array.from(rightFixedDoms).forEach((dom) => {
              wkUtils.setStyleByDom(dom, "width", `${cacheWidth.rightFixedWidth}px`);
            });
          }
        };
        // ??????????????????
        const setBodyWidth = () => {
          if (
            tableBodyRef.value &&
            tableHeaderRef.value &&
            tableBodyMiddleContainerRef.value &&
            tableHeaderMiddleContainerRef.value
          ) {
            cacheWidth.tableBodyWidth =
              getDomWH(tableBodyRef.value, "w") || cacheWidth.tableBodyWidth;
            cacheWidth.tableHeaderClientWidth = getDomWH(tableHeaderRef.value, "cw");
            const middleColumnsWidth = middleColumns.reduce(
              (a: number, b: ColumnType) => a + getColumnWidth(b.width),
              0
            );
            let middleWidthTemp =
              cacheWidth.tableBodyWidth - cacheWidth.leftFixedWidth - cacheWidth.rightFixedWidth;
            middleWidthTemp -= 6;
            cacheWidth.middleWidth = Math.max(middleWidthTemp, middleColumnsWidth);
            wkUtils.setStyleByDom(
              tableBodyMiddleContainerRef.value,
              "width",
              `${cacheWidth.middleWidth}px`
            );
            wkUtils.setStyleByDom(
              tableHeaderMiddleContainerRef.value,
              "width",
              `${cacheWidth.middleWidth}px`
            );
          }
        };
        switch (type) {
          case "all":
            setLeftWidth();
            setRightWidth();
            setBodyWidth();
            break;
          case "left":
            setLeftWidth();
            break;
          case "right":
            setRightWidth();
            break;
          case "middle":
            setBodyWidth();
            break;
          default:
            setLeftWidth();
            setRightWidth();
            setBodyWidth();
            break;
        }
      }
    };
    // ?????????????????????????????????????????????
    const setColumnWidthAndLeft = (
      columns: ColumnType[],
      totalWidth: number,
      startRowIndex = 0
    ) => {
      // ????????????????????????
      let alreadyWidth = 0;
      if (props.dragCol) {
        alreadyWidth = columns
          .filter((column) => column.width)
          .reduce((a: number, b: ColumnType): number => a + getColumnWidth(b.width), 0);
      }
      const restWidth = totalWidth - alreadyWidth;
      let lastWidth = columns
        .slice(0, startRowIndex)
        .reduce((a, b) => a + getColumnWidth(b.width), 0);
      columns.forEach((column, index) => {
        if (startRowIndex <= index) {
          if (!column.width && column.widthPercent && props.dragCol) {
            column.width = Math.max(100, restWidth * column.widthPercent);
          } else if (column.widthPercent && !props.dragCol) {
            column.width = Math.max(100, restWidth * column.widthPercent);
          }
          column.left = lastWidth;
          lastWidth += getColumnWidth(column.width);
        }
      });
    };
    // ???????????????????????????
    const dragColMovingCallback = (index: number) => {
      initContainerWidth(); // ???????????????
      scrollTableHeader();
      setColumnWidthAndLeft(fixedLeftColumns, cacheWidth.leftFixedWidth, index);
      setColumnWidthAndLeft(fixedRightColumns, cacheWidth.rightFixedWidth, index);
      setColumnWidthAndLeft(middleColumns, cacheWidth.middleWidth, index);
    };
    provide("dragColMovingCallback", dragColMovingCallback);
    // ??????????????????
    const cacheTableWidthAndHeight = () => {
      if (tableRef.value) {
        cacheWidth.tableBodyWidth = getDomWH(tableRef.value, "w");
        cacheHeight.tableHeight = getDomWH(tableRef.value, "h");
        cacheHeight.tableBodyHeight = Math.max(cacheHeight.tableHeight - colHeight, 0);
      }
    };

    const cacheScroll = reactive({
      scrollLeft: 0,
      scrollUp: 0,
    });
    // ??????????????????????????????
    const startRowIndex = ref(0);
    const visibleRows = ref<VisibleType[]>([]);
    const maxRows = ref(0);
    // ????????????????????????????????????????????????
    const getMaxRow = () => {
      const rows = Math.min(
        Math.ceil(cacheHeight.tableBodyHeight / colHeight) * 2,
        props.data?.length
      );
      maxRows.value = Math.min(
        Math.ceil(cacheHeight.tableBodyHeight / colHeight),
        props.data?.length
      );
      visibleRows.value = Array.from(new Array(rows)).map((item, index) => ({
        originIndex: index,
        currIndex: index,
      }));
    };
    const handleRowInViewer = () => {
      if (tableBodyRef.value) {
        startRowIndex.value = 0;
        cacheHeight.tableBodyHeight = getDomWH(tableBodyRef.value, "h");
        cacheScroll.scrollUp = tableBodyRef.value.scrollTop;
        if (cacheScroll.scrollUp > colHeight) {
          startRowIndex.value = Math.min(
            Math.max(Math.floor(cacheScroll.scrollUp / colHeight) - 1, 0),
            props.data?.length - maxRows.value
          );
        } else if (cacheScroll.scrollUp === 0) {
          startRowIndex.value = 0;
        }

        const loopNum = Math.floor(cacheScroll.scrollUp / colHeight) % props.data?.length;
        visibleRows.value.forEach((row) => {
          let currIndex = row.originIndex - (loopNum % visibleRows.value.length);
          if (currIndex < 0) {
            currIndex = currIndex + visibleRows.value.length;
          }
          row.currIndex = currIndex;
        });
      }
    };
    const startColIndex = ref(0);
    // ????????????????????????????????????????????????
    const handleColInViewer = () => {
      const { scrollLeft } = cacheScroll;
      let currTotalWidth = 0;
      middleColumns.find((column, index) => {
        currTotalWidth += column.width as number;
        if (currTotalWidth > scrollLeft) {
          startColIndex.value = index;
          return true;
        }
        return false;
      });
    };

    const isTouchLeft = ref(false);
    const isTouchRight = ref(false);
    provide("isTouchLeft", isTouchLeft);
    provide("isTouchRight", isTouchRight);
    // ????????????????????????
    const scrollTableHeader = () => {
      if (tableBodyRef.value) {
        const { scrollLeft } = tableBodyRef.value;
        if (scrollLeft === 0) {
          isTouchLeft.value = true;
        } else {
          isTouchLeft.value = false;
        }
        const { tableHeaderClientWidth, leftFixedWidth, rightFixedWidth, middleWidth } = cacheWidth;
        const maxScrollWidth = leftFixedWidth + rightFixedWidth + middleWidth;
        if (Math.ceil(scrollLeft + tableHeaderClientWidth + 1) >= maxScrollWidth) {
          isTouchRight.value = true;
        } else {
          isTouchRight.value = false;
        }
        cacheScroll.scrollLeft = scrollLeft;
        if (tableHeaderRef.value) {
          tableHeaderRef.value.scrollLeft = scrollLeft;
        }
      }
    };

    const onTableBodyScroll = () => {
      handleRowInViewer();
      handleColInViewer(); // ????????????????????????????????????
      scrollTableHeader(); // ????????????????????????
    };

    const init = () => {
      cacheTableWidthAndHeight(); // ??????????????????????????????
      handleColumns(); // ???????????????
      nextTick(() => {
        initContainerHeight(); // ???????????????
        setColumnWidthAndLeft(fixedLeftColumns, cacheWidth.leftFixedWidth);
        setColumnWidthAndLeft(fixedRightColumns, cacheWidth.rightFixedWidth);
        setColumnWidthAndLeft(middleColumns, cacheWidth.middleWidth);
        initContainerWidth(); // ???????????????
        scrollTableHeader();
      });
      getMaxRow(); // ???????????????????????????????????????
      handleColInViewer(); // ????????????????????????????????????
      handleRowInViewer(); // ????????????????????????????????????
    };

    // columns????????????
    watch(
      () => props.columns,
      () => {
        handleColumns();
        initContainerWidth(); // ???????????????
        setColumnWidthAndLeft(fixedLeftColumns, cacheWidth.leftFixedWidth);
        setColumnWidthAndLeft(fixedRightColumns, cacheWidth.rightFixedWidth);
        setColumnWidthAndLeft(middleColumns, cacheWidth.middleWidth);
      }
    );

    // ???????????????
    watch(
      () => props.data,
      () => {
        initContainerHeight();
        initContainerWidth("middle"); // ???????????????
        setColumnWidthAndLeft(middleColumns, cacheWidth.middleWidth);
        scrollTableHeader();
        handleRowInViewer();
        getMaxRow();
      }
    );

    // ????????????
    const onResize = () => {
      cacheTableWidthAndHeight();
      nextTick(() => {
        initContainerWidth("middle"); // ???????????????
        // setColumnWidthAndLeft(fixedLeftColumns, cacheWidth.leftFixedWidth);
        // setColumnWidthAndLeft(fixedRightColumns, cacheWidth.rightFixedWidth);
        setColumnWidthAndLeft(middleColumns, cacheWidth.middleWidth);
        scrollTableHeader();
      });
    };

    // ??????????????????
    const isScrollY = computed(() => {
      return cacheHeight.tableBodyHeight < cacheHeight.tableBodyScrollHeight;
    });

    const isShowHeaderScrollbar = computed(() => {
      if (!isScrollY.value || wkUtils.isMobile) {
        return false;
      }
      return true;
    });

    onMounted(() => {
      if (tableBodyRef.value) {
        tableBodyRef.value.addEventListener("scroll", onTableBodyScroll);
      }
      window.addEventListener("resize", onResize);
      init();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });

    return {
      tableRef,
      cacheWidth,
      cacheHeight,
      isTouchLeft,
      visibleRows,
      isTouchRight,
      canRowSelect,
      tableBodyRef,
      startRowIndex,
      middleColumns,
      tableHeaderRef,
      fixedLeftColumns,
      tableBodyLeftRef,
      tableBodyRightRef,
      fixedRightColumns,
      tableBodySelectRef,
      isShowHeaderScrollbar,
      tableBodyContainerRef,
      tableBodyMiddleContainerRef,
      tableHeaderMiddleContainerRef,
    };
  },
});

function useTool() {
  const cacheStyle = new WeakMap();
  // ??????dom????????????????????????
  const getDomWH = (dom: Element, type = "w"): number => {
    if (cacheStyle.get(dom) && cacheStyle.get(dom).get(type)) {
      return cacheStyle.get(dom).get(type);
    }
    let num;
    switch (type) {
      case "w":
        num = dom.getBoundingClientRect().width;
        break;
      case "h":
        num = dom.getBoundingClientRect().height;
        break;
      case "cw":
        num = wkUtils.getStyleByDom(dom, "clientWidth", false);
        break;
      case "ch":
        num = wkUtils.getStyleByDom(dom, "clientHeight", false);
        break;
    }

    if (wkUtils.isString(num)) {
      num = Number(num.replace("px", ""));
      if (!cacheStyle.get(dom)) {
        cacheStyle.set(dom, new Map());
      }
      cacheStyle.get(dom).set(type, num);
      return num === NaN ? 0 : num;
    } else if (wkUtils.isNumber(num) && num !== NaN) {
      return num;
    }
    return 0;
  };
  // ??????column????????? ????????????
  const getColumnWidth = (width?: string | number): number => {
    if (width === undefined || width == NaN) {
      return 0;
    }
    if (wkUtils.isString(width) && /(\d+)%$/.test(width)) {
      const matched = width.match(/(\d+)%$/);
      if (matched) {
        return Number(matched[1]);
      }
    } else if (wkUtils.isString(width) && /(\d+)px$/.test(width)) {
      const matched = width.match(/(\d+)px$/);
      if (matched) {
        return Number(matched[1]);
      }
    } else if (wkUtils.isNumber(width)) {
      return width;
    }
    return 0;
  };

  return {
    getDomWH,
    getColumnWidth,
  };
}
</script>

<style lang="less" scoped>
.absolute-c {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: none;
}
.table {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  &-header {
    width: 100%;
    position: relative;
    height: 60px;
    background-color: #fafafa;
    &_viewport {
      overflow: hidden;
    }
    &_viewport,
    &_container {
      height: 100%;
    }
    &_select {
      height: 60px;
      background: #fafafa !important;
    }
    &_right,
    &_left {
      background-color: #fafafa !important;
    }
    &_left {
      .shadow-line {
        right: 0;
      }
    }
    &_right {
      .shadow-line {
        left: 0;
      }
    }
    &_middle {
      height: 100%;
      position: relative;
      &-container {
        height: 100%;
      }
    }
    &_scrollbar {
      display: block;
      width: 6px;
      min-width: 6px;
      max-width: 6px;
      position: sticky;
      right: -17px;
      height: 100%;
      background: #fafafa;
    }
  }
  .table-body {
    position: relative;
    height: calc(100% - 60px);
    background-color: #fff;
    overflow-y: scroll;
  }
  &-fixed {
    &_style {
      box-shadow: 0 0 5px 1px #dddddd;
    }
  }
  &_left,
  &_right,
  &_middle {
    height: 100%;
    position: relative;
    &-container {
      height: 100%;
    }
  }
  &_select-row,
  &_left,
  &_right {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
  }
  &_left {
    left: 0;
    .shadow-line {
      right: 0;
    }
  }
  &_right {
    right: 0;
    .shadow-line {
      left: 0;
    }
  }
  &_select {
    &-row {
      width: 40px;
      left: 0;
    }
    .table_left {
      left: 40px;
    }
  }
  .show-shadow-left {
    box-shadow: 1px 0px 3px 1px #ddd;
  }
  .show-shadow-right {
    box-shadow: -1px 0px 3px 1px #ddd;
  }
}
</style>
