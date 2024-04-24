import { InputNumber, Tooltip } from "antd";
import { costs_agat } from "../../data";
import GenericTable from "./GenericTable";
import { useState } from "react";

export default function TablePriceAgatInput() {
  const [tableData, setTableData] = useState(costs_agat);
  const columns = [
    {
      accessorKey: "price",
      header: "עלות",
      cell: (props) => {
        const styleForCellGreen = {
          scale: "95%",
          border: "2px solid green",
          width: "6vw",
        };
        if (tableData[props.row.index].id === 222220) {
          return (
            <Tooltip
              placement="topRight"
              title="שדה מחושב - סכום מכפלות מחירי קצין ראשוני וקצין קצר בתמהיל"
            >
              <InputNumber
                style={styleForCellGreen}
                defaultValue={props.getValue()}
                readOnly={true}
                addonAfter={"₪"}
              ></InputNumber>
            </Tooltip>
          );
        }
        return <InputNumber defaultValue={props.getValue()}></InputNumber>;
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
                  <InputNumber
                    style={styleForCell}
                    defaultValue={0.25}
                    min={0}
                    max={1}
                    step={0.01}
                  ></InputNumber>
                </Tooltip>
              ) : (
                <Tooltip
                  placement="topRight"
                  title="תמהיל- חישוב מחיר קצין ראשוני ממוצע ותמהיל"
                >
                  <InputNumber
                    style={styleForCell}
                    defaultValue={0.75}
                    min={0}
                    max={1}
                    step={0.01}
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

  return (
    <GenericTable
      tableTitle={'מחירון דרגות אג"ת'}
      columnsForTable={columns}
      dataForTable={costs_agat}
    ></GenericTable>
  );
}
