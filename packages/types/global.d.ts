declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare type IDQuery = {
  id: string;
};

declare type IDsQuery = {
  id: string;
};

declare interface ApiResult<D> {
  code: number;
  data: D;
  message: string;
  success: boolean;
}

declare interface PageQuery {
  currentPage: number;
  pageSize: number;
}

declare interface PageResult<D> extends ApiResult<D> {
  pageNum: number;
  pageSize: number;
  pages: number;
  size: number;
  total: number;
}
