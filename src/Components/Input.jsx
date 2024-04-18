import { useEffect, useState } from "react";
export default function Input({
  getValue,
  row,
  column,
  table,
  minI = 0,
  maxI = 1,
  setpI = 0.01,
}) {
  //type: 1 0-1 by 0.01
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    console.log(value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      type="number"
      min={minI}
      max={maxI}
      step={setpI}
      value={value}
      onBlur={onBlur}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></input>
  );
}
