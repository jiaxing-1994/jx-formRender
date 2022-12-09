import WkHttp, { AxiosRequestConfig, AxiosResponse, AxiosError } from "@wk-libs/http";
export * from "./formEngineApi/formService";
export * from "./formEngineApi/formDataService";
export * from "./formEngineApi/formExtraApiService";

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

Http.setRequestInterceptors((config: AxiosRequestConfig) => {
  if (config.headers) {
    Object.assign(config.headers, globalHeaders);
  }
  return config;
});
Http.setResponseInterceptors(
  (response: AxiosResponse) => {
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
  (error: AxiosError) => {
    if (error.response) {
      const { status, data, config } = error.response;
      if (config.baseURL && config.baseURL.indexOf("/form-engine") > -1) {
        // 表单接口
        if ((data as ApiResult<null>).message) {
          alert((data as ApiResult<null>).message);
          return Promise.reject(error);
        }
      }
      switch (status) {
        case 404:
          alert("接口不存在");
          break;
        // @ts-ignore
        case /^5\d+/.test(status):
          alert("服务器错误");
          break;
      }
    }
    return Promise.reject(error);
  }
);

const setGlobalHeaders = (headers: Record<string, string>) => {
  Object.assign(globalHeaders, headers);
};

export type { AxiosRequestConfig };
export { ApiServeType, setGlobalHeaders };
export default Http;
