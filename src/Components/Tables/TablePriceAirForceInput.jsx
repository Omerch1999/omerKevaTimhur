import GenericTable from "../Tables/GenericTable";
import Input from "../Input";
import { costs_airforce } from "../../data";
import { useEffect, useState } from "react";
import { InputNumber, Tooltip } from "antd";

export default function TablePriceAirFrceInput() {
  const [tableData, setTableData] = useState(costs_airforce);

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
    const priceNagadkatsar = tableData.find((row) => row.id === 222231).price;
    const priceNagadRishoni = tableData.find((row) => row.id === 222232).price;

    setTableData((prev) => {
      const newData = prev.map((item) => {
        if (item.id === 222230) {
          return { ...item, price: (priceNagadkatsar + priceNagadRishoni) / 2 };
        }
        return item;
      });
      return newData;
    });
  }, [
    tableData.find((row) => row.id === 222231).price,
    tableData.find((row) => row.id === 222232).price,
  ]);

  const columns = [
    {
      accessorKey: "price",
      header: "מחיר",
      cell: (props) => {
        const styleForCell = { width: "6.7vw", scale: "95%" };
        const styleForCellGreen = {
          width: "6.7vw",
          scale: "95%",
          border: "2px solid green",
        };
        if (props.row.original.id === 222230) {
          //calculated fild
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - ממוצע מחיר נגד קצר וראשוני"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={tableData[props.row.index].price}
                min={tableData[props.row.index].price}
                max={tableData[props.row.index].price}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        return (
          //regular input fild
          <InputNumber
            style={styleForCell}
            defaultValue={tableData[props.row.index].price}
            min={0}
            max={1000000}
            step={1}
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
    },
  ];

  return (
    <GenericTable
      tableTitle={'מחירון דרגות ח"א'}
      columnsForTable={columns}
      dataForTable={tableData}
    ></GenericTable>
  );
}
