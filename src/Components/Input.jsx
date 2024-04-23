import { useEffect, useState } from "react";
import "../Styles/TableStyles.css";
export default function Input({
  getValue,
  row,
  column,
  table,
  minI = 0,
  maxI = 1,
  setpI = 0.01,
  addLogo = "",
  styleI,
  updateFunction,
}) {
  //type: 1 0-1 by 0.01
  const initialValue = getValue;
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta.updateTableData(row.index, column.id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <input
        style={styleI}
        type="number"
        min={minI}
        max={maxI}
        step={setpI}
        value={value}
        onBlur={onBlur}
        onChange={(e) => {
          setValue(e.target.value);
          console.log("column.id", column.id);
          updateFunction(row.index, column.id, e.target.value);
        }}
      ></input>
      {addLogo}
    </div>
  );
}
