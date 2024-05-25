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

  /**returns the total column if one of the five rows of all types of ktzinim and nagadim
   * @param {number} indexC - the index (row number).
   * @returns {number} - sum of all ktzinim and nagadim sum
   */
  function calcTotalColumn(indexC) {
    const sum =
      tiubimIdaniimHaktzaState[indexC].kvutzotMinuiKatzinBahir +
      tiubimIdaniimHaktzaState[indexC].kvutzotMinuiKatzinMuvak +
      tiubimIdaniimHaktzaState[indexC].kvutzotMinuiKatzinRishoni +
      tiubimIdaniimHaktzaState[indexC].kvutzotMinuiNagadMuvak +
      tiubimIdaniimHaktzaState[indexC].kvutzotMinuiNagadRishoni;
    return sum;
  }

  /**
   * updates the state after changing the cell
   * @param {number} indexC - the index (row number).
   * @param {string} keyC - the column you want to update.
   * @param {*} valueC - the value that will be set at indexC row, at KeyC column
   */
  function SetTiubimIdaniimHaktzaStateHandler(indexC, keyC, valueC) {
    SetTiubimIdaniimHaktzaState((prev) => {
      const updatedTiubimIdaniimHaktza = prev.map((item, index) => {
        //if the user chages the rows of the 5 types it effects the "total" column
        if (index === indexC) {
          if (
            keyC === "kvutzotMinuiKatzinBahir" ||
            keyC === "kvutzotMinuiKatzinMuvak" ||
            keyC === "kvutzotMinuiKatzinRishoni" ||
            keyC === "kvutzotMinuiNagadMuvak" ||
            keyC === "kvutzotMinuiNagadRishoni"
          ) {
            //sumTotal calculate the total of 5 columns and adds the delta between the input (valueC) and the prev (item[keyC])
            const sumTotal = calcTotalColumn(indexC) + valueC - item[keyC];
            return { ...item, [keyC]: valueC, total: sumTotal };
          }
          //if the user changes begda or endda it effects the timeDiff column
          if (keyC === "begda" || keyC === "endda") {
            let begdaT, enddaT;
            if (keyC === "begda") {
              begdaT = new Date(dayjs(valueC, dateFormat)).getTime();
              enddaT = new Date(dayjs(item.endda, dateFormat)).getTime();
            } else {
              //keyC === "endda"
              begdaT = new Date(dayjs(item.begda, dateFormat)).getTime();
              enddaT = new Date(dayjs(valueC, dateFormat)).getTime();
            }
            const diffT = (enddaT - begdaT) / 1000 / 31556926;
            return { ...item, [keyC]: valueC, timeDiff: diffT };
          }
          return { ...item, [keyC]: valueC };
        }
        return item;
      });
      console.log(updatedTiubimIdaniimHaktza);

      return updatedTiubimIdaniimHaktza;
    });
  }

  //calculates total of column in the footer
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
            showToday={false}
            allowClear={false}
            format={dateFormat}
            onChange={(date, dateString) => {
              SetTiubimIdaniimHaktzaStateHandler(
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
              SetTiubimIdaniimHaktzaStateHandler(
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
          <Form.Item label="מדור אחראי" name="madorInChargeOf">
            <DropDownList></DropDownList>
          </Form.Item>
          <Form.Item label="הסבר טיוב:" name="Input">
            <TextArea />
          </Form.Item>
          <Form.Item label="תאריך התחלה" name="begda">
            <DatePicker format={dateFormat}></DatePicker>
          </Form.Item>
          <Form.Item label="תאריך סיום" name="enda">
            <DatePicker format={dateFormat}></DatePicker>
          </Form.Item>
        </Form>
      </Modal>

      <GenericTable
        tableTitle={"טיובים ידניים - הקצאה"}
        columnsForTable={columns.reverse()}
        dataForTable={tiubimIdaniimHaktzaState}
      ></GenericTable>
    </div>
  );
}
