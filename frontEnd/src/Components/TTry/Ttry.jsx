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

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const columns = [
    { accessorKey: "id" },
    {
      accessorKey: "name",
      cell: (props) => {
        return (
          <Input
            defaultValue={props.getValue()}
            onBlur={async (e) => {
              setId(props.row.original.id);
              handleUpdate(e.target.value);
            }}
          ></Input>
        );
      },
    },
    { accessorKey: "age" },
  ];

  const ABC = useQuery({ queryKey: ["a"], queryFn: fetchTableData });
  console.log(ABC.data?.data);

  const handleUpdate = async (e) => {
    try {
      console.log(e);
      const response = await axios.patch(`http://localhost:4000/gett/${id}`, {
        e,
      });
      if (response.status === 200) {
        console.log(response.data);
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      alert("Failed to update data");
      console.log(error);
    }
  };

  return (
    <>
      d
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
