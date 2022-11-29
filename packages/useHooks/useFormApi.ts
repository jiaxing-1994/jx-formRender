// 主要用于获取表单配置数据
import { ref } from "vue";
import { isUseful, isArray } from "@wk-libs/utils";
import LcApiService from "@lc/apiService";
import { canNotSearchCpns, canNotShowCpnsInList } from "@lc/constants";
import {
  CpnInfo,
  Form,
  ListUrlQuery,
  OperationalTypeEnum,
  OptionBodyQuery,
} from "../types/index.d";

let cacheHeaders: Record<string, string> = {};
// 表单配置信息相关
export const useFormConfig = (headers: Record<string, string> = {}) => {
  if (Object.keys(headers).length > 0) {
    cacheHeaders = headers;
  }
  // @ts-ignore
  const apiService = new LcApiService(cacheHeaders);
  const isMobile = window.location.pathname.indexOf("/mobile/") > -1;
  // 获取表单配置详情
  const getFormDetail = async (tableName: string): Promise<ApiResult<Form>> => {
    const form = await apiService.getFormDetailByNameService({ tableName });
    return form;
  };
  // 过滤隐藏/禁用的控件
  const getUsefulCpns = (cpns: CpnInfo[]): CpnInfo[] => {
    if (!cpns) {
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
  const getCanSearchCpns = (cpns: CpnInfo[]) => {
    // 1.先排除绝对不显示的 即隐藏/禁用了的
    return getUsefulCpns(cpns).filter((cpn) => {
      let isCanSearch = true;
      // 2.去掉约定的不能搜索的控件
      if (canNotSearchCpns.includes(cpn.cpnType)) {
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
      isShow = !canNotShowCpnsInList.includes(cpn.cpnType);
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

// 表格相关
export const useFormTable = () => {
  // 获取columns
  const getTabelColumns = (cpns: CpnInfo[]) => {
    return cpns.map((cpn) => {
      return {
        title: cpn.lable,
        dataIndex: cpn.cpnKey,
      };
    });
  };

  return {
    getTabelColumns,
  };
};

// 表单实际数据相关
export const useFormData = (headers: Record<string, string>) => {
  if (Object.keys(headers).length > 0) {
    cacheHeaders = headers;
  }
  // @ts-ignore
  const apiService = new LcApiService(cacheHeaders);
  const listData = ref<Record<string, any>[]>([]);
  // 获取表单列表数据
  const getFormListData = async (
    tableName: string,
    query: OptionBodyQuery[],
    params: ListUrlQuery
  ) => {
    const getListService = await apiService.postFormDataListService(tableName);
    const res = await getListService(query, params);
    return res;
  };
  // 获取表单详情数据
  const getFormDetailData = async (tableName: string, id: string) => {
    const res = await apiService.getFormDataByIdService(tableName, { id });
    return res;
  };
  return {
    listData,
    getFormListData,
    getFormDetailData,
  };
};

// 表单工具相关
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
  return {
    getSearchConditionData,
  };
};
