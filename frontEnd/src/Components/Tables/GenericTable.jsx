import dayjs from "dayjs";
const dateFormat = "DD-MM-YYYY";

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
  retTableP,
  retTableV,
}) {
  const columns = columnsForTable;
  const [data, setData] = useState(dataForTable);

  useEffect(() => {
    if (tableTitle === "טיובים ידניים - הקצאה") {
      retTableP(table);
    }
  }, []);

  useEffect(() => {
    if (tableTitle === "טיובים ידניים - הקצאה") {
      retTableV(data);
    }
  }, [data]);

  function calcTotalColumn(indexC) {
    const sum =
      data[indexC].kvutzotMinuiKatzinBahir +
      data[indexC].kvutzotMinuiKatzinMuvak +
      data[indexC].kvutzotMinuiKatzinRishoni +
      data[indexC].kvutzotMinuiNagadMuvak +
      data[indexC].kvutzotMinuiNagadRishoni;
    return sum;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      updateTableData: (indexC, keyC, valueC) => {
        setData((prev) => {
          const newData = prev.map((item, index) => {
            //if the user chages the rows of the 5 types it effects the "total" column
            if (index === indexC) {
              if (
                keyC === "kvutzotMinuiKatzinBahir" ||
                keyC === "kvutzotMinuiKatzinMuvak" ||
                keyC === "kvutzotMinuiKatzinRishoni" ||
                keyC === "kvutzotMinuiNagadMuvak" ||
                keyC === "kvutzotMinuiNagadRishoni"
              ) {
                //sumTotal calculate the total of 5 columns and adds the delta between the input (valueC) and the prev (item[keyC])
                const sumTotal = calcTotalColumn(indexC) + valueC - item[keyC];
                return { ...item, [keyC]: valueC, total: sumTotal };
              }
              //if the user changes begda or endda it effects the timeDiff column
              if (keyC === "begda" || keyC === "endda") {
                let begdaT, enddaT;
                if (keyC === "begda") {
                  begdaT = new Date(dayjs(valueC, dateFormat)).getTime();
                  enddaT = new Date(dayjs(item.endda, dateFormat)).getTime();
                } else {
                  //keyC === "endda"
                  begdaT = new Date(dayjs(item.begda, dateFormat)).getTime();
                  enddaT = new Date(dayjs(valueC, dateFormat)).getTime();
                }
                const diffT = (enddaT - begdaT) / 1000 / 31556926;
                return { ...item, [keyC]: valueC, timeDiff: diffT };
              }
              return { ...item, [keyC]: valueC };
            }
            return item;
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
