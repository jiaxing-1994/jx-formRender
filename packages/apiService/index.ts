import { AxiosResponse } from "@wk-libs/http";
export * from "./formEngineApi/formService";
export * from "./formEngineApi/formDataService";
import Http from "./http";

const globalHeaders: Record<string, string> = {};
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

export const setGlobalHeaders = (headers: Record<string, string>) => {
  Object.assign(globalHeaders, headers);
};
