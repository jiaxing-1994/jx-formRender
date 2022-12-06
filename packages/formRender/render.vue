<script lang="ts">
import { defineComponent, h, ref, watchEffect, PropType, resolveComponent } from "vue";
import type { WkForm, RuleType } from "@lc/pcComponents";
import { useCreateCpn, useNamespace, useFormTools } from "@lc/useHooks";
import { LAYOUT_CPNS } from "@lc/constants";
import { CpnInfo } from "lc/types";

export default defineComponent({
  props: {
    cpns: Array as PropType<CpnInfo[]>,
    model: Object as PropType<Record<string, any>>,
    isEdit: Boolean as PropType<boolean>,
  },
  setup(props, { expose }) {
    const formRef = ref<InstanceType<WkForm>>();
    const formModel = ref<Record<string, any>>({}); // 表单数据
    const formRules = ref<Record<string, RuleType[]>>({}); // 表单规则

    const { ns } = useNamespace("form-render", false);

    const { getValidator } = useFormTools();
    // 初始化数据
    const initData = (cpns: CpnInfo[], model: Record<string, any>) => {
      // 递归处理布局组件，将容器中的组件值也给配置好校验器和初始值。
      const handleContainer = (cpn: CpnInfo) => {
        if (cpn.extraInfo?.layoutWithCpns) {
          const { layoutWithCpns } = cpn.extraInfo;
          for (let rowIndex = 0; rowIndex < layoutWithCpns.length; rowIndex += 1) {
            const rowWithCpns = layoutWithCpns[rowIndex] || [];
            for (let colIndex = 0; colIndex < rowWithCpns.length; colIndex += 1) {
              const colWithCpns = rowWithCpns[colIndex] || [];
              if (colWithCpns) {
                initData(colWithCpns, model);
              }
            }
          }
        }
      };
      const handleTab = (cpn: CpnInfo) => {
        if (cpn.extraInfo?.tabs) {
          const { tabs } = cpn.extraInfo;
          for (let i = 0; i < tabs.length; i += 1) {
            initData(tabs[i].layoutWithCpns || [], model);
          }
        }
      };
      cpns?.forEach((cpn) => {
        const { cpnKey, cpnType, defaultValue, extraInfo } = cpn;
        let value = defaultValue;
        if (cpnType === "CHECKBOX" || (cpnType === "SELECT" && extraInfo?.multiSelect)) {
          value = [];
        }
        const isLayoutCpn = LAYOUT_CPNS.find((item) => item.cpnType === cpnType);
        if (isLayoutCpn) {
          switch (cpnType) {
            case "CONTAINER":
              handleContainer(cpn);
              break;
            case "TAB":
              handleTab(cpn);
              break;
          }
        } else {
          formModel.value[cpnKey] = (model && model[cpnKey]) || value;
          formRules.value[cpnKey] = getValidator(cpn, cpn.validators);
        }
      });
    };
    watchEffect(() => {
      initData(props.cpns || [], props.model || {});
    });

    // 外部获取表单数据的唯一方法
    const getData = () => {
      if (formRef.value) {
        return formRef.value.validate();
      }
      return null;
    };
    expose({
      getData,
    });

    const { createCpnFactory, createCpnValue } = useCreateCpn();
    // 创建表单
    const createForm = (children: any[] = []) => {
      return h(
        resolveComponent("wkForm"),
        {
          ref: formRef,
          layout: "horizontal",
          model: formModel.value,
          rules: props.isEdit ? formRules.value : [],
        },
        () => children
      );
    };
    // 创建表单子项
    const createFormItem = (cpn: CpnInfo) => {
      return h(
        resolveComponent("wkFormItem"),
        {
          name: cpn.cpnKey,
          label: !cpn.hideLabel ? cpn.lable : undefined,
          class: [`w_${cpn.layout.gridX}`],
        },
        () =>
          props.isEdit
            ? createCpnFactory(cpn, {
                value: formModel.value[cpn.cpnKey],
                "onUpdate:value": (value: any) => {
                  return (formModel.value[cpn.cpnKey] = value);
                },
                isEdit: props.isEdit,
              })
            : createCpnValue(
                cpn,
                {
                  value: formModel.value[cpn.cpnKey],
                  isEdit: props.isEdit,
                },
                formModel.value[cpn.cpnKey]
              )
      );
    };
    // 创建行(容器组件)
    const createRow = (children: any[]) => {
      return h(resolveComponent("wkRow"), () => children);
    };
    // 创建列(容器组件)
    const createCol = (children: any[], props: Record<string, any>) => {
      return h(resolveComponent("wkCol"), props, () => createForm(children));
    };
    // 创建布局组件
    const createContainer = (cpn: CpnInfo) => {
      const childrens: any[] = [];
      if (cpn.extraInfo?.layoutWithCpns) {
        const { layoutWithCpns, cols, colsWidth } = cpn.extraInfo;
        for (let rowIndex = 0; rowIndex < layoutWithCpns.length; rowIndex += 1) {
          const rowWithCpns = layoutWithCpns[rowIndex] || [];
          const colsChildren: any[] = [];
          for (let colIndex = 0; colIndex < (cols || rowWithCpns.length); colIndex += 1) {
            const colWithCpns = rowWithCpns[colIndex] || [];
            if (colWithCpns) {
              colsChildren.push(
                createCol(createRender(colWithCpns), {
                  flex: colsWidth ? colsWidth[colIndex] : 1,
                })
              );
            } else {
              colsChildren.push(createCol([], { flex: 1 }));
            }
          }
          childrens.push(createRow(colsChildren));
        }
      }
      return childrens;
    };
    // 创建tab
    const createTabs = (cpn: CpnInfo) => {
      const childrens: any[] = [];
      if (cpn.extraInfo?.tabs) {
        cpn.extraInfo.tabs.forEach((tabItem, index) => {
          childrens.push(
            h(
              resolveComponent("wkTabPane"),
              {
                key: index,
                tab: tabItem.name,
              },
              () => createRender(tabItem.layoutWithCpns || [])
            )
          );
        });
      }
      return h(resolveComponent("wkTabs"), () => childrens);
    };
    // 表单渲染器入口
    const createRender = (cpns: CpnInfo[]) => {
      const childrens: any[] = [];
      cpns.forEach((cpn) => {
        const { cpnType } = cpn;
        const isLayoutCpn = LAYOUT_CPNS.find((item) => item.cpnType === cpnType);
        if (isLayoutCpn) {
          // 容器组件
          switch (cpnType) {
            case "CONTAINER":
              childrens.push(createContainer(cpn));
              break;
            case "TAB":
              childrens.push(createTabs(cpn));
              break;
            default:
              break;
          }
        } else {
          // 一般组件
          childrens.push(createFormItem(cpn));
        }
      });
      return childrens;
    };
    return () => {
      return h(
        "div",
        {
          class: ns,
        },
        createForm(createRender(props.cpns || []))
      );
    };
  },
});
</script>

<style lang="less">
.ant-col {
  width: 0;
  flex: 1;
}
</style>
