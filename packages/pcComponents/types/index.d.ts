import WkForm from "../components/form/wkForm.vue";
export * from "../components/tableSelf/wkTable.vue";

declare module "@lc/pcComponents" {
  export type WkForm = typeof WkForm;
}
export type WkForm = typeof WkForm;
