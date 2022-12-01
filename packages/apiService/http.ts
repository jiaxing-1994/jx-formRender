import WkHttp from "@wk-libs/http";

export const ApiServeType: {
  formEngine: string;
} = {
  formEngine: `${"http://182.140.209.49:30080" || window.location.origin}/form-engine`,
};
const Http = new WkHttp({
  baseUrl: ApiServeType.formEngine,
  timeout: 40000,
});

export default Http;
