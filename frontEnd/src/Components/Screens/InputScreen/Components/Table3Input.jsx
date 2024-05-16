import GenericTable from "../../../Tables/GenericTable";
import { model_segel_tax_level3 } from "../../../../data";
import { InputNumber } from "antd";

const columns = [
  {
    accessorKey: "tax",
    header: "מס התייעלות",
    enableSorting: false,
    cell: (props) => {
      const styleForCell = { scale: "85%" };
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
    header: "דרגה",
    enableSorting: false,
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
