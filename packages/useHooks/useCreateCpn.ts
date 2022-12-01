import { h, resolveComponent } from "vue";
import { DEFAULT_TYPE_TO_CPN } from "@lc/constants";
import { CpnInfo } from "../types";

export function useCreateCpn() {
  // 组件工厂函数，能够创建最基础的组件及其属性，对于特殊属性配置需要handleProps函数中处理
  const { handleProps } = useCpnProps();
  const createCpnFactory = (
    cpn: CpnInfo,
    props: Record<string, any> = {},
    keyMap: Record<string, string> = DEFAULT_TYPE_TO_CPN // 映射关系
  ) => {
    const { cpnType } = cpn;
    if (keyMap[cpnType]) {
      return h(resolveComponent(keyMap[cpnType]), handleProps(cpn, props));
    }
    return null;
  };
  return {
    createCpnFactory,
  };
}

const useCpnProps = () => {
  const getCommonProps = (cpn: CpnInfo, props: Record<string, any> = {}) => {
    return {
      ...props,
      cpn,
    };
  };
  const getCheckboxProps = (cpn: CpnInfo) => {
    return {
      options: cpn.extraInfo?.options || [],
    };
  };
  const getSelectProps = (cpn: CpnInfo) => {
    return {
      options: cpn.extraInfo?.options || [],
      mode: cpn.extraInfo?.multiSelect || cpn.cpnType === "CHECKBOX" ? "multiple" : "",
      fieldNames: {
        label: "value",
        value: "key",
      },
    };
  };
  const handleProps = (cpn: CpnInfo, originProps: Record<string, any>) => {
    const { cpnType } = cpn;
    const props: Record<string, any> = {
      ...getCommonProps(cpn, originProps),
    };
    switch (cpnType) {
      case "CHECKBOX":
        Object.assign(props, getCheckboxProps(cpn));
        break;
      case "RADIO":
        Object.assign(props, getCheckboxProps(cpn));
        break;
      case "SELECT":
        Object.assign(props, getSelectProps(cpn));
        break;
      default:
        break;
    }
    return props;
  };
  return {
    handleProps,
  };
};
