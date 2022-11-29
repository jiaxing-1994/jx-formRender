import { ColumnType } from "@lc/pcComponents";

export const columns: ColumnType[] = [
  {
    title: "姓名",
    dataIndex: "name",
  },
  {
    title: "性别",
    dataIndex: "sex",
  },
  {
    title: "年龄",
    dataIndex: "age",
  },
];

export const data: Record<string, any> = [
  {
    name: "家兴",
    sex: "男",
    age: "28",
  },
];
