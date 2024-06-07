import GenericTable from "../../../Tables/GenericTable";
import { Checkbox, DatePicker, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { Button } from "antd";
import AddLineModal from "./AddLineModal";

export default function TableHakzaViewPoint({ tableTitle, initialData }) {
  const dateFormat = "DD-MM-YYYY";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tiubimIdaniimDataState, SetTiubimIdaniimDataState] =
    useState(initialData);
  const [reactTableP, setReactTableP] = useState();
  //checkBoxes array, all false at the begining and it changes depend on marking
  const [checkboxesState, setCheckboxesState] = useState(
    Array(initialData.length).fill(false)
  );

  //return newLine from the modal form and send it to the generic table
  function retNewLine(val) {
    reactTableP.options.meta?.addRowToTableData(val);
  }

  //return genericTable POINTER for Meta Functions Calling
  function retTableP(val) {
    setReactTableP(val);
  }

  //return checkboxes State
  function retCheckBoxesV(val) {
    setCheckboxesState(val);
  }

  //return genericTable Value for updating this state table also
  function retTableV(val) {
    SetTiubimIdaniimDataState(val);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sumForFooter = (titleHeader) => {
    const sumCol = tiubimIdaniimDataState.reduce(
      (sum, currentV) => sum + currentV[titleHeader],
      0
    );
    return Math.round(sumCol * 100) / 100;
  };

  const columns = [
    {
      accessorKey: "checkbox",
      header: () => {
        return (
          <Checkbox
            checked={checkboxesState.every((value) => value === true)}
            onChange={(e) => {
              checkboxesState.forEach((element, index) => {
                reactTableP.options.meta?.updateCheckBoxes(
                  index,
                  e.target.checked
                );
              });
            }}
          ></Checkbox>
        );
      },
      cell: (props) => {
        return (
          <div style={{ margin: "10px" }}>
            <Checkbox
              checked={checkboxesState[props.row.index]}
              onChange={(e) => {
                console.log(e.target.checked);
                console.log(props.row.index);
                reactTableP.options.meta?.updateCheckBoxes(
                  props.row.index,
                  e.target.checked
                );
              }}
            ></Checkbox>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "nameKasm",
      header: 'קס"מ',
      cell: (props) => {
        return <div>{tiubimIdaniimDataState[props.row.index].nameKasm}</div>;
      },
    },
    {
      accessorKey: "category",
      header: "קטגוריה",
      cell: (props) => (
        //todo - update state
        <Input
          defaultValue={tiubimIdaniimDataState[props.row.index].category}
        ></Input>
      ),
    },
    {
      accessorKey: "madorInChargeOf",
      header: "מדור אחראי",
      cell: (props) => (
        //todo - update state
        <Input
          defaultValue={tiubimIdaniimDataState[props.row.index].madorInChargeOf}
        ></Input>
      ),
    },
    {
      accessorKey: "tiubExplanation",
      header: "הסבר טיוב",
      cell: (props) => (
        <TextArea
          style={{ direction: "rtl" }}
          defaultValue={tiubimIdaniimDataState[props.row.index].tiubExplanation}
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
      sortingFn: (rowA, rowB) => {
        const dateA = dayjs(dayjs(rowA.original.begda).format("DD-MM-YYYY"));
        const dateB = dayjs(dayjs(rowB.original.begda).format("DD-MM-YYYY"));
        return dateA - dateB;
      },
      cell: (props) => {
        return (
          <DatePicker
            defaultValue={dayjs(
              tiubimIdaniimDataState[props.row.index].begda,
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
      sortingFn: (rowA, rowB) => {
        const dateA = dayjs(dayjs(rowA.original.begda).format("DD-MM-YYYY"));
        const dateB = dayjs(dayjs(rowB.original.begda).format("DD-MM-YYYY"));
        return dateA - dateB;
      },
      cell: (props) => {
        return (
          <DatePicker
            defaultValue={dayjs(
              tiubimIdaniimDataState[props.row.index].endda,
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
            {tiubimIdaniimDataState[props.row.index].timeDiff.toFixed(2)}
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
            defaultValue={tiubimIdaniimDataState[props.row.index].comment}
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
              tiubimIdaniimDataState[props.row.index].kvutzotMinuiKatzinBahir
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
              tiubimIdaniimDataState[props.row.index].kvutzotMinuiKatzinMuvak
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
              tiubimIdaniimDataState[props.row.index].kvutzotMinuiKatzinRishoni
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
              tiubimIdaniimDataState[props.row.index].kvutzotMinuiNagadMuvak
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
              tiubimIdaniimDataState[props.row.index].kvutzotMinuiNagadRishoni
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
        return <div>{tiubimIdaniimDataState[props.row.index].total}</div>;
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
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          flexDirection: "row-reverse",
        }}
      >
        <Button onClick={showModal}>הוסף שורה</Button>
        <div>&nbsp;&nbsp;</div>
        <Button
          disabled={!checkboxesState.find((e) => e == true)}
          onClick={() => {
            console.log("Hi");
          }}
        >
          מחק שורות מסומנות
        </Button>
      </div>

      <AddLineModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        retNewLine={retNewLine}
      ></AddLineModal>

      <GenericTable
        tableTitle={tableTitle}
        columnsForTable={columns.reverse()}
        dataForTable={tiubimIdaniimDataState}
        retTableP={retTableP}
        retTableV={retTableV}
        retCheckBoxesV={retCheckBoxesV}
      ></GenericTable>
    </div>
  );
}
