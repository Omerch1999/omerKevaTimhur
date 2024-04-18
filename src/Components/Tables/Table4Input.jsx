import GenericTable from "./GenericTable";
import { compare_options_level4 } from "../../data";

const columns = [
  {
    accessorKey: "ratio",
    header: () => {
      return <>יחס- מובהק אל מול ראשונZי</>;
    },
  },
  { accessorKey: "meaning", header: "משמעות" },
  {
    accessorKey: "option",
    header: "תוצאה מתקבלת",
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
