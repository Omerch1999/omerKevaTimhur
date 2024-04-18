import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import "../../Styles/TableStyles.css";

export default function GenericTable({
  columnsForTable,
  dataForTable,
  tableTitle,
}) {
  const columns = columnsForTable;
  const [data, setData] = useState(dataForTable);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // meta: {
    //   updateData: (rowIndex, columnId, value) =>
    //     setData((prev) =>
    //       prev.map((row, index) =>
    //         index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row
    //       )
    //     ),
    // },
  });

  return (
    <>
      <div
        style={{
          border: "2px solid",
          display: "inline-block",
        }}
      >
        <b>{tableTitle}</b>

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="head-table-cell" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className="body-table-row" key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
