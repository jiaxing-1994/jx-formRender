import FormRender from "../render.vue";

declare module "@lc/formRender" {
  export type FormRender = typeof FormRender;
}

// type FormRender = typeof FormRender;
// export { FormRender };
