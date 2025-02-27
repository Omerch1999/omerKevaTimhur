import { Modal, Form, DatePicker, InputNumber, Button } from "antd";
import DropDownList from "../../../DropDownList";
import { bsisim_list } from "../../../../data";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";

const dateFormat = "DD-MM-YYYY";

export default function AddLineModal({
  isModalOpen,
  handleCancel,
  retNewLine,
}) {
  //handles form data (not in use)
  const [form] = Form.useForm();

  //handles dates changes from date picker and calc the difference
  const [dateDiffToCalc, setDateDiffToCalc] = useState({
    begda: dayjs().startOf("day"),
    endda: dayjs().startOf("day").add(1, "day"),
    timeDiff: dayjs().diff(dayjs().subtract(1, "day"), "years", true),
  });

  //handles amount changes from NUMBERINPUTS and calc the SUM
  const [totalToCalc, setTotalToCalc] = useState({
    kvutzotMinuiKatzinBahir: 0,
    kvutzotMinuiKatzinMuvak: 0,
    kvutzotMinuiKatzinRishoni: 0,
    kvutzotMinuiNagadMuvak: 0,
    kvutzotMinuiNagadRishoni: 0,
    total: 0,
    munahiRishoni: 0,
  });

  function DateDiffCalcHandler(date, dateType) {
    setDateDiffToCalc((prev) => {
      const tempDate = { ...prev };

      if (dateType === "begda") {
        tempDate.begda = date;
        if (date.isAfter(tempDate.endda) || date.isSame(tempDate.endda)) {
          tempDate.endda = date.add(1, "day");
        }
      } else if (dateType === "endda") {
        tempDate.endda = date;
      }
      tempDate.timeDiff = tempDate.endda.diff(tempDate.begda, "years", true);
      return tempDate;
    });
  }

  function TotalToCalcHandler(amount, KvutzatMinuiType) {
    setTotalToCalc((prev) => {
      const tempTotal = {
        ...prev,
        total:
          prev.kvutzotMinuiKatzinBahir +
          prev.kvutzotMinuiKatzinMuvak +
          prev.kvutzotMinuiKatzinRishoni +
          prev.kvutzotMinuiNagadMuvak +
          prev.kvutzotMinuiNagadRishoni -
          prev[KvutzatMinuiType] +
          amount,
        [KvutzatMinuiType]: amount,
      };
      return tempTotal;
    });
  }

  //onFinish take all the data from the FORM
  const onFinish = (values) => {
    const valuesNew = {
      ...values,
      total: totalToCalc.total,
      timeDiff: dateDiffToCalc.timeDiff,
      id: bsisim_list.find((basis) => basis.name === values.nameKasm).id,
    };
    retNewLine(valuesNew);
    handleCancel();
  };

  const initialValues = {
    begda: dateDiffToCalc.begda,
    endda: dateDiffToCalc.endda,
    timeDiff: dateDiffToCalc.timeDiff,
    total: 0,
    munahiRishoni: 0,
  };

  return (
    <Modal
      title="הוספת שורה"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[]}
    >
      <Form
        initialValues={initialValues}
        style={{ direction: "rtl" }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='קס"מ'
          name="nameKasm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DropDownList optionsZ={bsisim_list}></DropDownList>
        </Form.Item>
        <Form.Item label="קטגוריה" name="category">
          <DropDownList></DropDownList>
        </Form.Item>
        <Form.Item label="מדור אחראי" name="madorInChargeOf">
          <DropDownList></DropDownList>
        </Form.Item>
        <Form.Item label="הסבר טיוב:" name="tiubExplanation">
          <TextArea />
        </Form.Item>
        <Form.Item label="תאריך התחלה" name="begda">
          <DatePicker
            format={dateFormat}
            showToday={false}
            allowClear={false}
            onChange={(e) => {
              DateDiffCalcHandler(e, "begda");
            }}
          ></DatePicker>
        </Form.Item>
        <Form.Item
          label="תאריך סיום"
          name="endda"
          getValueProps={(e) => {
            return {
              minDate: dateDiffToCalc.begda.add(1, "day"),
              allowClear: false,
              value: dateDiffToCalc.endda,
            };
          }}
        >
          <DatePicker
            format={dateFormat}
            showToday={false}
            onChange={(e) => {
              DateDiffCalcHandler(e, "endda");
            }}
          ></DatePicker>
        </Form.Item>
        <Form.Item label="מקדם זמן נדרש" name="timeDiff">
          {dateDiffToCalc.timeDiff.toFixed(3)}
        </Form.Item>
        <Form.Item label="הערה" name="comment">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="קצין בכיר"
          name="kvutzotMinuiKatzinBahir"
          initialValue={0}
          getValueProps={(e) => ({
            value: totalToCalc.kvutzotMinuiKatzinBahir,
          })}
        >
          <InputNumber
            style={{ direction: "ltr" }}
            min={0}
            onChange={(e) => {
              if (e != null) {
                TotalToCalcHandler(e, "kvutzotMinuiKatzinBahir");
              } else {
                TotalToCalcHandler(0, "kvutzotMinuiKatzinBahir");
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="קצין מובהק"
          name="kvutzotMinuiKatzinMuvak"
          initialValue={0}
          getValueProps={(e) => ({
            value: totalToCalc.kvutzotMinuiKatzinMuvak,
          })}
        >
          <InputNumber
            style={{ direction: "ltr" }}
            min={0}
            onChange={(e) => {
              if (e != null) {
                TotalToCalcHandler(e, "kvutzotMinuiKatzinMuvak");
              } else {
                TotalToCalcHandler(0, "kvutzotMinuiKatzinMuvak");
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="קצין ראשוני"
          name="kvutzotMinuiKatzinRishoni"
          initialValue={0}
          getValueProps={(e) => ({
            value: totalToCalc.kvutzotMinuiKatzinRishoni,
          })}
        >
          <InputNumber
            style={{ direction: "ltr" }}
            min={0}
            onChange={(e) => {
              if (e != null) {
                TotalToCalcHandler(e, "kvutzotMinuiKatzinRishoni");
              } else {
                TotalToCalcHandler(0, "kvutzotMinuiKatzinRishoni");
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="נגד מובהק"
          name="kvutzotMinuiNagadMuvak"
          initialValue={0}
          getValueProps={(e) => ({
            value: totalToCalc.kvutzotMinuiNagadMuvak,
          })}
        >
          <InputNumber
            style={{ direction: "ltr" }}
            min={0}
            onChange={(e) => {
              if (e != null) {
                TotalToCalcHandler(e, "kvutzotMinuiNagadMuvak");
              } else {
                TotalToCalcHandler(0, "kvutzotMinuiNagadMuvak");
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label="נגד ראשוני"
          name="kvutzotMinuiNagadRishoni"
          initialValue={0}
          getValueProps={(e) => ({
            value: totalToCalc.kvutzotMinuiNagadRishoni,
          })}
        >
          <InputNumber
            style={{ direction: "ltr" }}
            min={0}
            onChange={(e) => {
              if (e != null) {
                TotalToCalcHandler(e, "kvutzotMinuiNagadRishoni");
              } else {
                TotalToCalcHandler(0, "kvutzotMinuiNagadRishoni");
              }
            }}
          />
        </Form.Item>

        <Form.Item label='סה"כ' name="total">
          {totalToCalc.total}
        </Form.Item>
        <Form.Item label="מונחי ראשוני" name="munahiRishoni">
          <div>נדרש לחשב</div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
