import GenericTable from "../../../Tables/GenericTable";
import { InputNumber, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 6- תמהיל נגד קצר/ראשוני";

export default function Table6Input11() {
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
      header: "תמהיל",
      cell: (props) => {
        const styleForCell = { scale: "95%", width: "4vw" };
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].ratio}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "ratio",
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
      header: 'קס"מ',
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
    queryKey: ["tamhil_level6"],
    queryFn: () => FetchTableData("http://localhost:4000/tamhil_level6"),
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
            dataForTable={tableData}
            columnsForTable={columns}
            retTableP={retTableP}
            retTableV={retTableV}
          ></GenericTable>
        </>
      )}
    </>
  );
}
