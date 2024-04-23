import { Select } from "antd";
export default function DropDownList({ optionsZ, defaultValueZ, styleZ }) {
  const options = optionsZ.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return (
    <Select
      options={options}
      defaultValue={defaultValueZ}
      style={styleZ}
    ></Select>
  );
}
