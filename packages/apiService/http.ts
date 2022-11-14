import WkHttp from "@wk-libs/http";

export const ApiServeType = {
  formEngine: window.location.host + "/form-engine",
};
const Http = new WkHttp({
  baseUrl: ApiServeType.formEngine,
  timeout: 40000,
});

export default Http;
