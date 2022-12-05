import { h, resolveComponent } from "vue";
import { DEFAULT_TYPE_TO_CPN, STRING_VALUE_TO_DISPLAY } from "@lc/constants";
import { isArray, isBoolean, isObject } from "@wk-libs/utils";
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

  // 纯展示控件值
  const createCpnValue = (cpn: CpnInfo, props: Record<string, any> = {}, value: any) => {
    const { cpnType } = cpn;
    if (STRING_VALUE_TO_DISPLAY.includes(cpnType)) {
      return switchValueToDisplay(value, cpnType);
    }
    return h(resolveComponent(DEFAULT_TYPE_TO_CPN[cpnType]), {
      ...handleProps(cpn, props),
    });
  };
  const switchValueToDisplay = (value: any, cpnType: string) => {
    if (isArray(value)) {
      return value.join(",");
    }
    if (isBoolean(value)) {
      return value ? "是" : "否";
    }
    if (isObject(value)) {
      switch (cpnType) {
        case "ADMINISTRATION_REGION":
          return value.fullName;
        case "LOCATION":
          return value.address;
      }
    }
    return value || "--";
  };
  return {
    createCpnFactory,
    createCpnValue,
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
  const getDateProps = (cpn: CpnInfo) => {
    const { cpnType } = cpn;
    return {
      valueFormat: cpnType === "DATE" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss",
      showTime: cpnType === "DATETIME",
    };
  };
  const getTimeProps = () => {
    return {
      valueFormat: "HH:mm:ss",
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
      case "DATE":
      case "DATETIME":
        Object.assign(props, getDateProps(cpn));
        break;
      case "TIME":
        Object.assign(props, getTimeProps());
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
