import { Plugin } from "vue";
import type { RuleType } from "@wk-libs/validator";
import WkForm from "../components/form/wkForm.vue";
export * from "../components/tableSelf/wkTable.vue";

declare module "@lc/pcComponents" {
  type WkForm = typeof WkForm;
  const installPcComponents: Plugin;
  export default installPcComponents;
}
type WkForm = typeof WkForm;
export { WkForm, RuleType };

declare const installPcComponents: Plugin;
export default installPcComponents;
