import axios from "axios";
async function FetchTableData(url) {
  console.log(url);
  const response = await axios.get(url);
  return response;
}

function ErrorFechTableData(name) {
  return <div style={{ color: "red" }}>"שגיאה בטבלה "{name}</div>;
}
export { FetchTableData, ErrorFechTableData };
