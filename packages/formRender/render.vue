<script lang="ts">
import { defineComponent, h, ref, watchEffect, PropType, resolveComponent } from "vue";
import type { WkForm, RuleType } from "@lc/pcComponents";
import { CpnInfo } from "lc/types";
import { useCreateCpn, useNamespace, useFormTools } from "lc/useHooks";

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
      cpns?.forEach((cpn) => {
        const { cpnKey, cpnType, defaultValue, extraInfo } = cpn;
        let value = defaultValue;
        if (cpnType === "CHECKBOX" || (cpnType === "SELECT" && extraInfo?.multiSelect)) {
          value = [];
        }
        formModel.value[cpnKey] = (model && model[cpnKey]) || value;
        formRules.value[cpnKey] = getValidator(cpn, cpn.validators);
      });
    };
    watchEffect(() => {
      initData(props.cpns || [], props.model || {});
    });

    const getData = () => {
      if (formRef.value) {
        return formRef.value.validate();
      }
      return null;
    };

    const { createCpnFactory, createCpnValue } = useCreateCpn();
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
    expose({
      getData,
    });
    return () => {
      return h(
        "div",
        {
          class: ns,
        },
        createForm(props.cpns?.map((cpn) => createFormItem(cpn)))
      );
    };
  },
});
</script>
