import { Modal, Form, DatePicker, InputNumber, Button } from "antd";
import DropDownList from "../../../DropDownList";
import { bsisim_list } from "../../../../data";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const dateFormat = "DD-MM-YYYY";

export default function AddLineModal({ isModalOpen, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [tempData, setTempData] = useState();

  const onFinish = (values) => {
    console.log(values);
    console.log(form.getFieldValue());
  };

  function getDataFromDropDown(data) {
    console.log(data);
    setTempData(data);
  }

  return (
    <Modal
      title="הוספת שורה"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form style={{ direction: "rtl" }} onFinish={onFinish} form={form}>
        <Form.Item
          label='קס"מ'
          name="Kasm"
          //   rules={[
          //     {
          //       required: true,
          //     },
          //   ]}
          //getValueFromEvent={(value) => value}
        >
          <DropDownList
            optionsZ={bsisim_list}
            retDataFun={getDataFromDropDown}
          ></DropDownList>
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
          <DatePicker format={dateFormat}></DatePicker>
        </Form.Item>
        <Form.Item label="תאריך סיום" name="enda">
          <DatePicker format={dateFormat}></DatePicker>
        </Form.Item>
        <Form.Item label="מקדם זמן נדרש" name="timeDiff">
          <div>נדרש לחשב</div>
        </Form.Item>
        <Form.Item label="הערה" name="comment">
          <TextArea />
        </Form.Item>
        <Form.Item label="קצין בכיר" name="kvutzotMinuiKatzinBahir">
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item label="קצין מובהק" name="kvutzotMinuiKatzinMuvak">
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item label="קצין ראשוני" name="kvutzotMinuiKatzinRishoni">
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item label="נגד מובהק" name="kvutzotMinuiNagadMuvak">
          <InputNumber style={{ direction: "ltr" }} />
        </Form.Item>
        <Form.Item label="נגד ראשוני" name="kvutzotMinuiNagadRishoni">
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
