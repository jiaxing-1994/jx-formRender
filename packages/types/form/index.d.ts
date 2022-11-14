import { FormBaseInfo } from "./formInfo";
import { Configuration } from "./configuration";
import { CpnInfo } from "./cpns";

export * from "./cpns";
export * from "./formInfo";
export * from "./configuration";
export * from "./cpns/region";

export interface Form {
  form: FormBaseInfo;
  configuration: Configuration;
  cpns: CpnInfo[];
}
