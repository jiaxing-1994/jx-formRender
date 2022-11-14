import Http, { ApiServeType } from "../http";
import { Form, FormBaseInfo, RegionType } from "@lc/types/form";
import { FormQuery, ExportResult, FormListQuery } from "@lc/types/formService/formService";

enum Api {
  addForm = "/form",
  editForm = "/form",
  delForm = "/form",
  getFormDetail = "/form",
  getFormDetailByName = "/form/byname",
  softDelForm = "/form/remove",
  queryFormList = "/form/query",
  exportFormConfig = "/form/config/export", // 导出表单配置
  importFormConfig = "/form/config/import", // 导入配置文件
  baseRegion = "/base/region", // 查询全量行政码
  baseRegionDetail = "/base/region/detail", // 查询某个地区的行政码
}

export function postAddFormService(query: FormQuery): Promise<ApiResult<string>> {
  return Http.post(Api.addForm, ApiServeType.formEngine, query);
}

export function putEditFormService(query: FormQuery): Promise<ApiResult<null>> {
  return Http.put(Api.editForm, ApiServeType.formEngine, query);
}

export function delFormService(query: IDQuery): Promise<ApiResult<null>> {
  return Http.del(Api.delForm, ApiServeType.formEngine, query);
}

export function delFormBySoftService(query: IDQuery): Promise<ApiResult<null>> {
  return Http.del(Api.softDelForm, ApiServeType.formEngine, query);
}

export function getFormListService(query: FormListQuery): Promise<PageResult<FormBaseInfo[]>> {
  return Http.get(Api.queryFormList, ApiServeType.formEngine, query);
}

export function getFormDetailService(query: IDQuery): Promise<ApiResult<Form>> {
  return Http.get(Api.getFormDetail, ApiServeType.formEngine, query);
}

export function getFormDetailByNameService(query: { tableName: string }): Promise<ApiResult<Form>> {
  return Http.get(Api.getFormDetailByName, ApiServeType.formEngine, query);
}

export function getExportFormConfigService(query: IDsQuery): Promise<ApiResult<ExportResult>> {
  return Http.get(Api.exportFormConfig, ApiServeType.formEngine, query);
}

export function postImportFormConfigService(query: FormData): Promise<ApiResult<string>> {
  return Http.post(Api.importFormConfig, ApiServeType.formEngine, query, {
    "Content-Type": "multipart/form-data",
  });
}

export function getAllRegionService(): Promise<ApiResult<RegionType[]>> {
  return Http.get(Api.baseRegion, ApiServeType.formEngine);
}

export function getRegionByCodeService(code: string | number): Promise<ApiResult<RegionType>> {
  return Http.get(Api.baseRegion, ApiServeType.formEngine, {
    code,
  });
}
