import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import "../../Styles/TableStyles.css";

export default function GenericTable({
  columnsForTable,
  dataForTable,
  tableTitle,
  isVertical = 1,
}) {
  const columns = columnsForTable;
  const [data, setData] = useState(dataForTable);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateTableData: (rowIndex, columnId, value) => {
        setData((prev) => {
          const newData = prev.map((row, index) => {
            if (rowIndex === index) {
              return { ...prev[rowIndex], [columnId]: parseFloat(value) };
            }
            return row;
          });

          return newData;
        });
      },
    },
  });

  if (isVertical === 1) {
    return (
      <>
        <div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {tableTitle}
          </div>

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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
  if (isVertical === 0) {
    return (
      <>
        <div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {tableTitle}
          </div>
          <table>
            <tbody
              style={{
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="head-table-cell">
                  <th key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <div key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    ))}
                  </th>
                </tr>
              ))}

              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="body-table-row">
                  <td key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <div key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
