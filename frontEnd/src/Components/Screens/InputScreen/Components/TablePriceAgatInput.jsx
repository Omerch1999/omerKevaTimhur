import { InputNumber, Tooltip } from "antd";
import { costs_agat } from "../../../../data";
import GenericTable from "../../../Tables/GenericTable";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = 'מחירון דרגות אג"ת';
export default function TablePriceAgatInput() {
  //get pointer to the React table
  function retTableP(val) {
    setReactTableP(val);
  }

  //get the data from the React table
  function retTableV(val) {
    setTableData(val);
  }

  //pointer for the table to get the meta functions
  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState();
  const {
    data: initalFetchedData,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["costs_agat"],
    queryFn: () => FetchTableData("http://localhost:4000/costs_agat"),
  });

  useEffect(() => {
    //update after fetch completed the state that holds the data
    if (isFetched && !isError) {
      setTableData(initalFetchedData.data);
    }
  }, [isFetched]);

  if (isError) {
    return ErrorFechTableData(tableTitle);
  }

  // const [tamhilKatzar, setTamhilKatzar] = useState([
  //   costs_agat.find((row) => row.id === 222224).percentege,
  // ]); //save only katzin katzar because katzin rishoni will be: 1-katzinKatzar

  // //save the changes of input in state
  // function handleSetTableData(rowIndex, columnId, value) {
  //   setTableData((prev) => {
  //     const newData = prev.map((row, index) => {
  //       if (rowIndex === index) {
  //         return { ...prev[rowIndex], [columnId]: parseFloat(value) };
  //       }
  //       return row;
  //     });
  //     return newData;
  //   });
  // }

  // //on change price of nagad katzar or nagad rishoni, it calculate the avarage price "מונחי ראשוני"
  // useEffect(() => {
  //   const priceNagadKatsar = tableData.find((row) => row.id === 222231).price;
  //   const priceNagadRishoni = tableData.find((row) => row.id === 222232).price;

  //   setTableData((prev) => {
  //     const newData = prev.map((item) => {
  //       if (item.id === 222230) {
  //         return { ...item, price: (priceNagadKatsar + priceNagadRishoni) / 2 };
  //       }
  //       return item;
  //     });
  //     return newData;
  //   });
  // }, [
  //   tableData.find((row) => row.id === 222231).price,
  //   tableData.find((row) => row.id === 222232).price,
  // ]);

  // //on change price of katzin katzar or katzin rishoni, it calculate the price "קצין ראשוני ממוצע ותמהיל"
  // useEffect(() => {
  //   const priceKatzinKatzar = tableData.find((row) => row.id === 222224).price;
  //   const priceKatzinRishoni = tableData.find((row) => row.id === 222221).price;

  //   setTableData((prev) => {
  //     const newData = prev.map((item) => {
  //       if (item.id === 222220) {
  //         return {
  //           ...item,
  //           price:
  //             priceKatzinKatzar * tamhilKatzar +
  //             priceKatzinRishoni * (1 - tamhilKatzar),
  //         };
  //       }
  //       return item;
  //     });
  //     return newData;
  //   });
  // }, [
  //   tamhilKatzar,
  //   tableData.find((row) => row.id === 222221).price,
  //   tableData.find((row) => row.id === 222224).price,
  // ]);

  const columns = [
    {
      accessorKey: "price",
      header: "עלות",
      cell: (props) => {
        const styleForCellGreen = {
          width: "6.7vw",
          scale: "95%",
          border: "2px solid green",
        };
        const styleForCell = {
          width: "6.7vw",
          scale: "95%",
        };
        if (tableData[props.row.index].id === 222220) {
          //katzin rishoni memutza v tamhil
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - סכום מכפלות מחירי קצין ראשוני וקצין קצר בתמהיל"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price.toFixed(2)}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        if (tableData[props.row.index].id === 222230) {
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - ממוצע מחיר נגד קצר וראשוני"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price.toFixed(2)}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].price}
            addonAfter={"₪"}
            onChange={(value) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                props.column.id,
                value
              );
              if ([222236, 222235].includes(props.row.original.id)) {
                //munahi rishoni
                //if changed nagad katzar or nagad rishoni update the calculated value
                //the values for the meta function is the index and not the id so we need
                //to find the index of calculated value
                reactTableP.options.meta.updateTableData(
                  tableData.findIndex((e) => e.id === 222230),
                  "price",
                  (tableData.find((e) => e.id === 222235).price +
                    tableData.find((e) => e.id === 222236).price +
                    value -
                    tableData.find((e) => e.id === props.row.original.id)
                      .price) /
                    2
                );
              }
              if ([222221, 222224].includes(props.row.original.id)) {
                //console.log(props.row.original.id);
                reactTableP.options.meta.updateTableData(
                  tableData.findIndex((e) => e.id === 222220),
                  "price",
                  tableData.find((e) => e.id === 222221).price *
                    tableData.find((e) => e.id === 222221).percentege +
                    tableData.find((e) => e.id === 222224).price *
                      tableData.find((e) => e.id === 222224).percentege +
                    value *
                      tableData.find((e) => e.id === props.row.original.id)
                        .percentege -
                    tableData.find((e) => e.id === props.row.original.id)
                      .price *
                      tableData.find((e) => e.id === props.row.original.id)
                        .percentege
                );
              }
            }}
          ></InputNumber>
        );
      },
    },
    {
      accessorKey: "name",
      header: "דרגה",
      cell: (props) => {
        if (
          //adding input for TAMHIL in katzin rishoni and katzar
          tableData[props.row.index].id === 222221 ||
          tableData[props.row.index].id === 222224
        ) {
          const styleForCell = { width: "3.5vw", scale: "95%" };
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {tableData[props.row.index].name}
              {tableData[props.row.index].id === 222221 ? (
                <Tooltip
                  placement="topRight"
                  title="תמהיל- חישוב מחיר קצין ראשוני ממוצע ותמהיל"
                >
                  <InputNumber //katzin rishoni tamhil
                    style={styleForCell}
                    defaultValue={tableData[props.row.index].percentege.toFixed(
                      2
                    )}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(value) => {
                      //update katzin rishoni mekadem
                      reactTableP.options.meta.updateTableData(
                        props.row.index,
                        "percentege",
                        value
                      );
                      //update katzin katzar mekadem by 1-value
                      reactTableP.options.meta.updateTableData(
                        tableData.findIndex((e) => e.id === 222224),
                        "percentege",
                        1 - value
                      );
                      //update the total price of the "calculated avarage" value
                      reactTableP.options.meta.updateTableData(
                        tableData.findIndex((e) => e.id === 222220),
                        "price",
                        value * tableData.find((e) => e.id === 222221).price +
                          (1 - value) *
                            tableData.find((e) => e.id === 222224).price
                      );
                    }}
                  ></InputNumber>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="topRight"
                  title="תמהיל- חישוב מחיר קצין קצר ממוצע ותמהיל"
                >
                  <InputNumber //katzin katzar tamhil
                    style={styleForCell}
                    defaultValue={tableData[props.row.index].percentege.toFixed(
                      2
                    )}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(value) => {
                      //update katzin katzar mekadem
                      reactTableP.options.meta.updateTableData(
                        props.row.index,
                        "percentege",
                        value
                      );
                      //update katzin rishoni mekadem by 1-value
                      reactTableP.options.meta.updateTableData(
                        tableData.findIndex((e) => e.id === 222221),
                        "percentege",
                        1 - value
                      );
                      //update the total price of the "calculated avarage" value
                      reactTableP.options.meta.updateTableData(
                        tableData.findIndex((e) => e.id === 222220),
                        "price",
                        value * tableData.find((e) => e.id === 222224).price +
                          (1 - value) *
                            tableData.find((e) => e.id === 222221).price
                      );
                    }}
                  ></InputNumber>
                </Tooltip>
              )}
            </div>
          );
        }
        return <div>{tableData[props.row.index].name}</div>;
      },
    },
  ];

  return (
    <>
      {isLoading || tableData === undefined ? (
        <Spin></Spin>
      ) : (
        <>
          <GenericTable
            tableTitle={tableTitle}
            columnsForTable={columns}
            dataForTable={tableData}
            retTableP={retTableP}
            retTableV={retTableV}
          ></GenericTable>
        </>
      )}
    </>
  );
}
