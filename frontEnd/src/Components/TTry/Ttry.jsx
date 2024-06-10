import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Input } from "antd";
import GenericTable from "../Tables/GenericTable";
import { useQuery } from "@tanstack/react-query";

const fetchTableData = async () => {
  const response = await axios.get("http://localhost:4000/gett");
  return response;
};
export default function TTry() {
  const [data, setData] = useState([
    { id: 1, name: "Omer A", age: 25 },
    { id: 2, name: "Omer B", age: 30 },
  ]);
  const [updateZ, setUpdateZ] = useState(true);

  // useEffect(() => {
  //   async function fetchTableData() {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/getTiubimIdaniimHaktzaData"
  //       );
  //       setData(response.data.omer);
  //     } catch (error) {
  //       console.log("error");
  //     } finally {
  //       setUpdateZ(false);
  //     }
  //   }
  //   fetchTableData();
  // }, []);

  const columns = [
    { accessorKey: "id" },
    { accessorKey: "name" },
    { accessorKey: "age" },
  ];

  const ABC = useQuery({ queryKey: ["a"], queryFn: fetchTableData });
  console.log(ABC.data?.data);

  if (ABC.isLoading) {
    console.log("isLoading");
  }
  return (
    <>
      <Input
        onBlur={(e) => {
          const val = { name: e.target.value };
          axios
            .post("http://localhost:4000/gett", val)
            .then((e) => console.log(e));
        }}
      ></Input>
      {ABC.isLoading ? (
        <Spin></Spin>
      ) : (
        <GenericTable
          dataForTable={ABC.data.data}
          columnsForTable={columns}
        ></GenericTable>
      )}
    </>
  );
}
