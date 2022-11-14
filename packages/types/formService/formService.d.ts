import { FormBaseInfo } from "../form/formInfo";
import { CpnInfo } from "../form/cpns";
import { Configuration } from "../form/configuration";

// 表单参数
declare interface FormQuery {
  form: Partial<FormBaseInfo>;
  cpns: Partial<CpnInfo>;
  configuration: Partial<Configuration>;
}

declare interface ExportResult {
  failNum: number;
  fileUrl: string;
  successNum: number;
  totalNum: number;
}

// 表单列表查询
export interface FormListQuery extends PageQuery {
  tenantId: string;
  name?: string;
}
