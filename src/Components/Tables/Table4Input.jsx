import GenericTable from "./GenericTable";
import { compare_options_level4 } from "../../data";

const columns = [
  {
    accessorKey: "ratio",
    header: () => {
      return (
        <div style={{ whiteSpace: "pre-wrap" }}>
          {"- יחס  \n מובהק אל מול ראשוני"}
        </div>
      );
    },
    cell: (props) => (
      <div style={{ textAlign: "center" }}>{props.getValue()}</div>
    ),
  },
  { accessorKey: "meaning", header: "משמעות" },
  {
    accessorKey: "option",
    header: () => {
      return <div style={{ whiteSpace: "pre-wrap" }}>{"תוצאה מתקבלת"}</div>;
    },
    cell: (props) => {
      return <div style={{ textAlign: "center" }}>{props.getValue()}</div>;
    },
  },
];
export default function Table4Input() {
  return (
    <GenericTable
      tableTitle={"שלב 4- השוואה"}
      columnsForTable={columns}
      dataForTable={compare_options_level4}
    ></GenericTable>
  );
}
