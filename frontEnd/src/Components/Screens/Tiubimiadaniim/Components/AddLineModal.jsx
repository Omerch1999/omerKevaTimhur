import { Modal, Form, DatePicker, InputNumber, Button } from "antd";
import DropDownList from "../../../DropDownList";
import { bsisim_list } from "../../../../data";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const dateFormat = "DD-MM-YYYY";

export default function AddLineModal({ isModalOpen, handleOk, handleCancel }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
    console.log(form.getFieldValue());
    debugger;
  };

  const initialValues = {
    begda: dayjs("2024-06-01"), // Ensure it's a valid dayjs object
  };

  console.log(initialValues);
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
        <Form.Item
          label="תאריך התחלה"
          name="begda"
          getValueFromEvent={(e, dateString) => dateString} //return dateString
          getValueProps={(e) => e} //pass this value to [form] on submit
        >
          <DatePicker format="DD-MM-YYYY"></DatePicker>
        </Form.Item>
        <Form.Item
          label="תאריך סיום"
          name="enda"
          getValueFromEvent={(e, dateString) => dateString}
          getValueProps={(e) => e}
        >
          <DatePicker format={dateFormat}></DatePicker>
        </Form.Item>
        <Form.Item label="מקדם זמן נדרש" name="timeDiff">
          <div>נדרש לחשב</div>
        </Form.Item>
        <Form.Item label="הערה" name="comment">
          <TextArea />
        </Form.Item>
        <Form.Item
          label="קצין בכיר"
          name="kvutzotMinuiKatzinBahir"
          initialValue={0}
        >
          <InputNumber style={{ direction: "ltr" }} />
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
