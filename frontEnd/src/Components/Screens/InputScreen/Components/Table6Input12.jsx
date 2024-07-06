import DropDownList from "../../../DropDownList";
import GenericTable from "../../../Tables/GenericTable";
import { Spin } from "antd";
import { useQueries } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 6- קנס יעדי מצבות";
export default function Table6Input12() {
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
      accessorKey: "tax_darga",
      header: "קנס בדרגה",
      cell: (props) => {
        const styleForCell = { scale: "90%", width: "6vw" };
        return (
          <DropDownList
            optionsZ={resultsQueries[1].data.data}
            defaultValueZ={tableData[props.row.index].tax_darga}
            styleZ={styleForCell}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "tax_darga",
                e
              );
            }}
          ></DropDownList>
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

  const queries = [
    {
      id: "getTableDataInput6Rows",
      url: "http://localhost:4000/tax_targeted_percentage_level6",
    },
    {
      id: "getTableDataInput6Options",
      url: "http://localhost:4000/tax_darga_level6",
    },
  ];
  const resultsQueries = useQueries({
    queries: queries.map((query) => ({
      queryKey: [query.id],
      queryFn: () => FetchTableData(query.url),
    })),
  });

  useEffect(() => {
    //update after fetch completed the state that holds the data
    if (resultsQueries[0].isFetched && !resultsQueries[0].isError) {
      setTableData(resultsQueries[0].data.data);
    }
  }, [resultsQueries[0].isFetched]);

  if (resultsQueries[0].isError || resultsQueries[1].isError) {
    return ErrorFechTableData(tableTitle);
  }

  return (
    <>
      {resultsQueries[0].isLoading ||
      resultsQueries[1].isLoading ||
      tableData === undefined ? (
        <Spin></Spin>
      ) : (
        <GenericTable
          tableTitle={tableTitle}
          dataForTable={tableData}
          columnsForTable={columns}
          retTableP={retTableP}
          retTableV={retTableV}
        ></GenericTable>
      )}
    </>
  );
}
