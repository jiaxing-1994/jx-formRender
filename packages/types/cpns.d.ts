import type { ExtraInfoType } from "./cpns/cpn";

// 原始数据结构
declare interface ControlDetailType {
  cpnType: string;
  cpnKey: string;
  lable?: string;
  label?: string;
  type?: string;
  actions?: string;
  customClass?: null;
  searchMarks?: null | string[];
  showLabel?: null | boolean;
  placeholder?: string;
  defaultValue?: Nullable<string | number | boolean | Array<string | number>>;
  extraInfo?: Nullable<ExtraInfoType>;
  validators?: RuleType[];
  operationalTypes?: OperationalTypeEnum[];
  dynamicOpts?: Nullable<string>;
  additionalInfo?: string;
  belongCpn?: string | null;
  layout?: {
    gridX: number;
    gridY: number;
  };
}

// 表单数据结构
declare interface ControlFormType extends ControlDetailType {
  [key: string]: any;
  required?: boolean;
  defaultValue?: any;
  extraValues?: string[];
  extraInfo?: Nullable<ExtraInfoType>;
  rules?: RuleType[];
  gridX?: number;
  gridY?: number;
  sequence?: number;
  width?: number;
  labelWidth?: number;
  slotName?: string;
  actions?: string;
}
