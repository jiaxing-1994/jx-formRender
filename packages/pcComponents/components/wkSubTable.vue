<script lang="ts">
import { ref, h, computed, defineComponent, PropType } from "vue";
import { isArray } from "@wk-libs/utils";
import { useCreateCpn } from "@lc/useHooks";
import WkTable from "./tableSelf/wkTable.vue";
import WkButton from "./wkButton.vue";
import { CpnInfo } from "lc/types";

export default defineComponent({
  props: {
    value: Array as PropType<Record<string, any>[]>,
    subCpns: Array as PropType<CpnInfo[]>,
    isEdit: Boolean as PropType<boolean>,
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const data = ref<Record<string, any>>([]);
    const columns = computed(() => {
      if (isArray(props.subCpns)) {
        return props.subCpns.map((cpn) => ({
          title: cpn.label,
          dataIndex: cpn.cpnKey,
        }));
      }
      return [];
    });

    // 新增一行数据
    const onAdd = () => {
      const oneData: Record<string, any> = {};
      columns.value.forEach((column) => {
        oneData[column.dataIndex] = null;
      });
      data.value = data.value.concat([oneData]);
      dataChange();
    };

    const dataChange = () => {
      emit("update:value", data.value);
    };

    const { createCpnFactory, switchValueToDisplay } = useCreateCpn();
    const createEditBar = () => {
      return h("div", [
        h(
          WkButton,
          {
            onClick: onAdd,
          },
          () => "新增"
        ),
      ]);
    };
    const createTable = () => {
      return h(
        WkTable,
        {
          columns: columns.value,
          data: data.value,
        },
        {
          bodyCell: ({ text, column, index }: any) => {
            const { dataIndex } = column;
            const cpn = props.subCpns?.find((cpn) => cpn.cpnKey === dataIndex);
            if (cpn) {
              const { cpnType } = cpn;
              if (!props.isEdit) {
                return h("span", switchValueToDisplay(text, cpnType));
              } else {
                return h(
                  "div",
                  {
                    class: "w_24",
                  },
                  createCpnFactory(cpn, {
                    value: text,
                    "onUpdate:value": (value: any) => {
                      dataChange();
                      return (data.value[index][dataIndex] = value);
                    },
                    isEdit: true,
                  })
                );
              }
            }
            return null;
          },
        }
      );
    };
    return () => {
      return h("div", [props.isEdit && createEditBar(), createTable()]);
    };
  },
});
</script>
