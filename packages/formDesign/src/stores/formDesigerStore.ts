import { defineStore } from "pinia";
import { CpnInfo, FormBaseInfo } from "lc/types";

interface State {
  formInfo: Partial<FormBaseInfo>;
  cpnList: CpnInfo[];
  mode: string;
}

const state = (): State => {
  return {
    formInfo: {}, // 表单整体信息
    cpnList: [], // 表单组件信息
    mode: "", //模式
  };
};
const getters = {};
const actions = {};

const useFormDesignerStore = defineStore("formDesignerStore", {
  state,
  getters,
  actions,
});
export default useFormDesignerStore;
