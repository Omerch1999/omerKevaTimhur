import TableHakzaViewPoint from "./Components/TableHakzaViewPoint";
import { Button } from "antd";

export default function TiubimIadaniim() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1vw",
        }}
      >
        <Button>הוסף שורה</Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableHakzaViewPoint />
      </div>
    </>
  );
}
