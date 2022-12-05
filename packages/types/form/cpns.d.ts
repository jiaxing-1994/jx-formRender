export interface RuleType {
  [key: string]: any;
  validatorType: string; //
  message?: string; // 错误提示信息
  regexp?: RegExp; // 正则
  required?: boolean; // 是否必填
  min?: number; // 最小值
  max?: number; // 最大值
  validator?: (rule: RuleType, value: any, callback: (message?: string) => void) => void; // 同步校验器
  asyncValidator?: (
    rule: RuleType,
    value: any,
    callback: (message?: string) => void
  ) => Promise<undefined>; // 异步校验器
}

export enum OperationalTypeEnum {
  readonly = "readonly",
  forbidden = "forbidden",
  hide = "hide",
  list_hide = "list_hide",
  app_list_hide = "app_list_hide",
  add_page_hide = "add_page_hide",
  detail_page_hide = "detail_page_hide",
}

export interface CpnInfo {
  cpnType: string;
  cpnKey: string;
  lable: string;
  label?: string;
  type: string;
  actions: null;
  customClass: null;
  searchMarks: string[];
  hideLabel: null | boolean;
  placeholder?: string;
  defaultValue?: string | number | Array<string | number> | boolean;
  extraInfo?: ExtraInfo | null;
  validators?: RuleType[];
  operationalTypes?: OperationalTypeEnum[];
  dynamicOpts?: string | null;
  additionalInfo?: string;
  belongCpn?: string | null;
  layout: {
    gridX: number;
    gridY: number;
  };
}

export interface ExtraInfo {
  options?: Option[];
  searchable?: boolean;
  sequence?: number;
  multiSelect?: boolean;
  allowedRepeat?: boolean;
  subCpns?: CpnInfo[]; // 子表格包含的控件
  rows?: number; // 容器组件行数
  cols?: number; // 容器组件列数
  layoutWithCpns?: CpnInfo[];
  layoutWithCpnKeys?: string[];
  colsWidth?: number[];
  cpns?: CpnRowCol[]; // 容器组件包含的控件
  tabs?: TabType[];
}

export interface Option {
  lable?: string;
  label?: string;
  key: string | number;
  value: any;
}

export interface CpnRowCol {
  key: string;
  row: number;
  col: number;
  sequence?: number;
}

export interface TabType {
  name: string;
  layoutWithCpns?: CpnInfo[];
  layoutWithCpnKeys?: string[];
}

export interface ExtraInfoType {
  [key: string]: any;
  options?: OptionType[];
  searchable?: boolean;
  sequence?: number;
  multiSelect?: boolean;
  allowedRepeat?: boolean;
  layoutWithCpns?: ControlFormType[][][] | null;
  layoutWithCpnKeys?: string[][][] | null;
  subCpns?: CpnInfo[]; // 子表格包含的控件
  rows?: number; // 容器组件行数
  cols?: number; // 容器组件列数
  colsWidth?: number[];
  cpns?: CpnRowColType[]; // 容器组件包含的控件
  tabs?: TabType[];
  location?: LocationEnum;
}

export interface SearchMarkDetailType {
  name: string;
  symbol: string;
  value: string;
}
