import axios from "axios";
import { useRef, useState } from "react";
import { Spin, Input } from "antd";
import GenericTable from "../Tables/GenericTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchTableData = async () => {
  const response = await axios.get("http://localhost:4000/gett");
  console.log("response");
  return response;
};
const fetchTableData2 = async () => {
  const response = await axios.get("http://localhost:4000/gett1");
  console.log("response2");
  return response;
};

export default function TTry() {
  const queryClient = useQueryClient();

  const columns = [
    { accessorKey: "id" },
    {
      accessorKey: "name",
      cell: (props) => {
        return (
          <Input
            defaultValue={props.getValue()}
            onBlur={async (e) => {
              mutateUpdate([e.target.value, props.row.original.id]);
            }}
          ></Input>
        );
      },
    },
    { accessorKey: "age" },
  ];

  const handleUpdate = async (e, place) => {
    try {
      console.log(e);
      const response = await axios.patch(
        `http://localhost:4000/gett/${place}`,
        {
          e,
        }
      );
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

  const { mutate: mutateUpdate, onMutate } = useMutation({
    mutationFn: async (e) => {
      console.log(e[0]);
      console.log(e[1]);
      await handleUpdate(e[0], e[1]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["a"] });
    },
    onMutate: () => {
      console.log("mutating");
      return <div>omer</div>;
    },
  });

  const { data, error, isLoading, isFetching } = useQuery({
    queryKey: ["a"],
    queryFn: fetchTableData,
  });
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
    isFetching: isFetching2,
  } = useQuery({ queryKey: ["b"], queryFn: fetchTableData2 });

  const add1 = async (e) => {
    console.log(e);
    await axios.post("http://localhost:4000/gett", {
      id: e,
    });
  };

  const add2 = async (e) => {
    console.log(e);
    await axios.post("http://localhost:4000/gett2", {
      id: e,
    });
  };

  const { mutate, isIdle, isPending, isSuccess } = useMutation({
    mutationFn: async (newPost) => {
      console.log("newPost", newPost);
      // await add1(newPost);
      console.log("newData", data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["a"] });
    },
  });

  const {
    mutate: mutate2,
    isIdle: isIdle2,
    isPending: isPending2,
    isSuccess: isSuccess2,
  } = useMutation({
    mutationFn: async (newPost) => {
      console.log("newPost", newPost);
      await add2(newPost);
      console.log("newData", data.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["b"] });
    },
  });

  return (
    <>
      <Input
        defaultValue={"first table"}
        onBlur={(e) => {
          mutate(e.target.value);
        }}
      ></Input>
      <Input
        defaultValue={"second table"}
        onBlur={(e) => {
          mutate2(e.target.value);
        }}
      ></Input>
      {isLoading || isFetching ? (
        <Spin></Spin>
      ) : (
        <>
          <GenericTable
            dataForTable={data.data}
            columnsForTable={columns}
          ></GenericTable>
        </>
      )}
      {isLoading2 || isFetching2 ? (
        <Spin></Spin>
      ) : (
        <>
          <GenericTable
            dataForTable={data2.data}
            columnsForTable={columns}
          ></GenericTable>
        </>
      )}
      {!isFetching ? (
        data.data.map((item) => <div>{item.id}</div>)
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
