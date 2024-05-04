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
        console.log(TiubimIdaniimHaktzaData[0].begda);
        const dateFormat = "YYYY-MM-DD";
        dayjs.extend(customParseFormat);
        return (
          <DatePicker
            defaultValue={dayjs(TiubimIdaniimHaktzaData[0].begda, dateFormat)}
            format={"DD-MM-YYYY"}
          ></DatePicker>
        );

        //return <div>{datez.toLocaleDateString("en-GB")}</div>;
      },
    },
    {
      accessorKey: "tiubExplanation",
      header: "הסבר טיוב",
      cell: (props) => (
        <div style={{ textAlign: "center" }}>{props.getValue()}</div>
      ),
    },
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
