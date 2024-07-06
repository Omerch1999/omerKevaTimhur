import { InputNumber } from "antd";
import GenericTable from "../../../Tables/GenericTable";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useContext, useEffect, useState } from "react";
import { SaveButtonContext } from "../../../../Contexts/SaveButtonInputContext";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 1- מקדמי הקצאה עבור קבוצת מקדם";

export default function Table1Input() {
  const { logForCheck } = useContext(SaveButtonContext);

  //get pointer to the React table
  function retTableP(val) {
    setReactTableP(val);
  }

  //get the data from the React table
  function retTableV(val) {
    setTableData(val);
  }

  const columns = [
    {
      accessorKey: "name",
      header: "מקצוע",
      cell: (props) => {
        return (
          <div style={{ direction: "rtl", textAlign: "center" }}>
            {tableData[props.row.index].name}
          </div>
        );
      },
    },
    {
      accessorKey: "lvl",
      header: "מקדם הקצאה",
      cell: (props) => {
        const styleForCell = { scale: "85%" };
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].lvl}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "lvl",
                e
              );
            }}
            min={0}
            max={1}
            step={0.01}
          ></InputNumber>
        );
      },
    },
  ];

  //pointer for the table to get the meta functions
  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState();
  const {
    data: initalFetchedData,
    isLoading,
    isError,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ["getTableDataInput1"],
    queryFn: () =>
      FetchTableData("http://localhost:4000/mekadmi_haktza_level1"),
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
  return (
    <>
      {isLoading || tableData === undefined ? (
        <Spin></Spin>
      ) : (
        <>
          <GenericTable
            columnsForTable={columns}
            dataForTable={tableData}
            tableTitle={tableTitle}
            retTableP={retTableP}
            retTableV={retTableV}
            isVertical={false}
            styleForRow={"body-table-row-input-1"}
          ></GenericTable>
        </>
      )}
    </>
  );
}
