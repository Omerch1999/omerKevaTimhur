import GenericTable from "../../../Tables/GenericTable";
import { TiubimIdaniimHaktzaData } from "../../../../data";
import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

export default function TableHakzaViewPoint() {
  const dateFormat = "DD-MM-YYYY";
  const [tiubimIdaniimHaktzaState, SetTiubimIdaniimHaktzaState] = useState(
    TiubimIdaniimHaktzaData
  );

  const columns = [
    {
      accessorKey: "name",
      header: 'קס"מ',
      cell: (props) => {
        return <div>{tiubimIdaniimHaktzaState[props.row.index].name}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "קטגוריה",
      cell: (props) => (
        <Input
          defaultValue={tiubimIdaniimHaktzaState[props.row.index].category}
        ></Input>
      ),
    },
    {
      accessorKey: "madorInChargeOf",
      header: "מדור אחראי",
      cell: (props) => (
        <Input
          defaultValue={
            tiubimIdaniimHaktzaState[props.row.index].madorInChargeOf
          }
        ></Input>
      ),
    },
    {
      accessorKey: "tiubExplanation",
      header: "הסבר טיוב",
      cell: (props) => (
        <TextArea
          style={{ direction: "rtl" }}
          defaultValue={
            tiubimIdaniimHaktzaState[props.row.index].tiubExplanation
          }
        ></TextArea>
      ),
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
            format={dateFormat}
          ></DatePicker>
        );
      },
    },
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
            format={dateFormat}
          ></DatePicker>
        );
      },
    },
    {
      accessorKey: "timeDiff",
      header: "מקדם זמן נדרש",
      cell: (props) => {
        return (
          <div style={{ textAlign: "center" }}>
            {TiubimIdaniimHaktzaData[props.row.index].timeDiff.toFixed(2)}
          </div>
        );
      },
    },
    {
      accessorKey: "comment",
      header: "הערה",
      cell: (props) => {
        return (
          <TextArea
            style={{ direction: "rtl" }}
            defaultValue={tiubimIdaniimHaktzaState[props.row.index].comment}
          ></TextArea>
        );
      },
    },
    { accessorKey: "kvutzotMinuiKatzinBahir", header: "קצין בכיר" },
    { accessorKey: "kvutzotMinuiKatzinMuvak", header: "קצין מובהק" },
    { accessorKey: "kvutzotMinuiKatzinRishoni", header: "קצין ראשוני" },
    { accessorKey: "kvutzotMinuiNagadMuvak", header: "נגד מובהק" },
    { accessorKey: "kvutzotMinuiNagadRishoni", header: "נגד ראשוני" },
    { accessorKey: "total", header: 'סה"כ' },
    { accessorKey: "munahiRishoni", header: "מונחי ראשוני" },
  ];

  return (
    <GenericTable
      columnsForTable={columns.reverse()}
      dataForTable={TiubimIdaniimHaktzaData}
    ></GenericTable>
  );
}
