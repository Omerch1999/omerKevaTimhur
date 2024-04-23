import { mekadmi_itiaalut_level2, tax_darga_level2 } from "../../data";
import GenericTable from "./GenericTable";
import Input from "../Input";
import DropDownList from "../DropDownList";
import { InputNumber } from "antd";

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

export default function Table2Input() {
  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={mekadmi_itiaalut_level2}
      tableTitle={"שלב 2- מקדם התייעלות"}
    ></GenericTable>
  );
}
