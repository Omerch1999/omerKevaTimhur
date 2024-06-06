import { Select } from "antd";
import { useEffect, useState } from "react";
export default function DropDownList({
  optionsZ,
  defaultValueZ,
  styleZ,
  onChange,
}) {
  const [options, setOptions] = useState([
    { value: "option A", label: "option A" },
    { value: "option B", label: "option B" },
  ]);
  useEffect(() => {
    if (optionsZ) {
      const optionsTemp = optionsZ.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(optionsTemp);
    }
  }, []);

  return (
    <Select
      options={options}
      defaultValue={defaultValueZ}
      style={styleZ}
      onChange={(a, b) => {
        if (onChange) {
          onChange(b.label);
        }
      }}
    ></Select>
  );
}
