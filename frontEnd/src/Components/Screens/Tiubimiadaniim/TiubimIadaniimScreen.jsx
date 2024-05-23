import TableHakzaViewPoint from "./Components/TableHakzaViewPoint";
import { Button } from "antd";

export default function TiubimIadaniim() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>שמור טבלאות</Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableHakzaViewPoint />
      </div>
    </>
  );
}
