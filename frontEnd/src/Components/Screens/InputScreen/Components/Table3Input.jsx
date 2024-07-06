import GenericTable from "../../../Tables/GenericTable";
import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 3- מודל הסגל";
export default function Table3Input() {
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
      accessorKey: "tax",
      header: "מס התייעלות",
      enableSorting: false,
      cell: (props) => {
        const styleForCell = { scale: "85%" };
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].tax}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "tax",
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
    {
      accessorKey: "name",
      header: "דרגה",
      enableSorting: false,
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
    queryKey: ["model_segel_tax_level3"],
    queryFn: () =>
      FetchTableData("http://localhost:4000/model_segel_tax_level3"),
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
            dataForTable={initalFetchedData.data}
            tableTitle={tableTitle}
            retTableP={retTableP}
            retTableV={retTableV}
          ></GenericTable>
        </>
      )}
    </>
  );
}
