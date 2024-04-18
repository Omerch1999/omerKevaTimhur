import GenericTable from "./GenericTable";
import { tamhil_level6 } from "../../data";
import Input from "../Input";
const columns = [
  {
    accessorKey: "ratio",
    header: "תמהיל",
    cell: (props) => {
      return <Input getValue={props.getValue}></Input>;
    },
  },

  {
    accessorKey: "name",
    header: 'קס"מ',
  },
];
export default function Table6Input11() {
  return (
    <GenericTable
      tableTitle={"שלב 6- תמהיל נגד קצר/ראשוני"}
      dataForTable={tamhil_level6}
      columnsForTable={columns}
    ></GenericTable>
  );
}
