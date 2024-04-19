import DropDownList from "../DropDownList";
import { tax_darga_level6, tax_targeted_percentage_level6 } from "../../data";
import GenericTable from "./GenericTable";
const columns = [
  {
    accessorKey: "tax_darga",
    header: "קנס בדרגה",
    cell: (props) => {
      return <DropDownList optionsZ={tax_darga_level6}></DropDownList>;
    },
  },
  {
    accessorKey: "name",
    header: 'קס"מ',
  },
];

export default function Table6Input12() {
  return (
    <GenericTable
      tableTitle={"שלב 6- קנס יעדי מצבות"}
      dataForTable={tax_targeted_percentage_level6}
      columnsForTable={columns}
    ></GenericTable>
  );
}
