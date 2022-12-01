import Http, { ApiServeType } from "../http";
import { ExportResult, ListUrlQuery, OptionBodyQuery } from "../../types";

export function postFormDataSingleService(
  tableName: string,
  query: Record<string, unknown>
): Promise<string> {
  return Http.post(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function getFormDataByIdService(
  tableName: string,
  query: IDQuery
): Promise<Record<string, unknown>> {
  return Http.get(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function putFormDataByIdService(
  tableName: string,
  query: Record<string, unknown>
): Promise<string | null> {
  return Http.put(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function delFormDataSoftByIdsService(
  tableName: string,
  query: IDsQuery
): Promise<string | null> {
  return Http.del(`/data/${tableName}/remove`, ApiServeType.formEngine, query);
}

export function delFormDataByIdsService(
  tableName: string,
  query: IDsQuery
): Promise<string | null> {
  return Http.del(`/data/${tableName}`, ApiServeType.formEngine, query);
}

export function postFormDataByIdsService(
  tableName: string,
  query: Record<string, unknown>[]
): Promise<string | null> {
  return Http.post(`/data/${tableName}/batch`, ApiServeType.formEngine, query);
}

export function postFormDataListService(tableName: string) {
  return (query: OptionBodyQuery[], pages: ListUrlQuery): Promise<Record<string, unknown>[]> =>
    // @ts-ignore
    Http.post(`/data/${tableName}/query`, ApiServeType.formEngine, query, pages);
}

export function postFormDataExportService(
  tableName: string,
  query: OptionBodyQuery[]
): Promise<ExportResult> {
  return Http.post(`/data/${tableName}/export`, ApiServeType.formEngine, query);
}

export function postFormDataImportService(
  tableName: string,
  file: FormData
): Promise<ExportResult> {
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

export function postUploadSingleFileService(file: FormData): Promise<string> {
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
