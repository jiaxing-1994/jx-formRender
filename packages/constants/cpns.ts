import { CpnInfo } from "../types/index.d";

// 不能做搜索的控件
export const canNotSearchCpns = [
  "FILE",
  "WORD",
  "TABLE",
  "CONTAINER",
  "TAB",
  "SEPARATOR",
  "RICHTEXT",
  "BUTTON",
  "LOCATION",
  "SUBPAGE",
  "LOCATION",
  "BUTTON",
];

// 列表中不显示
export const canNotShowCpnsInList = [
  "FILE",
  "WORD",
  "TABLE",
  "CONTAINER",
  "TAB",
  "SEPARATOR",
  "BUTTON",
  "LOCATION",
];

// 不能在子表格中应用的控件
export const canNotUseInSubTable = ["TEXTAREA", "RICHTEXT", "LOCATION"];

// 不能在弹窗中应用的控件
export const canNotUseInModal = ["TABLE", "TEXTAREA", "RICHTEXT", "LOCATION"];

// 能建索引的控件
export const canIndices = [
  "TEXT",
  "TEXTAREA",
  "RADIO",
  "CHECKBOX",
  "SELECT",
  "NUMBER_TEXT",
  "CURRENCY",
  "MOBILE",
  "EMAIL",
  "DATE",
  "TIME",
  "DATETIME",
];

// 能鉴权的控件
export const canAuthority = ["SELECT", "ADMINISTRATION_REGION"];

// 类型与中文关系
export const cpnsName: Record<string, string> = {
  TEXT: "短文本",
  TEXTAREA: "长文本",
  SELECT: "选项",
  CHECKBOX: "复选框",
  RADIO: "单选",
  NUMBER_TEXT: "数字",
  CURRENCY: "金额",
  MOBILE: "手机号码",
  FILE: "文件",
  EMAIL: "邮箱",
  DATE: "日期",
  TIME: "时间",
  DATETIME: "日期时间",
  WORD: "静态文字",
  ADMINISTRATION_REGION: "地区",
  TABLE: "子表单",
  CONTAINER: "容器组件",
  TAB: "tab组件",
  SEPARATOR: "分割符",
  LOCATION: "定位",
  RICHTEXT: "富文本",
  BUTTON: "按钮",
  SWITCH: "开关",
};

export const SEARCH_MARK_INFO: Record<string, { name: string; symbol: string; value: string }> = {
  regex: {
    name: "模糊查询",
    symbol: "~",
    value: "regex",
  },
  nin: {
    name: "不包含",
    symbol: "!in",
    value: "nin",
  },
  in: {
    name: "包含",
    symbol: "in",
    value: "in",
  },
  ne: {
    name: "不等于",
    symbol: "!=",
    value: "ne",
  },
  is: {
    name: "等于",
    symbol: "=",
    value: "is",
  },
  lte: {
    name: "小于或等于",
    symbol: "<=",
    value: "lte",
  },
  lt: {
    name: "小于",
    symbol: "<",
    value: "lt",
  },
  gte: {
    name: "大于或等于",
    symbol: ">=",
    value: "gte",
  },
  gt: {
    name: "大于",
    symbol: ">",
    value: "gt",
  },
  between: {
    name: "区域",
    symbol: "[]",
    value: "between",
  },
};

export const CPN_TYPE_TO_SEARCH_MARKS: Record<string, string[]> = {
  TEXT: ["regex", "ne", "is"],
  TEXTAREA: ["regex"],
  RICHTEXT: ["regex"],
  SELECT: ["in", "nin"],
  RADIO: ["in", "nin"],
  NUMBER_TEXT: ["is", "ne", "lte", "lt", "gte", "gt", "between"],
  CURRENCY: ["is", "ne", "lte", "lt", "gte", "gt", "between"],
  MOBILE: ["regex", "is"],
  CHECKBOX: ["in", "nin"],
  EMAIL: ["regex", "is"],
  DATE: ["is", "lte", "lt", "gte", "gt", "between"],
  TIME: ["is", "lte", "lt", "gte", "gt"],
  DATETIME: ["is", "lte", "lt", "gte", "gt", "between"],
  ADMINISTRATION_REGION: ["is", "ne", "in"],
  SWITCH: ["is"],
};

export const cpnIcon: Record<string, string> = {
  TEXT: "f-duanwenben",
  TEXTAREA: "f-changwenben1",
  SELECT: "f-xuanxiang1",
  RADIO: "f-danxuan1",
  NUMBER_TEXT: "f-shuzi1",
  CURRENCY: "f-jine1",
  CHECKBOX: "f-fuxuan",
  MOBILE: "f-shoujihaoma1",
  FILE: "f-wenjianshangchuan",
  EMAIL: "f-youxiang",
  DATE: "f-riqi1",
  TIME: "f-shijian1",
  DATETIME: "f-riqishijian1",
  WORD: "f-jingtaiwenzi1",
  ADMINISTRATION_REGION: "f-diqu1",
  TABLE: "f-zibiaoge",
  RICHTEXT: "f-fuwenben",
  LOCATION: "f-dingwei",
  CONTAINER: "f-rongqizujian",
  TAB: "f-tabzujian",
  SEPARATOR: "f-fengefu",
  DEFAULT: "f-kaifazhong",
};

const baseCpns: Partial<CpnInfo>[] = [
  {
    label: "短文本",
    cpnType: "TEXT",
    cpnKey: "TEXT",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "长文本",
    cpnType: "TEXTAREA",
    cpnKey: "TEXTAREA",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "选项",
    cpnType: "SELECT",
    cpnKey: "SELECT",
    placeholder: "请选择",
    extraInfo: { options: [{ key: "option1", value: "option1" }], multiSelect: false },
    dynamicOpts: null,
    operationalTypes: [],
    type: "base",
  },
  {
    label: "单选",
    cpnType: "RADIO",
    cpnKey: "RADIO",
    placeholder: "请选择",
    extraInfo: { options: [{ key: "option1", value: "option1" }] },
    operationalTypes: [],
    type: "base",
  },
  {
    label: "数字",
    cpnType: "NUMBER_TEXT",
    cpnKey: "NUMBER_TEXT",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "金额",
    cpnType: "CURRENCY",
    cpnKey: "CURRENCY",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "复选框",
    cpnType: "CHECKBOX",
    cpnKey: "CHECKBOX",
    placeholder: "请选择",
    extraInfo: { options: [{ key: "option1", value: "option1" }] },
    operationalTypes: [],
    type: "base",
  },
  {
    label: "手机号码",
    cpnType: "MOBILE",
    cpnKey: "MOBILE",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "文件",
    cpnType: "FILE",
    cpnKey: "FILE",
    placeholder: "请选择",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "邮箱",
    cpnType: "EMAIL",
    cpnKey: "EMAIL",
    placeholder: "请输入",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "日期",
    cpnType: "DATE",
    cpnKey: "DATE",
    placeholder: "请选择日期",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "时间",
    cpnType: "TIME",
    cpnKey: "TIME",
    placeholder: "请选择时间",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "日期时间",
    cpnType: "DATETIME",
    cpnKey: "DATETIME",
    placeholder: "请选择日期时间",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "静态文字",
    cpnType: "WORD",
    cpnKey: "WORD",
    defaultValue: "静态文字",
    operationalTypes: [],
    type: "base",
  },
  {
    label: "按钮",
    cpnType: "BUTTON",
    cpnKey: "BUTTON",
    operationalTypes: [],
    type: "base",
    defaultValue: "按钮",
  },
  {
    label: "开关",
    cpnType: "SWITCH",
    cpnKey: "SWITCH",
    operationalTypes: [],
    type: "base",
    defaultValue: false,
  },
];

const advanceCpns: Partial<CpnInfo>[] = [
  {
    label: "地区",
    cpnType: "ADMINISTRATION_REGION",
    cpnKey: "REGION",
    operationalTypes: [],
    type: "advance",
  },
  {
    label: "子表格",
    cpnType: "TABLE",
    cpnKey: "TABLE",
    operationalTypes: [],
    extraInfo: {
      subCpns: [],
      allowedRepeat: true,
    },
    type: "advance",
  },
  {
    label: "富文本",
    cpnType: "RICHTEXT",
    cpnKey: "RICHTEXT",
    operationalTypes: [],
    type: "advance",
  },
  { label: "定位", cpnType: "LOCATION", cpnKey: "LOCATION", operationalTypes: [], type: "advance" },
  {
    label: "证件(建设中)",
    cpnType: "CREDENTIAL",
    cpnKey: "CREDENTIAL",
    operationalTypes: [],
    type: "advance",
  },
  { label: "子页面", cpnType: "SUBPAGE", cpnKey: "SUBPAGE", operationalTypes: [], type: "advance" },
];

export const layoutCpns: Partial<CpnInfo>[] = [
  {
    label: "容器组件",
    cpnType: "CONTAINER",
    cpnKey: "CONTAINER",
    extraInfo: {
      rows: 2,
      cols: 2,
      colsWidth: [],
      cpns: [],
      layoutWithCpns: [],
      layoutWithCpnKeys: [],
    },
    type: "layout",
  },
  {
    label: "tab组件",
    cpnType: "TAB",
    cpnKey: "TAB",
    extraInfo: {
      tabs: [
        { name: "tab1", layoutWithCpns: [], layoutWithCpnKeys: [] },
        { name: "tab2", layoutWithCpns: [], layoutWithCpnKeys: [] },
      ],
    },
    type: "layout",
  },
  { label: "分割符", cpnType: "SEPARATOR", cpnKey: "SEPARATOR", type: "layout" },
];

export const cpns = [...baseCpns, ...advanceCpns, ...layoutCpns];
