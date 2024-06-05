import TableHakzaViewPoint from "./Components/TableHakzaViewPoint";
import { Button, Form, DatePicker } from "antd";
import dayjs from "dayjs";

export default function TiubimIadaniim() {
  const initialValues = {
    begda: dayjs(), // Ensure it's a valid dayjs object
  };

  return (
    <>
      {/* <Form initialValues={initialValues}>
        <Form.Item
          name="begda"
          label="תאריך תחילה"
          getValueProps={(e) => ({ value: dayjs(e) })} //pass this value to [form] on submit
        >
          <DatePicker format={"DD-MM-YYYY"}></DatePicker>
        </Form.Item>
      </Form> */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>שמור טבלאות</Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableHakzaViewPoint />
      </div>
    </>
  );
}
