import { JSX } from "react";
import { ColumnDefinitionType } from "./DataTable";

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
}

const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? 100, // 100 is our default value if width is not defined
      borderBottom: '2px solid black'
    };

    return (
      <th
        key={`headCell-${index}`}
        style={style}
      >
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

export default TableHeader;