import Table1Input from "./Components/Table1Input";
import Table2Input from "./Components/Table2Input";
import Table3Input from "./Components/Table3Input";
import Table4Input from "./Components/Table4Input";
import Table6Input11 from "./Components/Table6Input11";
import Table6Input12 from "./Components/Table6Input12";
import TablePriceAirFrceInput from "./Components/TablePriceAirForceInput";
import TablePriceAgatInput from "./Components/TablePriceAgatInput";
import Table6InputTargetMatseva from "./Components/Table6InputTargetMatseva";
import Table8Input from "./Components/Table8Input";

import "../../../Styles/InputScreenStyles.css";

export default function InputScreen() {
  return (
    <div>
      <div className="tables-in-page-first-row">
        <Table1Input></Table1Input>
      </div>
      <div className="tables-in-page-second-row">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Table3Input></Table3Input>
          <Table4Input></Table4Input>
        </div>
        <Table2Input></Table2Input>
        <Table6Input11></Table6Input11>
        <Table6Input12></Table6Input12>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TablePriceAirFrceInput></TablePriceAirFrceInput>
          <TablePriceAgatInput></TablePriceAgatInput>
          <Table8Input></Table8Input>
          <Table6InputTargetMatseva></Table6InputTargetMatseva>
        </div>
      </div>
    </div>
  );
}
