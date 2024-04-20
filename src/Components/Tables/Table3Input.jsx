import GenericTable from "./GenericTable";
import { model_segel_tax_level3 } from "../../data";
import Input from "../Input";

const style1 = { width: "2.2vw" };
const columns = [
  {
    accessorKey: "tax",
    header: "מס התייעלות",
    cell: (props) => {
      return (
        <Input
          getValue={props.getValue()}
          minI={0}
          maxI={1}
          setpI={0.01}
          addLogo="%"
          styleI={style1}
        ></Input>
      );
    },
  },
  {
    accessorKey: "name",
    header: "דרגה",
  },
];
export default function Table3Input() {
  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={model_segel_tax_level3}
      tableTitle={"שלב 3- מודל הסגל"}
    ></GenericTable>
  );
}
