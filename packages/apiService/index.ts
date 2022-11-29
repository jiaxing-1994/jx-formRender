export * from "./formEngineApi/formService";
export * from "./formEngineApi/formDataService";
import Http from "./http";
import * as formService from "./formEngineApi/formService";
import * as formDataService from "./formEngineApi/formDataService";

function LcApiService(
  headers: Record<string, string> = {}
): typeof formDataService & typeof formService {
  Http.setRequestInterceptors((config) => {
    Object.assign(config.headers, headers);
    return config;
  });
}
LcApiService.prototype = {
  ...formService,
  ...formDataService,
};

export default LcApiService;
