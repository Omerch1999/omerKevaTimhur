import { mekadmi_haktza_level1 } from "../../data";
import Input from "../Input";

import GenericTable from "./GenericTable";
const columns = [
  {
    accessorKey: "lvl",
    header: "מקדם הקצאה",
    cell: (props) => {
      return (
        <Input getValue={props.getValue} minI={0} maxI={1} setpI={0.01}></Input>
      );
    },
  },
  {
    accessorKey: "name",
    header: "מקצוע",
  },
];

export default function Table1Input() {
  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={mekadmi_haktza_level1}
      tableTitle={"שלב 1- מקדמי הקצאה עבור קבוצת מקדם"}
    ></GenericTable>
  );
}
