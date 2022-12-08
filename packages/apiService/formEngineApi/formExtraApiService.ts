import Http, { ApiServeType } from "../index";
import { ExtraApi } from "../../types/formService/formExtraApiService";

enum Api {
  postExratApiList = "/interface/pageList",
  getExratApi = "/interface",
  postExratApi = "/interface",
  putExratApi = "/interface",
  delExratApi = "/interface",
  exportExratApi = "/interface/export",
  importExratApi = "/interface/importDate",
}

// 查询列表
export function postExtraApiListService(query: {
  name: string;
  currentPage: number;
  pageSize: number;
}): Promise<ExtraApi[]> {
  return Http.post(Api.postExratApiList, ApiServeType.formEngine, query);
}

// 查询详情
export function getExtraApiByIdService(id: string): Promise<ExtraApi> {
  return Http.get(Api.getExratApi, ApiServeType.formEngine, {
    id,
  });
}

// 新增
export function postNewExtraApiService(query: Partial<ExtraApi>): Promise<null> {
  return Http.post(Api.postExratApi, ApiServeType.formEngine, query);
}

// 修改
export function putExtraApiService(query: ExtraApi): Promise<null> {
  return Http.put(Api.putExratApi, ApiServeType.formEngine, query);
}

// 删除
export function delExtraApiService(id: IDQuery): Promise<null> {
  return Http.del(Api.delExratApi, ApiServeType.formEngine, id);
}

// 导出
export function exportExtraApiService(query: Record<string, any>): Promise<string> {
  return Http.post(Api.exportExratApi, ApiServeType.formEngine, query);
}

// 导入
export function importExtraApiService(query: FormData): Promise<null> {
  return Http.post(Api.importExratApi, ApiServeType.formEngine, query, {
    "Content-Type": "multipart/form-data",
  });
}
