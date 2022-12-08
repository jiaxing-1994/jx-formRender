import { AxiosResponse } from "@wk-libs/http";
export * from "./formEngineApi/formService";
export * from "./formEngineApi/formDataService";
export * from "./formEngineApi/formExtraApiService";
import WkHttp, { AxiosRequestConfig } from "@wk-libs/http";

const globalHeaders: Record<string, string> = {};

const ApiServeType: {
  formEngine: string;
} = {
  formEngine: `${"http://182.148.114.194:30080" || window.location.origin}/form-engine`,
};

const Http = new WkHttp({
  baseUrl: ApiServeType.formEngine,
  timeout: 40000,
});

Http.setRequestInterceptors((config) => {
  if (config.headers) {
    Object.assign(config.headers, globalHeaders);
  }
  return config;
});
Http.setResponseInterceptors(
  (response: AxiosResponse) => {
    console.log(response);
    if (response.status === 200) {
      if (response.config.baseURL && response.config.baseURL.indexOf("/form-engine") > -1) {
        // 表单接口
        if (response.data.success) {
          return response.data.data;
        } else {
          return Promise.reject(response.data.message);
        }
      }
      return response.data;
    }
    return false;
  },
  (error: any) => {
    console.log(error);
    return Promise.reject(error);
  }
);

const setGlobalHeaders = (headers: Record<string, string>) => {
  Object.assign(globalHeaders, headers);
};

export type { AxiosRequestConfig };
export { ApiServeType, setGlobalHeaders };
export default Http;
