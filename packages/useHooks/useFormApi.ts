// 主要用于获取表单配置数据
import { ref } from "vue";
import { isUseful, isArray, isObject } from "@wk-libs/utils";
import {
  setGlobalHeaders,
  getFormDetailByNameService,
  postFormDataListService,
  getFormDataByIdService,
  postFormDataExportService,
  postFormDataImportService,
  getImportTemplateFileService,
  postFormDataSingleService,
  delFormDataByIdsService,
  putFormDataByIdService,
  getAllRegionService,
} from "@lc/apiService";
import { CAN_NOT_SEARCH_CPNS, CAN_NOT_SHOW_CPNS_IN_LIST } from "@lc/constants";
import { useDownload } from "./useFile";
import {
  CpnInfo,
  Form,
  ListUrlQuery,
  OperationalTypeEnum,
  OptionBodyQuery,
  RuleType,
} from "../types/index.d";

const cacheHeaders: Record<string, string> = {};
// 表单配置信息相关
export const useFormConfig = (headers: Record<string, string> = {}) => {
  if (Object.keys(headers).length > 0) {
    setGlobalHeaders(headers);
  }
  const isMobile = window.location.pathname.indexOf("/mobile/") > -1;

  // 获取表单配置详情
  const getFormDetail = async (tableName: string): Promise<Form> => {
    const form = await getFormDetailByNameService({ tableName });
    return form;
  };
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
    getFormDetail,
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
  if (Object.keys(headers).length > 0) {
    setGlobalHeaders(headers);
  }
  const { downloadFile } = useDownload(cacheHeaders);
  const listData = ref<Record<string, any>[]>([]);

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
        // 有效值
        result.push({
          key,
          type: type[key],
          value: value[key],
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
  return {
    getParentTrees,
    getValidator,
    getTabelColumns,
    getSearchConditionData,
  };
};
