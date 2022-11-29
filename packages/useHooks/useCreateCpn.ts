import { h, resolveComponent } from "vue";
import { DEFAULT_TYPE_TO_CPN } from "@lc/constants";
import { CpnInfo } from "../types";

export function useCreateCpn() {
  // 组件工厂函数，能够创建最基础的组件及其属性，对于特殊属性配置需要外层传属性进行
  const createCpnFactory = (
    cpn: CpnInfo,
    props?: Record<string, any>,
    keyMap: Record<string, string> = DEFAULT_TYPE_TO_CPN // 映射关系
  ) => {
    const { cpnType } = cpn;
    if (keyMap[cpnType]) {
      return h(resolveComponent(keyMap[cpnType]), {
        ...props,
        cpn,
      });
    }
    return null;
  };
  return {
    createCpnFactory,
  };
}
