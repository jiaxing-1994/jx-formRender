import { AxiosResponse } from "@wk-libs/http";
export * from "./formEngineApi/formService";
export * from "./formEngineApi/formDataService";
import WkHttp from "@wk-libs/http";

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
    if (response.status === 200) {
      if (response.data.success) {
        return response.data.data;
      } else if (response.data.success === false) {
        return Promise.reject(response.data.message);
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

export { ApiServeType, setGlobalHeaders };
export default Http;
