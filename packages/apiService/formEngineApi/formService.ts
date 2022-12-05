import Http, { ApiServeType } from "../index";
import {
  Form,
  FormBaseInfo,
  RegionType,
  FormQuery,
  ExportResult,
  FormListQuery,
} from "../../types";

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

export function postAddFormService(query: FormQuery): Promise<string> {
  return Http.post(Api.addForm, ApiServeType.formEngine, query);
}

export function putEditFormService(query: FormQuery): Promise<null> {
  return Http.put(Api.editForm, ApiServeType.formEngine, query);
}

export function delFormService(query: IDQuery): Promise<null> {
  return Http.del(Api.delForm, ApiServeType.formEngine, query);
}

export function delFormBySoftService(query: IDQuery): Promise<null> {
  return Http.del(Api.softDelForm, ApiServeType.formEngine, query);
}

export function getFormListService(query: FormListQuery): Promise<PageResult<FormBaseInfo[]>> {
  return Http.get(Api.queryFormList, ApiServeType.formEngine, query);
}

export function getFormDetailService(query: IDQuery): Promise<Form> {
  return Http.get(Api.getFormDetail, ApiServeType.formEngine, query);
}

export function getFormDetailByNameService(query: { tableName: string }): Promise<Form> {
  return Http.get(Api.getFormDetailByName, ApiServeType.formEngine, query);
}

export function getExportFormConfigService(query: IDsQuery): Promise<ExportResult> {
  return Http.get(Api.exportFormConfig, ApiServeType.formEngine, query);
}

export function postImportFormConfigService(query: FormData): Promise<string> {
  return Http.post(Api.importFormConfig, ApiServeType.formEngine, query, {
    "Content-Type": "multipart/form-data",
  });
}

export function getAllRegionService(): Promise<RegionType[]> {
  return Http.get(Api.baseRegion, ApiServeType.formEngine);
}

export function getRegionByCodeService(code: string | number): Promise<RegionType> {
  return Http.get(Api.baseRegion, ApiServeType.formEngine, {
    code,
  });
}
