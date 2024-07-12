import GenericTable from "../../../Tables/GenericTable";
import { useEffect, useState } from "react";
import { InputNumber, Tooltip, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = 'מחירון דרגות ח"א';

export default function TablePriceAirFrceInput() {
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
    queryKey: ["costs_airforce"],
    queryFn: () => FetchTableData("http://localhost:4000/costs_airforce"),
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

  const columns = [
    {
      accessorKey: "price",
      header: "מחיר",
      cell: (props) => {
        const styleForCell = { width: "6.7vw", scale: "95%" };
        const styleForCellGreen = {
          width: "6.7vw",
          scale: "95%",
          border: "2px solid green",
        };
        if (props.row.original.id === 222230) {
          //calculated fild
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - ממוצע מחיר נגד קצר וראשוני"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        return (
          //regular input fild
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].price}
            min={0}
            max={1000000}
            step={1}
            addonAfter={"₪"}
            onChange={(value, s) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "price",
                value
              );
              if ([222232, 222231].includes(props.row.original.id)) {
                //if changed nagad katzar or nagad rishoni update the calculated value
                //the values for the meta function is the index and not the id so we need
                //to find the index of calculated value
                reactTableP.options.meta.updateTableData(
                  tableData.findIndex((e) => e.id === 222230),
                  "price",
                  (tableData.find((e) => e.id === 222232).price +
                    tableData.find((e) => e.id === 222231).price +
                    value -
                    tableData.find((e) => e.id === props.row.original.id)
                      .price) /
                    2
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
      cell: (props) => tableData[props.row.index].name,
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
