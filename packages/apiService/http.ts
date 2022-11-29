import WkHttp, { AxiosResponse } from "@wk-libs/http";

export const ApiServeType: {
  formEngine: string;
} = {
  formEngine: `${"http://182.140.209.49:30080" || window.location.origin}/form-engine`,
};
const Http = new WkHttp({
  baseUrl: ApiServeType.formEngine,
  timeout: 40000,
});

// 响应拦截
Http.setResponseInterceptors(
  (config: AxiosResponse) => {
    if (config.status === 200) {
      return config.data;
    }
    return config;
  },
  (error: any) => {
    console.log(error);
  }
);
export default Http;
