import GenericTable from "../../../Tables/GenericTable";
import { TiubimIdaniimHaktzaData } from "../../../../data";
import { DatePicker, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Button } from "antd";
import AddLineModal from "./AddLineModal";

export default function TableHakzaViewPoint({ tableTitle }) {
  const dateFormat = "DD-MM-YYYY";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tiubimIdaniimHaktzaState, SetTiubimIdaniimHaktzaState] = useState(
    TiubimIdaniimHaktzaData
  );
  const [reactTableP, setReactTableP] = useState();

  function retNewLine(val) {
    //return newLine from the modal form and send it to the generic table
    reactTableP.options.meta?.addRowToTableData(val);
  }

  function retTableP(val) {
    //return genericTable POINTER for Meta Functions Calling
    setReactTableP(val);
  }

  function retTableV(val) {
    //return genericTable Value for updating this state table also
    SetTiubimIdaniimHaktzaState(val);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sumForFooter = (titleHeader) => {
    const sumCol = tiubimIdaniimHaktzaState.reduce(
      (sum, currentV) => sum + currentV[titleHeader],
      0
    );
    return sumCol;
  };

  const columns = [
    {
      accessorKey: "nameKasm",
      header: 'קס"מ',
      cell: (props) => {
        return <div>{tiubimIdaniimHaktzaState[props.row.index].nameKasm}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "קטגוריה",
      cell: (props) => (
        //todo - update state
        <Input
          defaultValue={tiubimIdaniimHaktzaState[props.row.index].category}
        ></Input>
      ),
    },
    {
      accessorKey: "madorInChargeOf",
      header: "מדור אחראי",
      cell: (props) => (
        //todo - update state
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
          onBlur={(e) => {
            reactTableP.options.meta?.updateTableData(
              props.row.index,
              "tiubExplanation",
              e.target.value
            );
          }}
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
              tiubimIdaniimHaktzaState[props.row.index].begda,
              dateFormat
            )}
            showToday={false}
            allowClear={false}
            format={dateFormat}
            onChange={(date, dateString) => {
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "begda",
                dateString
              );
            }}
          ></DatePicker>
        );
      },
    },
    {
      accessorKey: "endda",
      header: "תאריך סיום",
      cell: (props) => {
        return (
          <DatePicker
            defaultValue={dayjs(
              tiubimIdaniimHaktzaState[props.row.index].endda,
              dateFormat
            )}
            showToday={false}
            allowClear={false}
            format={dateFormat}
            onChange={(date, dateString) => {
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "endda",
                dateString
              );
            }}
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
            {tiubimIdaniimHaktzaState[props.row.index].timeDiff.toFixed(2)}
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
            onBlur={(e) => {
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "comment",
                e.target.value
              );
            }}
          ></TextArea>
        );
      },
    },
    {
      accessorKey: "kvutzotMinuiKatzinBahir",
      header: "קצין בכיר",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={
              tiubimIdaniimHaktzaState[props.row.index].kvutzotMinuiKatzinBahir
            }
            onChange={(e) => {
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "kvutzotMinuiKatzinBahir",
                e
              );
            }}
          ></InputNumber>
        );
      },
      footer: () => {
        return sumForFooter("kvutzotMinuiKatzinBahir");
      },
    },
    {
      accessorKey: "kvutzotMinuiKatzinMuvak",
      header: "קצין מובהק",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={
              tiubimIdaniimHaktzaState[props.row.index].kvutzotMinuiKatzinMuvak
            }
            onChange={(e) =>
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "kvutzotMinuiKatzinMuvak",
                e
              )
            }
          ></InputNumber>
        );
      },
      footer: () => {
        return sumForFooter("kvutzotMinuiKatzinMuvak");
      },
    },
    {
      accessorKey: "kvutzotMinuiKatzinRishoni",
      header: "קצין ראשוני",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={
              tiubimIdaniimHaktzaState[props.row.index]
                .kvutzotMinuiKatzinRishoni
            }
            onChange={(e) =>
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "kvutzotMinuiKatzinRishoni",
                e
              )
            }
          ></InputNumber>
        );
      },
      footer: () => {
        return sumForFooter("kvutzotMinuiKatzinRishoni");
      },
    },
    {
      accessorKey: "kvutzotMinuiNagadMuvak",
      header: "נגד מובהק",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={
              tiubimIdaniimHaktzaState[props.row.index].kvutzotMinuiNagadMuvak
            }
            onChange={(e) =>
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "kvutzotMinuiNagadMuvak",
                e
              )
            }
          ></InputNumber>
        );
      },
      footer: () => {
        return sumForFooter("kvutzotMinuiNagadMuvak");
      },
    },
    {
      accessorKey: "kvutzotMinuiNagadRishoni",
      header: "נגד ראשוני",
      cell: (props) => {
        return (
          <InputNumber
            defaultValue={
              tiubimIdaniimHaktzaState[props.row.index].kvutzotMinuiNagadRishoni
            }
            onChange={(e) =>
              reactTableP.options.meta?.updateTableData(
                props.row.index,
                "kvutzotMinuiNagadRishoni",
                e
              )
            }
          ></InputNumber>
        );
      },
      footer: () => {
        return sumForFooter("kvutzotMinuiNagadRishoni");
      },
    },
    {
      accessorKey: "total",
      header: 'סה"כ',
      cell: (props) => {
        return <div>{tiubimIdaniimHaktzaState[props.row.index].total}</div>;
      },
      footer: () => {
        return sumForFooter("total");
      },
    },
    {
      accessorKey: "munahiRishoni",
      header: "מונחי ראשוני -TODO",
      footer: () => {
        return sumForFooter("munahiRishoni");
      },
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={showModal}>הוסף שורה</Button>
      </div>

      <AddLineModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        retNewLine={retNewLine}
      ></AddLineModal>

      <GenericTable
        tableTitle={tableTitle}
        columnsForTable={columns.reverse()}
        dataForTable={tiubimIdaniimHaktzaState}
        retTableP={retTableP}
        retTableV={retTableV}
      ></GenericTable>
    </div>
  );
}
