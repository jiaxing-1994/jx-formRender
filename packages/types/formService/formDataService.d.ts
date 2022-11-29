export interface OptionBodyQuery {
  key: string;
  type: string;
  value: string | number | boolean | string[] | number[];
}

export enum OrderDirectionEnum {
  ASC = "ASC",
  DESC = "DESC",
}

export interface ListUrlQuery extends PageQuery {
  orderDirection?: string;
  orderBy?: string;
}
