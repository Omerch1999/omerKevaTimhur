import GenericTable from "../../../Tables/GenericTable";
import { TiubimIdaniimHaktzaData, bsisim_list } from "../../../../data";
import { DatePicker, Form, Input, InputNumber } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { Button, Modal } from "antd";
import DropDownList from "../../../DropDownList";

export default function TableHakzaViewPoint() {
  const dateFormat = "DD-MM-YYYY";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tiubimIdaniimHaktzaState, SetTiubimIdaniimHaktzaState] = useState(
    TiubimIdaniimHaktzaData
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function SetTiubimIdaniimHaktzaStateHandler(indexC, keyC, valueC) {
    const updatedTiubimIdaniimHaktza = tiubimIdaniimHaktzaState.map(
      (item, index) => {
        if (index === indexC) {
          return { ...item, [keyC]: valueC };
        }
        return item;
      }
    );
    SetTiubimIdaniimHaktzaState(updatedTiubimIdaniimHaktza);
    console.log(updatedTiubimIdaniimHaktza);
  }

  const sumForFooter = (titleHeader) => {
    const sumCol = tiubimIdaniimHaktzaState.reduce(
      (sum, currentV) => sum + currentV[titleHeader],
      0
    );
    return sumCol;
  };

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
          onBlur={(e) => {
            SetTiubimIdaniimHaktzaStateHandler(
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
              tiubimIdaniimHaktzaState[props.row.index].enda,
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
            onChange={(e) =>
              SetTiubimIdaniimHaktzaStateHandler(
                props.row.index,
                "kvutzotMinuiKatzinBahir",
                e
              )
            }
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
              SetTiubimIdaniimHaktzaStateHandler(
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
              SetTiubimIdaniimHaktzaStateHandler(
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
              SetTiubimIdaniimHaktzaStateHandler(
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
              SetTiubimIdaniimHaktzaStateHandler(
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
      header: "מונחי ראשוני",
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

      <Modal
        title="הוספת שורה"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form style={{ direction: "rtl" }}>
          <Form.Item label='קס"מ' name="Kasm">
            <DropDownList optionsZ={bsisim_list}></DropDownList>
          </Form.Item>
          <Form.Item label="קטגוריה" name="category">
            <DropDownList></DropDownList>
          </Form.Item>
          <Form.Item label="הסבר טיוב:" name="Input">
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>

      <GenericTable
        tableTitle={"טיובים ידניים - הקצאה"}
        columnsForTable={columns.reverse()}
        dataForTable={TiubimIdaniimHaktzaData}
      ></GenericTable>
    </div>
  );
}
