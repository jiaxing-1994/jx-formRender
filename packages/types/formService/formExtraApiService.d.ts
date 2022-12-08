export enum ApiMethodEnum {
  "get" = "get",
  "post" = "post",
  "put" = "put",
  "delete" = "delete",
}
export interface ExtraApi {
  id: string;
  name: string;
  url: string;
  method: ApiMethodEnum;
  searchKey: string;
  idKey?: string;
  onSuccess?: string;
  onError?: string;
}
