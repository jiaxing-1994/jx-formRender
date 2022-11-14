export interface CpnInfo {
  cpnType: string;
  cpnKey: string;
  lable: string;
  label?: string;
  type: string;
  actions: null;
  customClass: null;
  searchMarks: string[];
  showLabel: null | boolean;
  placeholder?: string;
  defaultValue?: string | number | Array<string | number> | null;
  extraInfo?: ExtraInfo | null;
  validators: RuleType[];
  operationalTypes?: OperationalTypeEnum[];
  dynamicOpts?: Nullable<string>;
  additionalInfo?: string;
  belongCpn?: string | null;
  layout?: {
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
}
