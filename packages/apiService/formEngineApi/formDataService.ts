import Http, { ApiServeType } from "../http";
import { ExportResult, ListUrlQuery, OptionBodyQuery } from "../../types";

export function postFormDataSingleService(
  tableName: string,
  query: Record<string, unknown>
): Promise<ApiResult<string>> {
  return Http.post(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function getFormDataByIdService(
  tableName: string,
  query: IDQuery
): Promise<ApiResult<Record<string, unknown>>> {
  return Http.get(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function putFormDataByIdService(
  tableName: string,
  query: Record<string, unknown>
): Promise<ApiResult<string | null>> {
  return Http.put(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function delFormDataSoftByIdsService(
  tableName: string,
  query: IDsQuery
): Promise<ApiResult<string | null>> {
  return Http.del(`/data/${tableName}/remove`, ApiServeType.formEngine, query);
}

export function delFormDataByIdsService(
  tableName: string,
  query: IDsQuery
): Promise<ApiResult<string | null>> {
  return Http.del(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function postFormDataByIdsService(
  tableName: string,
  query: Record<string, unknown>[]
): Promise<ApiResult<string | null>> {
  return Http.post(`/data/${tableName}/batch`, ApiServeType.formEngine, query);
}

export function postFormDataListService(tableName: string) {
  return (
    query: OptionBodyQuery[],
    pages: ListUrlQuery
  ): Promise<ApiResult<Record<string, unknown>[]>> =>
    // @ts-ignore
    Http.post(`/data/${tableName}/query`, ApiServeType.formEngine, query, pages);
}

export function postFormDataExportService(
  tableName: string,
  query: OptionBodyQuery[]
): Promise<ApiResult<ExportResult>> {
  return Http.post(`/data/${tableName}/export`, ApiServeType.formEngine, query);
}

export function postFormDataImportService(
  tableName: string,
  file: FormData
): Promise<ApiResult<ExportResult>> {
  return Http.post(
    `/data/${tableName}/import`,
    ApiServeType.formEngine,
    file,
    {},
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

export function postUploadSingleFileService(file: FormData): Promise<ApiResult<string>> {
  return Http.post(
    "/file/single",
    ApiServeType.formEngine,
    file,
    {},
    {
      "Content-Type": "multipart/form-data",
    }
  );
}

export function getImportTemplateFileService(tableName: string) {
  window.open(`${ApiServeType.formEngine}/form/${tableName}/importTemplate`, "_blank");
}
