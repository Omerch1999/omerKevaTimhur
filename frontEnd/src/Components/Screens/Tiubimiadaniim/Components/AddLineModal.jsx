import { Modal, Form, DatePicker, InputNumber, Button } from "antd";
import DropDownList from "../../../DropDownList";
import { bsisim_list } from "../../../../data";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";

const dateFormat = "DD-MM-YYYY";

export default function AddLineModal({ isModalOpen, handleOk, handleCancel }) {
  const [form] = Form.useForm();

  const [dateDiffToCalc, setDateDiffToCalc] = useState({
    begda: dayjs(),
    endda: dayjs().add(1, "day"),
    dateDiff: dayjs().diff(dayjs().subtract(1, "day"), "years", true),
  });

  const [totalToCalc, setTotalToCalc] = useState({
    kvutzotMinuiKatzinBahir: 0,
    kvutzotMinuiKatzinMuvak: 0,
    kvutzotMinuiKatzinRishoni: 0,
    kvutzotMinuiNagadMuvak: 0,
    total: 0,
    munahiRishoni: 0,
  });

  function DateDiffCalcHandler(begda, endda) {
    const temp = {
      begda: begda,
      endda: endda,
      dateDiff: begda.diff(endda, "years", true),
    };
    setDateDiffToCalc(temp);
  }

  const onFinish = (values) => {
    console.log(values);
    console.log(form.getFieldValue());
    debugger;
  };

  const initialValues = {
    begda: dayjs(), // Ensure it's a valid dayjs object
    enda: dayjs().add(1, "day"),
  };

  return (
    <Modal
      title="הוספת שורה"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        initialValues={initialValues}
        style={{ direction: "rtl" }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label='קס"מ'
          name="Kasm"
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
              DateDiffCalcHandler(e, dateDiffToCalc.endda);
            }}
          ></DatePicker>
        </Form.Item>
        <Form.Item
          label="תאריך סיום"
          name="enda"
          getValueProps={(e) => {
            let dateTemp = e;
            if (e < dateDiffToCalc.begda) {
              dateTemp = dateDiffToCalc.begda.add(1, "day");
            }

            return {
              minDate: dateDiffToCalc.begda.add(1, "day"),
              allowClear: false,
              value: dateTemp,
            };
          }}
        >
          <DatePicker format={dateFormat} showToday={false}></DatePicker>
        </Form.Item>
        <Form.Item label="מקדם זמן נדרש" name="timeDiff">
          {dateDiffToCalc.dateDiff.toFixed(3)}
        </Form.Item>
        <Form.Item label="הערה" name="comment">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="קצין בכיר"
          name="kvutzotMinuiKatzinBahir"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} onChange={(e) => {}} />
        </Form.Item>
        <Form.Item
          label="קצין מובהק"
          name="kvutzotMinuiKatzinMuvak"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item
          label="קצין ראשוני"
          name="kvutzotMinuiKatzinRishoni"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item
          label="נגד מובהק"
          name="kvutzotMinuiNagadMuvak"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item
          label="נגד ראשוני"
          name="kvutzotMinuiNagadRishoni"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>

        <Form.Item label='סה"כ' name="total">
          <div>נדרש לחשב</div>
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
