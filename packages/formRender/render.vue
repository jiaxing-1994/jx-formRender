<script lang="ts">
import { defineComponent, h, ref, watch, defineExpose, PropType, resolveComponent } from "vue";
import type { WkForm, RuleType } from "@lc/pcComponents";
import { CpnInfo } from "lc/types";
import { useCreateCpn } from "lc/useHooks";

export default defineComponent({
  props: {
    cpns: Array as PropType<CpnInfo[]>,
    model: Object as PropType<Record<string, any>>,
  },
  setup(props, { expose }) {
    const formRef = ref<InstanceType<WkForm>>();
    const formModel = ref<Record<string, any>>({}); // 表单数据
    const formRules = ref<Record<string, RuleType[]>>({}); // 表单规则

    // 初始化数据
    const initData = () => {
      props.cpns?.forEach((cpn) => {
        const { cpnKey, cpnType, defaultValue, extraInfo } = cpn;
        let value = defaultValue;
        if (cpnType === "CHECKBOX" || (cpnType === "SELECT" && extraInfo?.multiSelect)) {
          value = [];
        }
        formModel.value[cpnKey] = (props.model && props.model[cpnKey]) || value;
        formRules.value[cpnKey] = cpn.validators;
      });
    };
    watch(
      () => props.cpns,
      () => {
        initData();
      },
      {
        immediate: true,
      }
    );

    const getData = () => {
      if (formRef.value) {
        console.log(formRef.value);
        return formRef.value.validate();
      }
      return {};
    };
    expose({
      getData,
    });

    const { createCpnFactory } = useCreateCpn();
    const createForm = (children: any[] = []) => {
      return h(
        resolveComponent("wkForm"),
        {
          ref: formRef,
          layout: "horizontal",
          model: formModel.value,
          rules: formRules.value,
        },
        children
      );
    };
    const createFormItem = (cpn: CpnInfo) => {
      return h(
        resolveComponent("wkFormItem"),
        {
          name: cpn.cpnKey,
          label: cpn.lable,
          class: [`w_${cpn.layout.gridX}`],
        },
        [
          createCpnFactory(cpn, {
            value: formModel.value[cpn.cpnKey],
            "onUpdate:value": (value: any) => {
              return (formModel.value[cpn.cpnKey] = value);
            },
          }),
        ]
      );
    };
    return () => {
      return createForm(props.cpns?.map((cpn) => createFormItem(cpn)));
    };
  },
});
</script>

<style scoped></style>
