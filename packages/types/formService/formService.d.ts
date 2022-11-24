import { FormBaseInfo, CpnInfo, Configuration } from "../form";

// 表单参数
export interface FormQuery {
  form: Partial<FormBaseInfo>;
  cpns: Partial<CpnInfo>;
  configuration: Partial<Configuration>;
}

export interface ExportResult {
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
