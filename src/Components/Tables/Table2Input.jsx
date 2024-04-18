import { mekadmi_itiaalut_level2, tax_darga_level2 } from "../../data";
import GenericTable from "./GenericTable";
import Input from "../Input";
import DropDownList from "../DropDownList";

const columns = [
  {
    accessorKey: "tax_darga",
    header: "קנס בדרגה",
    cell: (props) => {
      return <DropDownList optionsZ={tax_darga_level2}></DropDownList>;
    },
  },
  {
    accessorKey: "efficiencyTax",
    header: "מס התייעלות",
    cell: (props) => {
      return (
        <Input
          getValue={props.getValue}
          minI={0}
          maxI={100}
          setpI={0.05}
        ></Input>
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
