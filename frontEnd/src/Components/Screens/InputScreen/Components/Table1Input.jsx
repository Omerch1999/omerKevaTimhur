import { InputNumber } from "antd";
import { mekadmi_haktza_level1 } from "../../../../data";
import GenericTable from "../../../Tables/GenericTable";

const columns = [
  {
    accessorKey: "name",
    header: "מקצוע",
    cell: (props) => {
      return (
        <div style={{ direction: "rtl", textAlign: "center" }}>
          {props.getValue()}
        </div>
      );
    },
  },
  {
    accessorKey: "lvl",
    header: "מקדם הקצאה",
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
];

export default function Table1Input() {
  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={mekadmi_haktza_level1}
      tableTitle={"שלב 1- מקדמי הקצאה עבור קבוצת מקדם"}
      isVertical={false}
      styleForRow={"body-table-row-input-1"}
    ></GenericTable>
  );
}
