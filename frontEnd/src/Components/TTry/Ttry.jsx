import axios from "axios";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import GenericTable from "../Tables/GenericTable";
export default function TTry() {
  const [data, setData] = useState([
    { id: 1, name: "Omer A", age: 25 },
    { id: 2, name: "Omer B", age: 30 },
  ]);
  const [updateZ, setUpdateZ] = useState(true);

  useEffect(() => {
    async function fetchTableData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/getTiubimIdaniimHaktzaData"
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error");
      } finally {
        setUpdateZ(false);
      }
    }
    fetchTableData();
  }, []);

  const columns = [
    { accessorKey: "id" },
    { accessorKey: "name" },
    { accessorKey: "age" },
  ];

  return (
    <>
      {updateZ ? (
        <Spin></Spin>
      ) : (
        <GenericTable
          dataForTable={data}
          columnsForTable={columns}
        ></GenericTable>
      )}
    </>
  );
}
