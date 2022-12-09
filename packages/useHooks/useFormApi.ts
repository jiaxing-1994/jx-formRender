// 主要用于获取表单配置数据
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import {
  generateUrlParams,
  isArray,
  isObject,
  isUseful,
  isString,
  parseUrlParams,
} from "@wk-libs/utils";
import Storage from "@wk-libs/storage";
import Http, {
  setGlobalHeaders,
  getAllRegionService,
  putFormDataByIdService,
  getFormDataByIdService,
  getExtraApiByIdService,
  delFormDataByIdsService,
  postFormDataListService,
  postFormDataExportService,
  postFormDataImportService,
  postFormDataSingleService,
  getFormDetailByNameService,
  getImportTemplateFileService,
  AxiosRequestConfig,
} from "@lc/apiService";
import { CAN_NOT_SEARCH_CPNS, CAN_NOT_SHOW_CPNS_IN_LIST } from "@lc/constants";
import { useDownload } from "./useFile";
import {
  Action,
  ActionContent,
  ActionEnum,
  CpnInfo,
  Form,
  ListUrlQuery,
  OperationalTypeEnum,
  OptionBodyQuery,
  RuleType,
} from "@lc/types";

const storage = new Storage("lc", { strategy: "h5" });
const cacheHeaders: Record<string, string> = {};
// 表单配置信息相关
export const useFormConfig = () => {
  const isMobile = window.location.pathname.indexOf("/mobile/") > -1;

  // 过滤隐藏/禁用的控件
  const getUsefulCpns = (cpns: CpnInfo[]): CpnInfo[] => {
    if (!isArray(cpns)) {
      return [];
    }
    return cpns.filter((cpn) => {
      // 1.先排除绝对不显示的 即隐藏/禁用了的
      if (cpn.operationalTypes && cpn.operationalTypes.length > 0) {
        return (
          !cpn.operationalTypes.includes(OperationalTypeEnum.hide) &&
          !cpn.operationalTypes.includes(OperationalTypeEnum.forbidden)
        );
      }
      return true;
    });
  };

  // 获取可搜索的控件
  const getCanSearchCpns = (cpns: CpnInfo[]): CpnInfo[] => {
    // 1.先排除绝对不显示的 即隐藏/禁用了的
    return getUsefulCpns(cpns).filter((cpn) => {
      let isCanSearch = true;
      // 2.去掉约定的不能搜索的控件
      if (CAN_NOT_SEARCH_CPNS.includes(cpn.cpnType)) {
        isCanSearch = false;
      }
      // 3.去掉没有配置搜索类型的
      if (!cpn.searchMarks || cpn.searchMarks.length === 0) {
        isCanSearch = false;
      }
      return isCanSearch;
    });
  };

  // 获取需要在表格中展示的控件
  const getTableListCpns = (cpns: CpnInfo[]) => {
    return getUsefulCpns(cpns).filter((cpn) => {
      let isShow = true;
      // 1.去掉操作熟悉中配置需要隐藏的控件
      isShow = !cpn.operationalTypes?.includes(
        isMobile ? OperationalTypeEnum.app_list_hide : OperationalTypeEnum.list_hide
      );
      // 2.去掉约定的无法在列表页中展示的控件
      isShow = !CAN_NOT_SHOW_CPNS_IN_LIST.includes(cpn.cpnType);
      return isShow;
    });
  };

  // 获取需要在新增页面展示的控件
  const getAddPageCpns = (cpns: CpnInfo[]) => {
    return getUsefulCpns(cpns).filter(
      (cpn) => !cpn.operationalTypes?.includes(OperationalTypeEnum.add_page_hide)
    );
  };

  // 获取需要在详情页展示的控件
  const getDetailPageCpns = (cpns: CpnInfo[]) => {
    return getUsefulCpns(cpns).filter(
      (cpn) => !cpn.operationalTypes?.includes(OperationalTypeEnum.detail_page_hide)
    );
  };

  return {
    getCanSearchCpns,
    getTableListCpns,
    getAddPageCpns,
    getDetailPageCpns,
  };
};

// 表单数据相关
export const useFormData = (tableName: string, headers: Record<string, string> = {}) => {
  if (!tableName) {
    alert("数据库表名不能为空");
    throw new Error("数据库表名不能为空");
  }
  // 缓存header
  const { getUrlParams, parseStringInUrl } = useFormTools();
  setGlobalHeaders({
    ...parseStringInUrl(getUrlParams(tableName, "headers")),
    ...headers,
  });
  if (Object.keys(headers).length > 0) {
    setGlobalHeaders(headers);
  }

  const { downloadFile } = useDownload(cacheHeaders);
  const listData = ref<Record<string, any>[]>([]);

  const { handleLayoutCpns } = useFormTools();
  // 获取表单配置详情
  const getFormDetail = async (): Promise<Form> => {
    const form = await getFormDetailByNameService({ tableName });
    return {
      ...form,
      cpns: handleLayoutCpns(form.cpns),
    };
  };

  // 获取表单列表数据
  const getFormListData = async (query: OptionBodyQuery[], params: ListUrlQuery) => {
    const getListService = await postFormDataListService(tableName);
    listData.value = await getListService(query, params);
  };

  // 获取表单详情数据
  const getFormDetailData = async (id: string) => {
    const res = await getFormDataByIdService(tableName, { id });
    return res;
  };

  // 导出数据
  const exportListData = async (query: OptionBodyQuery[] = []) => {
    const res = await postFormDataExportService(tableName, query);
    if (res.fileUrl) {
      await downloadFile(res.fileUrl);
    }
  };

  // 导入数据
  const importListData = async (query: FormData) => {
    const res = await postFormDataImportService(tableName, query);
    let tipMsg = `导入完成, 总共数据${res.totalNum}条，成功导入${res.successNum}条`;
    if (res.failNum > 0) {
      // 导入失败
      tipMsg += `，失败${res.failNum}条，失败原因请在下载的文件中查看！`;
    } else {
      // 导入成功
    }
    return tipMsg;
  };

  // 下载模板文件
  const downloadTemplateFile = async () => {
    await getImportTemplateFileService(tableName);
  };

  // 新增数据
  const addData = async (query: Record<string, any>) => {
    return await postFormDataSingleService(tableName, query);
  };

  // 删除数据
  const delData = async (ids: string) => {
    return await delFormDataByIdsService(tableName, {
      ids,
    });
  };

  // 编辑数据
  const editData = async (query: Record<string, any>) => {
    return await putFormDataByIdService(tableName, query);
  };

  // 获取行政码数据
  const getRegionCode = async () => {
    return await getAllRegionService();
  };
  return {
    listData,
    addData,
    delData,
    editData,
    getFormDetail,
    getRegionCode,
    exportListData,
    importListData,
    getFormListData,
    getFormDetailData,
    downloadTemplateFile,
  };
};

// 表单工具相关, 数据转换，组合等
export const useFormTools = () => {
  // 通过搜索值对象和搜索类型对象获取完整的搜索条件参数
  const getSearchConditionData = (
    value: Record<string, any>,
    type: Record<string, string>
  ): OptionBodyQuery[] => {
    const result: OptionBodyQuery[] = [];
    for (const key in value) {
      // 单独处理数组
      if (isArray(value[key]) && value[key].length > 0) {
        result.push({
          key,
          type: type[key],
          value: value[key],
        });
      }
      if (isUseful(value[key]) && !isArray(value[key])) {
        let valueData = value[key];
        if (["in", "nin"].includes(type[key])) {
          valueData = [value[key]];
        }
        // 有效值
        result.push({
          key,
          type: type[key],
          value: valueData,
        });
      }
    }
    return result;
  };
  // 获取columns
  const getTabelColumns = (cpns: CpnInfo[], isHasAction = false) => {
    const defaultColumns = [];
    if (isHasAction) {
      defaultColumns.push({
        fixed: "right",
        title: "操作",
        dataIndex: "actions",
        width: 120,
      });
    }
    return [
      ...cpns.map((cpn) => {
        return {
          title: cpn.lable,
          dataIndex: cpn.cpnKey,
        };
      }),
      ...defaultColumns,
    ];
  };
  // 添加校验器
  const getValidator = (cpn: CpnInfo, validators: RuleType[] = []) => {
    const { cpnType } = cpn;
    !validators && (validators = []);
    if (cpnType === "MOBILE") {
      if (!validators.find((item) => item.validatorType === "REGEXP")) {
        validators.push({
          validatorType: "REGEXP",
          regexp: /^1\d{10}$/,
          message: "无效的手机号码格式",
        });
      }
    }
    if (cpnType === "EMAIL") {
      if (!validators.find((item) => item.validatorType === "REGEXP")) {
        validators.push({
          validatorType: "REGEXP",
          regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          message: "无效的邮箱地址格式",
        });
      }
    }
    return validators;
  };

  // 通过单个节点，向上查找其所有的父节点
  const getParentTrees = (
    treeNodes: any[] | object,
    tree: string | number,
    result: any[],
    fieldName = { children: "childNodes", value: "code" },
    level = 0
  ): boolean => {
    let isFind = false;
    if (isArray(treeNodes)) {
      for (let i = 0; i < treeNodes.length; i += 1) {
        if (isObject(treeNodes[i])) {
          result[level] = treeNodes[i];
          if (treeNodes[i][fieldName.value] === tree) {
            isFind = true;
          }
          if (!isFind) {
            isFind = getParentTrees(treeNodes[i], tree, result, fieldName, level);
          }
          if (isFind) {
            break;
          } else {
            result.pop();
          }
        }
      }
    } else if (isObject(treeNodes)) {
      if (treeNodes[fieldName.value] === tree) {
        result[level] = treeNodes;
        isFind = true;
      } else if (
        isArray(treeNodes[fieldName.children]) &&
        treeNodes[fieldName.children].length > 0
      ) {
        isFind = getParentTrees(treeNodes[fieldName.children], tree, result, fieldName, level + 1);
      }
    }
    return isFind;
  };

  // 处理布局组件
  const handleLayoutCpns = (cpns: CpnInfo[]): CpnInfo[] => {
    const handleContainer = (cpn: CpnInfo) => {
      if (cpn.extraInfo?.layoutWithCpnKeys) {
        cpn.extraInfo.layoutWithCpnKeys.forEach((rowCpnKeys, rowIndex) => {
          rowCpnKeys.forEach((cpnKeys, colIndex) => {
            cpnKeys.forEach((cpnKey, index) => {
              const findIndex = cpns.findIndex((cpn) => cpn.cpnKey === cpnKey);
              if (findIndex > -1) {
                // 找到对应的组件
                if (!cpn.extraInfo!.layoutWithCpns) {
                  cpn.extraInfo!.layoutWithCpns = [];
                }
                if (!cpn.extraInfo!.layoutWithCpns[rowIndex]) {
                  cpn.extraInfo!.layoutWithCpns[rowIndex] = [];
                }
                if (!cpn.extraInfo!.layoutWithCpns[rowIndex][colIndex]) {
                  cpn.extraInfo!.layoutWithCpns[rowIndex][colIndex] = [];
                }
                if (["CONTAINER", "TAB"].includes(cpns[findIndex].cpnType)) {
                  handleLayoutSingle(cpns[findIndex]);
                }
                cpn.extraInfo!.layoutWithCpns[rowIndex][colIndex][index] = cpns[findIndex];
                cpns.splice(findIndex, 1);
              }
            });
          });
        });
      }
    };
    const handleTab = (cpn: CpnInfo) => {
      if (cpn.extraInfo?.tabs) {
        cpn.extraInfo.tabs.forEach((tabItem) => {
          if (tabItem.layoutWithCpnKeys) {
            if (!tabItem.layoutWithCpns) {
              tabItem.layoutWithCpns = [];
            }
            tabItem.layoutWithCpnKeys.forEach((cpnKey) => {
              const findIndex = cpns.findIndex((cpn) => cpn.cpnKey === cpnKey);
              if (findIndex > -1) {
                handleLayoutSingle(cpns[findIndex]);
                tabItem.layoutWithCpns!.push(cpns[findIndex]);
                cpns.splice(findIndex, 1);
              }
            });
          }
        });
      }
    };
    const handleLayoutSingle = (cpn: CpnInfo) => {
      const { cpnType } = cpn;
      switch (cpnType) {
        case "CONTAINER":
          handleContainer(cpn);
          break;
        case "TAB":
          handleTab(cpn);
          break;
        default:
          break;
      }
    };
    [...cpns].forEach((cpn) => {
      handleLayoutSingle(cpn);
    });
    return cpns;
  };

  // 处理url参数
  const getUrlParams = (tableName: string, key?: string): any => {
    const urlParams = parseUrlParams();
    const localParams = storage.getLocal(tableName);
    if (localParams) {
      // 对比当前url和本地缓存，如果是相同的key，则以url为准
      for (const key in localParams) {
        if (!urlParams[key]) {
          urlParams[key] = localParams[key];
        }
      }
    }
    storage.setLocal(tableName, urlParams);
    if (key) {
      if (urlParams[key]) {
        return urlParams[key];
      }
      return null;
    }
    return urlParams;
  };

  // 处理url中的格式的参数(key:value,key:value)
  const parseStringInUrl = (str: string | null): Record<string, string> => {
    if (isString(str)) {
      const strArr = str.split(",");
      const strObj: Record<string, string> = {};
      strArr.forEach((str) => {
        const [key, value] = str.split(":");
        strObj[key] = value;
      });
      return strObj;
    }
    return {};
  };

  // 处理url中的搜索条件格式参数 (key#value#type?;key#value#type?)
  const parseSearchInUrl = (searchStr: string | null): OptionBodyQuery[] => {
    if (isString(searchStr)) {
      const keyRegx = /([\w_]+)#([\u4e00-\u9fa5\w\s-:\]\["'_,/+]+)#?(\w*)/;
      const searchArr = searchStr.split(";");
      const strRegx = /^[\w]+$/;
      const result: OptionBodyQuery[] = [];
      searchArr.forEach((item: string) => {
        if (keyRegx.test(decodeURIComponent(item))) {
          const matched: any = item.match(keyRegx);
          const [, key, , type] = matched;
          let [, , value] = matched;
          try {
            if (!strRegx.test(value)) {
              value = JSON.parse(value);
            }
          } catch (e) {
            value = String(value);
          }
          result.push({
            key,
            type: type || "is",
            value,
          });
        }
      });
      return result;
    }
    return [];
  };
  return {
    getUrlParams,
    getValidator,
    getParentTrees,
    getTabelColumns,
    handleLayoutCpns,
    parseStringInUrl,
    parseSearchInUrl,
    getSearchConditionData,
  };
};

// 表单关联动作
export const useFormActions = (formModel: Ref<Record<string, any>>) => {
  const hideCpnKeys = ref<string[]>([]);
  const linkHideOrShowCpnKeys = ref<Record<string, CpnInfo>>({});
  const execActions = (
    actions: Action<keyof ActionContent>[],
    cpnKey: string,
    triggerType: string
  ) => {
    actions.forEach((action) => {
      if (action.trigger === triggerType) {
        switch (action.type) {
          case ActionEnum.code:
            execCodeAction(action as Action<ActionEnum.code>, cpnKey);
            break;
          case ActionEnum.hideOrShow:
            execHideOrShowAction(action as Action<ActionEnum.hideOrShow>, cpnKey);
          case ActionEnum.jumpPage:
            execJumpPageAction(action as Action<ActionEnum.jumpPage>, cpnKey);
            break;
        }
      }
    });
  };
  const execCodeAction = (action: Action<ActionEnum.code>, cpnKey: string) => {
    const fn = new Function("value", "formState", "formData", "utils", action.action);
    try {
      fn(formModel.value[cpnKey], formModel, formModel.value, {});
    } catch (e: any) {
      console.log(e);
    }
  };
  const execHideOrShowAction = (action: Action<ActionEnum.hideOrShow>, cpnKey: string) => {
    //   resultType: string; // 隐藏/显示控件
    //   cpnsType: string; // 多个控件的满足关系，且/或
    //   cpns: ActionCpn[]; // 控件数组
    const { resultType, cpnsType, cpns } = action.action;
    let hasTrue = false; // 是否存在匹配的
    let hasFalse = false; // 是否存在不匹配的
    cpns.forEach((cpn) => {
      const { cpnKey, valueArr } = cpn;
      const find = valueArr.find((value) => String(value) === String(formModel.value[cpnKey]));
      find ? (hasTrue = true) : (hasFalse = true);
    });
    let isHide = false;
    switch (resultType) {
      case "hide":
        isHide = cpnsType === "and" ? !hasFalse : hasTrue;
        break;
      case "show":
        isHide = cpnsType === "and" ? hasFalse : !hasTrue;
        break;
    }
    if (isHide) {
      if (!hideCpnKeys.value.includes(cpnKey)) {
        hideCpnKeys.value.push(cpnKey);
      }
    } else {
      const findIndex = hideCpnKeys.value.findIndex((hideCpnKey) => hideCpnKey === cpnKey);
      if (findIndex > -1) {
        hideCpnKeys.value.splice(findIndex, 1);
      }
    }
  };
  // 获取有隐藏/显示关联的控件
  const getHideOrShowCpnKey = (cpn: CpnInfo) => {
    if (cpn.actions) {
      const actions: Action<keyof ActionContent>[] = JSON.parse(cpn.actions);
      actions.forEach((action) => {
        if (action.type === ActionEnum.hideOrShow) {
          (action as Action<ActionEnum.hideOrShow>).action.cpns.forEach((actionCpn) => {
            linkHideOrShowCpnKeys.value[actionCpn.cpnKey] = cpn;
          });
        }
      });
    }
  };
  const Router = useRouter();
  const execJumpPageAction = (action: Action<ActionEnum.jumpPage>, cpnKey: string) => {
    const { url, queryCode } = action.action;
    if (url) {
      const query = {};
      if (queryCode) {
        const fn = new Function("value", "formState", "formData", "utils", queryCode);
        const res = fn(formModel.value[cpnKey], formModel, formModel.value, {});
        if (isObject(res)) {
          Object.assign(query, res);
        }
      }
      if (/^https?:/.test(url)) {
        // 说明跳转外部
        Router.push({
          path: "/iframePage",
          query: {
            urlQuery: generateUrlParams(query),
            url,
          },
        });
      } else {
        // 说明跳转内部
        Router.push({
          path: url,
          query,
        });
      }
    }
  };

  return {
    hideCpnKeys,
    linkHideOrShowCpnKeys,
    execActions,
    execCodeAction,
    execJumpPageAction,
    getHideOrShowCpnKey,
    execHideOrShowAction,
  };
};

// 表单外部接口
export const useFormExtraApi = () => {
  // 获取接口详情
  const getExtraById = async (id: string) => {
    return await getExtraApiByIdService(id);
  };
  // 获取外部接口值
  const getExtraApiResult = async <D>(id: string) => {
    const extraApi = await getExtraById(id);
    return async (keyword: string): Promise<D> => {
      const { url, method, searchKey, idKey, onSuccess, onError } = extraApi;
      const query: Record<string, string | number> = {};
      const params: Record<string, string | number> = {};
      if (method === "get") {
        params[searchKey || idKey || "name"] = keyword;
      } else if (keyword) {
        query[searchKey || idKey || "name"] = keyword;
      }
      return await getOutSideApi<Record<string, string | number>, D>(
        {
          url: replaceUrl(url),
          method,
          data: query,
          params,
          headers: cacheHeaders,
        },
        onSuccess,
        onError
      );
    };
  };
  const replaceUrl = (url: string) => {
    if (isString(url)) {
      return url.replace(/\${ip}/, () => {
        return "182.148.114.194:30080" || window.location.host;
      });
    }
    throw new Error("url类型错误");
  };
  // 调用外部接口
  const getOutSideApi = async <Q, D>(
    options: AxiosRequestConfig = {},
    onSuccess?: string,
    onError?: string
  ): Promise<D> => {
    const res = await Http.request<Q, D>(options);
    let result = res;
    if (onSuccess) {
      result = new Function("data", onSuccess)(res);
    }
    if (onError) {
      new Function("data", onError)(res);
    }
    return result;
  };
  return {
    getExtraById,
    getExtraApiResult,
    getOutSideApi,
  };
};
