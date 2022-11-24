import { h, resolveComponent } from "vue";
import { CpnInfo } from "../types";

const TYPE_TO_NAME: Record<string, string> = {
  TEXT: "WkInput",
};
export function useCreateCpn() {
  const createCpnFactory = (cpn: CpnInfo) => {
    const { cpnType } = cpn;
    const name = TYPE_TO_NAME[cpnType];
    return h(resolveComponent(name));
  };
  return {
    createCpnFactory,
  };
}
