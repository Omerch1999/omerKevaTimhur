import GenericTable from "../Tables/GenericTable";
import Input from "../Input";
import { costs_airforce } from "../../data";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
GenericTable;
const style1 = { width: "3.5vw", color: "red" };

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
      // return [
      //   ...prev,
      //   {
      //     ...prev.find((row) => row.id === 222220),
      //     price: (priceNagadkatsar + priceNagadRishoni) / 2,
      //   },
      // ];
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
              <div>{tableData[props.row.index].price + " ₪"}</div>
            </Tooltip>
          );
        }
        return (
          <Input
            row={props.row}
            column={props.column}
            table={props.table}
            styleI={style1}
            getValue={tableData[props.row.index].price}
            maxI={1000000}
            minI={1}
            addLogo="₪"
            setpI={0}
            updateFunction={handleSetTaleData}
          ></Input>
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
