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
  layoutWithCpns?: CpnInfo[][][];
  layoutWithCpnKeys?: string[][][];
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

export enum ActionTriggerEnum {
  change = "change",
  click = "click",
  choose = "choose",
}
export enum ActionEnum {
  code = "code",
  hideOrShow = "hideOrShow",
  modal = "modal",
  jumpPage = "jumpPage",
}

export interface Action<K extends keyof ActionContent> {
  type: ActionEnum; // 动作类型 隐藏/显示、执行代码、弹窗、跳转页面
  trigger: ActionTriggerEnum; // 类型为执行代码时候，触发方式
  action: ActionContent[K];
}

export interface ActionContent {
  code: string; // 执行代码
  hideOrShow: ActionHide; // 隐藏/显示控件
  modal: ActionModal; // 弹窗控件
  jumpPage: ActionJumpPage; // 跳转页面
}

// 隐藏/显示
export interface ActionHide {
  resultType: string; // 隐藏/显示控件
  cpnsType: string; // 多个控件的满足关系，且/或
  cpns: ActionCpn[]; // 控件数组
}

export interface ActionCpn {
  cpnKey: string; // 类型为隐藏时候，绑定的控件
  valueArr: (string | number)[]; // 类型为隐藏时候，绑定控件的值，如果值相等则隐藏
}

// 弹窗
export interface ActionModal {
  title: string; // 弹窗标题
  content: CpnInfo[]; // 弹窗内容
  onKey?: string; // 点击确认执行的代码，支持异步
}

// 跳转页面
export interface ActionJumpPage {
  url: string; // 跳转地址，http开头则为跳转外部链接，否则为跳转内部页面
  queryCode: string; // 通过代码获取参数，实现依靠其他控件的值动态变化的参数
}

export interface LabelValue {
  label: string;
  value: string | number;
}

export interface KeyValue {
  key: string | number;
  value: string;
}
