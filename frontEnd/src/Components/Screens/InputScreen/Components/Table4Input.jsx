import GenericTable from "../../../Tables/GenericTable";
import { compare_options_level4 } from "../../../../data";

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
    enableSorting: false,
    cell: (props) => (
      <div style={{ textAlign: "center" }}>{props.getValue()}</div>
    ),
  },
  { accessorKey: "meaning", header: "משמעות", enableSorting: false },
  {
    accessorKey: "option",
    header: () => {
      return <div>{"תוצאה מתקבלת"}</div>;
    },
    enableSorting: false,
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
