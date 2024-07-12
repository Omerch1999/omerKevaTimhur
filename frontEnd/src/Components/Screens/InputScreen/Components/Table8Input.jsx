import { InputNumber } from "antd";
import GenericTable from "../../../Tables/GenericTable";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 8- מקדם הקצאה ממוצע לדרגה";

export default function Table8Input() {
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
      header: "מקדם",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={tableData[props.row.index].ratio}
            min={0}
            max={1}
            step={0.01}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "ratio",
                e
              );
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

  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState();
  const {
    data: initalFetchedData,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["avarage_ratio_lvl8"],
    queryFn: () => FetchTableData("http://localhost:4000/avarage_ratio_lvl8"),
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
            dataForTable={tableData}
            columnsForTable={columns}
            tableTitle={tableTitle}
            retTableP={retTableP}
            retTableV={retTableV}
          ></GenericTable>
        </>
      )}
    </>
  );
}
