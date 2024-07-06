import { InputNumber, Tooltip } from "antd";
import { costs_agat } from "../../../../data";
import GenericTable from "../../../Tables/GenericTable";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import {
  FetchTableData,
  ErrorFechTableData,
} from "../../../../Hooks/HooksAxios";

export default function TablePriceAgatInput() {
  //get pointer to the React table
  function retTableP(val) {
    setReactTableP(val);
  }

  //get the data from the React table
  function retTableV(val) {
    setTableData(val);
  }

  //pointer for the table to get the meta functions
  const [reactTableP, setReactTableP] = useState();
  const [tableData, setTableData] = useState(costs_agat);
  const [tamhilKatzar, setTamhilKatzar] = useState([
    costs_agat.find((row) => row.id === 222224).percentege,
  ]); //save only katzin katzar because katzin rishoni will be: 1-katzinKatzar

  //save the changes of input in state
  function handleSetTableData(rowIndex, columnId, value) {
    setTableData((prev) => {
      const newData = prev.map((row, index) => {
        if (rowIndex === index) {
          return { ...prev[rowIndex], [columnId]: parseFloat(value) };
        }
        return row;
      });
      return newData;
    });
  }

  //on change price of nagad katzar or nagad rishoni, it calculate the avarage price "מונחי ראשוני"
  useEffect(() => {
    const priceNagadKatsar = tableData.find((row) => row.id === 222231).price;
    const priceNagadRishoni = tableData.find((row) => row.id === 222232).price;

    setTableData((prev) => {
      const newData = prev.map((item) => {
        if (item.id === 222230) {
          return { ...item, price: (priceNagadKatsar + priceNagadRishoni) / 2 };
        }
        return item;
      });
      return newData;
    });
  }, [
    tableData.find((row) => row.id === 222231).price,
    tableData.find((row) => row.id === 222232).price,
  ]);

  //on change price of katzin katzar or katzin rishoni, it calculate the price "קצין ראשוני ממוצע ותמהיל"
  useEffect(() => {
    const priceKatzinKatzar = tableData.find((row) => row.id === 222224).price;
    const priceKatzinRishoni = tableData.find((row) => row.id === 222221).price;

    setTableData((prev) => {
      const newData = prev.map((item) => {
        if (item.id === 222220) {
          return {
            ...item,
            price:
              priceKatzinKatzar * tamhilKatzar +
              priceKatzinRishoni * (1 - tamhilKatzar),
          };
        }
        return item;
      });
      return newData;
    });
  }, [
    tamhilKatzar,
    tableData.find((row) => row.id === 222221).price,
    tableData.find((row) => row.id === 222224).price,
  ]);

  const columns = [
    {
      accessorKey: "price",
      header: "עלות",
      cell: (props) => {
        const styleForCellGreen = {
          width: "6.7vw",
          scale: "95%",
          border: "2px solid green",
        };
        const styleForCell = {
          width: "6.7vw",
          scale: "95%",
        };
        if (tableData[props.row.index].id === 222220) {
          //katzin rishoni memutza v tamhil
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - סכום מכפלות מחירי קצין ראשוני וקצין קצר בתמהיל"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price.toFixed(2)}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        if (tableData[props.row.index].id === 222230) {
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - ממוצע מחיר נגד קצר וראשוני"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price.toFixed(2)}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        return (
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].price}
            addonAfter={"₪"}
            onChange={(value) => {
              handleSetTableData(props.row.index, props.column.id, value);
            }}
          ></InputNumber>
        );
      },
    },
    {
      accessorKey: "name",
      header: "דרגה",
      cell: (props) => {
        if (
          //adding input for TAMHIL in katzin rishoni and katzar
          tableData[props.row.index].id === 222221 ||
          tableData[props.row.index].id === 222224
        ) {
          const styleForCell = { width: "3.5vw", scale: "95%" };
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {props.getValue()}
              {tableData[props.row.index].id === 222221 ? (
                <Tooltip
                  placement="topRight"
                  title="תמהיל- חישוב מחיר קצין ראשוני ממוצע ותמהיל"
                >
                  <InputNumber //katzin rishoni tamhil
                    style={styleForCell}
                    defaultValue={(1 - tamhilKatzar).toFixed(2)}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(value) => {
                      setTamhilKatzar((1 - value).toFixed(2));
                    }}
                  ></InputNumber>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="topRight"
                  title="תמהיל- חישוב מחיר קצין ראשוני ממוצע ותמהיל"
                >
                  <InputNumber //katzin katzar tamhil
                    style={styleForCell}
                    defaultValue={tamhilKatzar}
                    min={0}
                    max={1}
                    step={0.01}
                    onChange={(value) => {
                      setTamhilKatzar(value.toFixed(2));
                    }}
                  ></InputNumber>
                </Tooltip>
              )}
            </div>
          );
        }
        return <div>{props.getValue()}</div>;
      },
    },
  ];

  const {
    data: initalFetchedData,
    isLoading,
    isError,
    isFetched,
  } = useQuery({
    queryKey: ["costs_agat"],
    queryFn: () => FetchTableData("http://localhost:4000/costs_agat"),
  });

  return (
    <>
      {isLoading || tableData === undefined ? (
        <Spin></Spin>
      ) : (
        <>
          <GenericTable
            tableTitle={'מחירון דרגות אג"ת'}
            columnsForTable={columns}
            dataForTable={tableData}
            retTableP={retTableP}
            retTableV={retTableV}
          ></GenericTable>
        </>
      )}
    </>
  );
}
