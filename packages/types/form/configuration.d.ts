export interface Configuration {
  indices: IndicesDetail[];
  defaultFieldDisplays: DefaultFieldDisplay[];
  defaultButtonConfig: DefaultButton[] | null;
  defaultPageString: string;
}

export interface IndicesDetail {
  name: string;
  keys: KeySortType[];
  unique: boolean;
}

export interface KeySortType {
  key: string;
  sort: string;
}

export interface DefaultFieldDisplay {
  field: string;
  fieldName: string;
  listHide: boolean;
  appListHide: boolean;
}

export interface DefaultButton {
  name: string;
  type: string;
  isShow: boolean;
  isOrigin: boolean;
  isCustomTemplate?: boolean;
  templateUrl?: string;
}
