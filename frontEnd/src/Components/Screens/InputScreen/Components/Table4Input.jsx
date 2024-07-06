import GenericTable from "../../../Tables/GenericTable";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 4- השוואה";
export default function Table4Input() {
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
      accessorKey: "ratio",
      header: () => {
        return (
          <div style={{ whiteSpace: "pre-wrap" }}>
            {"- יחס  \n מובהק אל מול ראשוני"}
          </div>
        );
      },
      enableSorting: false,
      cell: (props) => (
        <div style={{ textAlign: "center" }}>
          {tableData[props.row.index].ratio}
        </div>
      ),
    },
    {
      accessorKey: "meaning",
      header: "משמעות",
      enableSorting: false,
      cell: (props) => tableData[props.row.index].meaning,
    },
    {
      accessorKey: "option",
      header: () => {
        return <div>{"תוצאה מתקבלת"}</div>;
      },
      enableSorting: false,
      cell: (props) => {
        return (
          <div style={{ textAlign: "center" }}>
            {tableData[props.row.index].option}
          </div>
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
  } = useQuery({
    queryKey: ["compare_options_level4"],
    queryFn: () =>
      FetchTableData("http://localhost:4000/compare_options_level4"),
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
