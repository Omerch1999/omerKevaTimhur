import GenericTable from "../../../Tables/GenericTable";
import { TiubimIdaniimHaktzaData } from "../../../../data";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextArea from "antd/es/input/TextArea";

export default function TableHakzaViewPoint() {
  const dateFormat = "YYYY-MM-DD";

  const columns = [
    {
      accessorKey: "enda",
      header: "תאריך סיום",
      cell: (props) => {
        return (
          <DatePicker
            defaultValue={dayjs(
              TiubimIdaniimHaktzaData[props.row.index].enda,
              dateFormat
            )}
            format={"DD-MM-YYYY"}
          ></DatePicker>
        );

        //return <div>{datez.toLocaleDateString("en-GB")}</div>;
      },
    },
    {
      accessorKey: "begda",
      header: "תאריך התחלה",
      cell: (props) => {
        return (
          <DatePicker
            defaultValue={dayjs(
              TiubimIdaniimHaktzaData[props.row.index].begda,
              dateFormat
            )}
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
        <TextArea
          style={{ direction: "rtl" }}
          defaultValue={props.getValue()}
        ></TextArea>
        //<div style={{ textAlign: "center" }}>{props.getValue()}</div>
      ),
    },
    {
      accessorKey: "madorInChargeOf",
      header: "מדור אחראי",
      cell: (props) => <Input></Input>,
    },
    {
      accessorKey: "category",
      header: "קטגוריה",
      cell: (props) => <Input></Input>,
    },
    { accessorKey: "name", header: 'קס"מ' },
  ];

  return (
    <GenericTable
      columnsForTable={columns}
      dataForTable={TiubimIdaniimHaktzaData}
    ></GenericTable>
  );
}
