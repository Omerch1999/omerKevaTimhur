import GenericTable from "../../../Tables/GenericTable";
import { TiubimIdaniimHaktzaData } from "../../../../data";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default function TableHakzaViewPoint() {
  const columns = [
    {
      accessorKey: "begda",
      header: "תאריך התחלה",
      cell: (props) => {
        const datezz = new Date(props.getValue());
        console.log(datezz);
        const dateFormat = "YYYY-MM-DD";
        dayjs.extend(customParseFormat);
        return (
          <DatePicker
            defaultValue={dayjs("2019-09-03", dateFormat)}
          ></DatePicker>
        );

        //return <div>{datez.toLocaleDateString("en-GB")}</div>;
      },
    },
    { accessorKey: "tiubExplanation", header: "הסבר טיוב" },
    { accessorKey: "madorInChargeOf", header: "מדור אחראי" },
    { accessorKey: "category", header: "קטגוריה" },
    { accessorKey: "name", header: "כותרת" },
  ];

  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={TiubimIdaniimHaktzaData}
    ></GenericTable>
  );
}
