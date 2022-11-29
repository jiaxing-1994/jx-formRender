<script lang="ts">
import {
  defineComponent,
  ref,
  h,
  resolveComponent,
  watch,
  useSlots,
  unref,
  onMounted,
  PropType,
} from "vue";
import type { WkForm } from "@lc/pcComponents";
import { useCreateCpn, useFormTools } from "@lc/useHooks";
import { CpnInfo } from "lc/types/index.d";
import LcSearchLabel from "./LcSearchLabel.vue";

const SEARCH_TYPE_TO_CPN = {
  TEXT: "wkInput",
  TEXTAREA: "wkInput",
  SELECT: "wkSelect",
  CHECKBOX: "wkSelect",
  RADIO: "wkSelect",
  NUMBER_TEXT: "wkInputNumber",
  CURRENCY: "wkInputNumber",
  MOBILE: "wkInputNumber",
};
export default defineComponent({
  name: "LcSearchCondition",
  props: {
    value: Object as PropType<Record<string, any>>,
    cpns: Array as PropType<CpnInfo[]>,
  },
  emits: {
    search: (model: Record<string, any>) => model,
  },
  setup(props, { emit }) {
    const model = ref<Record<string, any>>(props.value || {});
    const searchTypes = ref<Record<string, string>>({});

    // 初始化数据
    const initData = () => {
      props.cpns?.forEach((cpn) => {
        if (model.value[cpn.cpnKey] === undefined) {
          if (
            cpn.cpnType === "CHECKBOX" ||
            (cpn.cpnType === "SELECT" && cpn.extraInfo?.multiSelect)
          ) {
            model.value[cpn.cpnKey] = [];
          } else {
            model.value[cpn.cpnKey] = null;
          }
        }
        searchTypes.value[cpn.cpnKey] = cpn.searchMarks[0];
      });
    };

    const formRef = ref<InstanceType<WkForm>>();
    const { getSearchConditionData } = useFormTools();
    // 点击搜索
    const onSearch = () => {
      if (formRef.value) {
        const res = getSearchConditionData(unref(formRef.value.validate()), searchTypes.value);
        emit("search", res);
      }
    };
    // 点击清除搜索
    const onClearSearch = () => {
      for (const key in model.value) {
        model.value[key] = null;
      }
      onSearch();
    };

    watch(
      () => props.cpns,
      () => {
        initData();
        onSearch();
      },
      {
        immediate: true,
      }
    );

    // 创建组件
    const { createCpnFactory } = useCreateCpn();
    const slots = useSlots();
    const createForm = (children: any[]) => {
      let childrens = children;
      if (slots.searchBtn) {
        childrens = children.concat(
          slots.searchBtn({
            onSearch: onSearch,
            onClearSearch: onClearSearch,
          })
        );
      }
      return h(
        resolveComponent("wkForm"),
        {
          ref: formRef,
          layout: "horizontal",
          model: model,
        },
        childrens
      );
    };
    const createFormItem = (cpn: CpnInfo) => {
      return h(
        resolveComponent("wkFormItem"),
        {
          style: {
            minWidth: "300px",
          },
        },
        {
          label: () =>
            h(LcSearchLabel, {
              cpn,
              onChange: (value: string) => {
                searchTypes.value[cpn.cpnKey] = value;
              },
            }),
          default: () =>
            createCpnFactory(
              cpn,
              {
                value: model.value[cpn.cpnKey],
                "onUpdate:value": (value: any) => (model.value[cpn.cpnKey] = value),
              },
              SEARCH_TYPE_TO_CPN
            ),
        }
      );
    };
    return () => {
      if (props.cpns) {
        return createForm(props.cpns.map((cpn) => createFormItem(cpn)));
      }
      return null;
    };
  },
});
</script>

<style lang="less" scoped></style>
