import { FormBaseInfo } from "./formInfo";
import { Configuration } from "./configuration";
import { CpnInfo } from "./cpns";

export * from "./cpns.d";
export * from "./formInfo.d";
export * from "./configuration.d";
export * from "./cpns/region.d";
export * from "./cpns/pickFile.d";

export interface Form {
  form: FormBaseInfo;
  configuration: Configuration;
  cpns: CpnInfo[];
}
