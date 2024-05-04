import { InputNumber } from "antd";
import { avarage_ratio_lvl8 } from "../../../../data";
import GenericTable from "../../../Tables/GenericTable";
export default function Table8Input() {
  const columns = [
    {
      accessorKey: "ratio",
      header: "מקדם",
      cell: (props) => {
        return (
          <InputNumber
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
    },
  ];
  return (
    <GenericTable
      dataForTable={avarage_ratio_lvl8}
      columnsForTable={columns}
      tableTitle={"מקדם הקצאה ממוצע לדרגה"}
    ></GenericTable>
  );
}
