export default function DropDownList({ optionsZ }) {
  return (
    <select>
      {optionsZ.map((item) => {
        return <option key={item.id}>{item.name}</option>;
      })}
    </select>
  );
}
