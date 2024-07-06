import { tax_darga_level2 } from "../../../../data";
import GenericTable from "../../../Tables/GenericTable";
import DropDownList from "../../../DropDownList";
import { InputNumber, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

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
            optionsZ={tax_darga_level2}
            defaultValueZ={props.getValue()}
            styleZ={styleForCell}
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
            defaultValue={props.getValue()}
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
    },
  ];

  const fetchTableData = async () => {
    const response = await axios.get(
      "http://localhost:4000/mekadmi_itiaalut_level2"
    );
    return response;
  };

  const fetchTableData2 = async () => {
    const response = await axios.get(
      "http://localhost:4000/mekadmi_haktza_level1"
    );
    return response;
  };

  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getTableData2"],
    queryFn: fetchTableData,
  });

  // const {
  //   data: data2,
  //   isLoading: isLoading2,
  //   isError: isError2,
  // } = useQuery({
  //   queryKey: ["getTableData2.1"],
  //   queryFn: fetchTableData,
  // });

  if (isError) {
    return <div>error in get Data table 1 input</div>;
  }
  return (
    <>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <GenericTable
          columnsForTable={columns}
          dataForTable={data.data}
          tableTitle={"שלב 2- מקדם התייעלות"}
        ></GenericTable>
      )}
    </>
  );
}
