import { InputNumber } from "antd";
import GenericTable from "../../../Tables/GenericTable";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Table1Input() {
  function retTableP(val) {
    setReactTableP(val);
  }

  function retTableV(val) {
    setTableData(val);
    console.log(val);
    debugger;
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

  const fetchTableData = async () => {
    const response = await axios.get(
      "http://localhost:4000/mekadmi_haktza_level1"
    );
    return response;
  };

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
    queryFn: fetchTableData,
  });

  useEffect(() => {
    if (isFetched) {
      setTableData(initalFetchedData.data);
    }
  }, [isFetched]);

  if (isError) {
    return <div>error in get Data table 1 input</div>;
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
            tableTitle={"שלב 1- מקדמי הקצאה עבור קבוצת מקדם"}
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
