import GenericTable from "./GenericTable";
import { tamhil_level6 } from "../../data";
import Input from "../Input";
import { InputNumber } from "antd";
const columns = [
  {
    accessorKey: "ratio",
    header: "תמהיל",
    cell: (props) => {
      const styleForCell = { scale: "90%", width: "4vw" };
      return (
        <InputNumber
          style={styleForCell}
          defaultValue={props.getValue()}
          min={0}
          max={1}
          step={0.01}
        ></InputNumber>
      );
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
