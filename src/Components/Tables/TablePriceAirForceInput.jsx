import GenericTable from "../Tables/GenericTable";
import Input from "../Input";
import { costs_airforce } from "../../data";
import { useEffect, useState } from "react";
import { InputNumber, Tooltip } from "antd";

export default function TablePriceAirFrceInput() {
  const [tableData, setTableData] = useState(costs_airforce);

  function handleSetTaleData(rowIndex, columnId, value) {
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

  useEffect(() => {
    const priceNagadkatsar = tableData.find((row) => row.id === 222231).price;
    const priceNagadRishoni = tableData.find((row) => row.id === 222232).price;

    setTableData((prev) => {
      const newData = prev.map((item) => {
        if (item.id === 222220) {
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
        if (props.row.original.id === 222220) {
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - ממוצע מחיר נגד קצר וראשוני"
            >
              <InputNumber
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
          <InputNumber
            defaultValue={tableData[props.row.index].price}
            min={0}
            max={1000000}
            step={1}
            addonAfter={"₪"}
            onChange={(value) => {
              handleSetTaleData(props.row.index, props.column.id, value);
            }}
          ></InputNumber>
        );
      },
    },
    { accessorKey: "name", header: "דרגה" },
  ];

  return (
    <GenericTable
      tableTitle={'מחירון דרגות ח"א'}
      columnsForTable={columns}
      dataForTable={tableData}
    ></GenericTable>
  );
}
