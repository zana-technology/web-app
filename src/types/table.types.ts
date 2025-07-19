import { Option } from "./util.types";

export interface IColumn<T> {
  accessorKey?: string;
  header?: string;
  cell?: (info: { getValue: () => any; row: { original: T } }) => React.ReactNode;
  type?: "link" | "status" | "date" | "currency" | "sn" | "dateAndTime" | "truncate" | "percentage";
}

export interface Action<TData> {
  title: string;
  onClick: (row?: TData) => void;
  hide?: string[];
}

export interface TableFilterOption {
  label: string;
  value: string;
  options?: string[];
  filterType: "date" | "radio" | "select" | "boolean" | "asyncSelect";
  // queryProps?: {
  //   query: DocumentNod;
  //   hasFilters?: boolean;
  //   queryKey: string[];
  // };
  transformData?: <T>(data: any) => Option<T>[];
}
