import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import "../../Styles/TableStyles.css";
import { Button } from "antd";

export default function GenericTable({
  columnsForTable,
  dataForTable,
  tableTitle,
  styleForRow = "body-table-row",
  isVertical = 1,
}) {
  const columns = columnsForTable;
  const [data, setData] = useState(dataForTable);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // meta: {
    //   updateTableData: (rowIndex, columnId, value) => {
    //     setData((prev) => {
    //       const newData = prev.map((row, index) => {
    //         if (rowIndex === index) {
    //           return { ...prev[rowIndex], [columnId]: parseFloat(value) };
    //         }
    //         return row;
    //       });

    //       return newData;
    //     });
    //   },
    // },
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
                      {header.column.getCanSort() ? (
                        header.column.getIsSorted() === "asc" ? (
                          <Button
                            type="text"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            &uarr;
                          </Button>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <Button
                            type="text"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            &darr;
                          </Button>
                        ) : (
                          <Button
                            type="text"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            &uarr; &darr;
                          </Button>
                        )
                      ) : null}

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
                <tr className={styleForRow} key={row.id}>
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
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <th key={footer.id}>
                      {flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
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
            <div style={{ display: "flex" }}>
              {/* need to add styles by other option to save it generic */}
              <div style={{ width: "42.1%" }}>קצינים</div>
              <div style={{ width: "57.9%" }}>נגדים</div>
            </div>
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
                    {headerGroup.headers.map((footer) => (
                      <div key={footer.id}>
                        {flexRender(
                          footer.column.columnDef.header,
                          footer.getContext()
                        )}
                      </div>
                    ))}
                  </th>
                </tr>
              ))}

              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={styleForRow}>
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
