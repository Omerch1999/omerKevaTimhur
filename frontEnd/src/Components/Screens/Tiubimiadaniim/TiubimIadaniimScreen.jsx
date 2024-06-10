import { useEffect, useState } from "react";
import TableTiubim from "./Components/TiubimIadniimTable";
import { Button, Spin } from "antd";
import axios from "axios";

export default function TiubimIadaniim() {
  const [initialHaktzaData, setInitialHaktzaData] = useState([]);
  const [initialTkinaData, setInitialTkinaData] = useState();
  const [fetchHaktzaData, setFetchHaktzaData] = useState(false);
  const [fetchTkinaData, setFetchTkinaData] = useState(false);

  useEffect(() => {
    async function fetchInitialHaktzaData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/getTiubimIdaniimHaktzaData"
        );
        console.log(response.data.TiubimIdaniimHaktzaData);
        setInitialHaktzaData(response.data.TiubimIdaniimHaktzaData);
      } catch (error) {
        console.log("error");
      } finally {
        setFetchHaktzaData(true);
      }
    }

    async function fetchInitialTkinaData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/getTiubimIdaniimTkinaData"
        );
        setInitialTkinaData(response.data.TiubimIdaniimTkinaData);
      } catch (error) {
        console.log("error");
      } finally {
        setFetchTkinaData(true);
      }
    }

    fetchInitialHaktzaData();
    fetchInitialTkinaData();
  }, []);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button>שמור טבלאות</Button>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!fetchHaktzaData ? (
          <Spin />
        ) : (
          <TableTiubim
            tableTitle={"שינויים בהיבט הקצאה"}
            initialData={initialHaktzaData}
          />
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        {!fetchTkinaData ? (
          <Spin />
        ) : (
          <TableTiubim
            tableTitle={"שינויים בהיבט תקינה"}
            initialData={initialTkinaData}
          />
        )}
      </div>
    </>
  );
}
