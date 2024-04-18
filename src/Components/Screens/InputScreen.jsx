import Table1Input from "../Tables/Table1Input";
import Table2Input from "../Tables/Table2Input";
import Table3Input from "../Tables/Table3Input";
import Table4Input from "../Tables/Table4Input";
export default function InputScreen() {
  return (
    <>
      <div className="title-and-table-in-input-page">
        <Table4Input></Table4Input>
        <Table3Input></Table3Input>
        <Table2Input></Table2Input>
        <Table1Input></Table1Input>
      </div>
    </>
  );
}
