import { App } from "vue";

export function useGlobleComponents() {
  const existMap = new Set();
  const fileSuffixReg = /.(ts|vue)$/;
  const setupGlobleComponents = (app: App<Element>, componentsFile: Record<string, any>) => {
    for (const key in componentsFile) {
      if (componentsFile[key] && componentsFile[key].default && /\/([\w]+).vue$/.test(key)) {
        const name = RegExp.$1;
        const suffix = key.match(fileSuffixReg);
        if (suffix && suffix[1] === "ts") {
          if (componentsFile[key].default.render) {
            // 说明通过ts的render函数进行渲染
          }
          if (!existMap.has(name)) {
            app.component(name, componentsFile[key].default);
            existMap.add(name);
          }
        } else {
          app.component(name, componentsFile[key].default);
          existMap.add(name);
        }
      }
    }
  };
  const setupGlobleDirective = (app: App<Element>, globalDirective: Record<string, any>) => {
    for (const key in globalDirective) {
      app.use(globalDirective[key].default);
    }
  };
  return {
    setupGlobleComponents,
    setupGlobleDirective,
  };
}
