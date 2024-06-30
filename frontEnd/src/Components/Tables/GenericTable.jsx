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
import { useQuery } from "@tanstack/react-query";

export default function GenericTable({
  columnsForTable = [],
  dataForTable = [],
  tableTitle = "no title",
  styleForRow = "body-table-row",
  isVertical = true,
  retTableP,
  retTableV,
  retCheckBoxesV,
  getUrl = "",
}) {
  const columns = columnsForTable;
  const [data, setData] = useState(dataForTable);
  //checkBoxes array, all false at the begining and it changes depend on marking
  const [checkboxesState, setCheckboxesState] = useState(
    Array(dataForTable.length).fill(false)
  );

  const fetchDbData = async () => {
    const response = await axios.get("http://localhost:4000/gett");
    console.log("response");
    return response;
  };

  const {
    data: fetchedDbData,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["fetchedDbData"],
    queryFn: fetchDbData,
  });

  if (dataForTable.length === 0) {
    //if no data passed means we need get Function to get the data
    console.log("empty");
  }

  useEffect(() => {
    //return pointer to the table so we can use it for meta fuctions
    if (tableTitle.includes("שינויים בהיבט")) {
      retTableP(table);
    }
  }, []);

  useEffect(() => {
    //return data of the table to update the state at father component
    if (tableTitle.includes("שינויים בהיבט")) {
      retTableV(data);
    }
  }, [data]);

  useEffect(() => {
    //adds row index
    if (tableTitle.includes("שינויים בהיבט")) {
      setData((prev) => {
        const temp = prev.map((item, index) => {
          return { ...item, rowNum: index };
        });
        return temp;
      });
      //add new cell to the array of the checkboxes state when new row added
      if (data.length > checkboxesState.length) {
        setCheckboxesState((prev) => {
          let temp = [...prev];
          const amountNeedToAdd = data.length - checkboxesState.length;
          for (let i = 0; i < amountNeedToAdd; i++) {
            temp.push(false);
          }
          return temp;
        });
      } //delete the not extra checkboxes left and turn all off
      else if (data.length < checkboxesState.length) {
        setCheckboxesState((prev) => {
          const temp = Array(data.length).fill(false);
          return temp;
        });
      }
    }
  }, [data.length]);

  useEffect(() => {
    if (tableTitle.includes("שינויים בהיבט")) {
      retCheckBoxesV(checkboxesState);
    }
  }, [checkboxesState]);

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
            //updateTable specific for tiubimIdaniim tables
            if (tableTitle.includes("שינויים בהיבט")) {
              //if the user chages the rows of the 5 kvutzotMinui types it effects the "total" column
              if (index === indexC) {
                if (
                  keyC === "kvutzotMinuiKatzinBahir" ||
                  keyC === "kvutzotMinuiKatzinMuvak" ||
                  keyC === "kvutzotMinuiKatzinRishoni" ||
                  keyC === "kvutzotMinuiNagadMuvak" ||
                  keyC === "kvutzotMinuiNagadRishoni"
                ) {
                  //sumTotal calculate the total of 5 columns and adds the delta between the input (valueC) and the prev (item[keyC])
                  const sumTotal =
                    calcTotalColumn(indexC) + valueC - item[keyC];
                  return { ...item, [keyC]: valueC, total: sumTotal };
                }
                //if the user changes begda or endda it effects the timeDiff column
                if (keyC === "begda" || keyC === "endda") {
                  let begdaT, enddaT;
                  if (keyC === "begda") {
                    begdaT = dayjs(valueC, dateFormat);
                    enddaT = dayjs(item.endda, dateFormat);
                  } else {
                    //keyC === "endda"
                    begdaT = dayjs(item.begda, dateFormat);
                    enddaT = dayjs(valueC, dateFormat);
                  }
                  const diffT = enddaT.diff(begdaT, "years", true);
                  return { ...item, [keyC]: valueC, timeDiff: diffT };
                }
                return { ...item, [keyC]: valueC };
              }
            }
            return item;
          });

          return newData;
        });
      },

      addRowToTableData: (newRow) => {
        setData((prev) => {
          let temp = prev; //understand why [...prev] doesnt work
          temp.push(newRow);
          return temp;
        });
      },

      removeRowsFromTable: () => {
        setData((prev) => {
          const temp = prev.filter((e, index) => !checkboxesState[index]);
          return temp;
        });
      },

      updateCheckBoxes: (rowNum, status) => {
        setCheckboxesState((prev) => {
          let temp = [...prev];
          temp.splice(rowNum, 1, status);
          return temp;
        });
      },
    },
  });

  if (isVertical) {
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
                            &darr;
                          </Button>
                        ) : header.column.getIsSorted() === "desc" ? (
                          <Button
                            type="text"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            &uarr;
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
  //horizontal table
  if (isVertical === false) {
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
