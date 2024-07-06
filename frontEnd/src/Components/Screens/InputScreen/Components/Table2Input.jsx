import GenericTable from "../../../Tables/GenericTable";
import DropDownList from "../../../DropDownList";
import { InputNumber, Spin } from "antd";
import { useQueries } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

const tableTitle = "שלב 2- מקדם התייעלות";
export default function Table2Input() {
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
      accessorKey: "efficiencyTax",
      header: "% מס התייעלות",
      cell: (props) => {
        const styleForCell = { scale: "90%", width: "5.5vw" };
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].efficiencyTax}
            onChange={(e) => {
              reactTableP.options.meta.updateTableData(
                props.row.index,
                "efficiencyTax",
                e
              );
            }}
            min={0}
            max={100}
            step={0.05}
            addonAfter={"%"}
          ></InputNumber>
        );
      },
    },
    {
      accessorKey: "name",
      header: 'קס"מ',
      cell: (props) => {
        return <div>{tableData[props.row.index].name}</div>;
      },
    },
  ];

  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState();

  const queries = [
    {
      id: "getTableDataInput2Rows",
      url: "http://localhost:4000/mekadmi_itiaalut_level2",
    },
    {
      id: "getTableDataInput2Options",
      url: "http://localhost:4000/tax_darga_level2",
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
          columnsForTable={columns}
          dataForTable={resultsQueries[0].data.data}
          tableTitle={tableTitle}
          retTableP={retTableP}
          retTableV={retTableV}
        ></GenericTable>
      )}
    </>
  );
}
