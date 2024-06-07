import { TiubimIdaniimHaktzaData } from "../../../data.js";
import TableHakzaViewPoint from "./Components/TiubimIadniimTable";
import { Button, Form, DatePicker } from "antd";
import dayjs from "dayjs";

export default function TiubimIadaniim() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>שמור טבלאות</Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableHakzaViewPoint
          tableTitle={"שינויים בהיבט הקצאה"}
          initialData={TiubimIdaniimHaktzaData}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableHakzaViewPoint
          tableTitle={"שינויים בהיבט תקינה"}
          initialData={TiubimIdaniimHaktzaData}
        />
      </div>
    </>
  );
}
