import LevelsNavBar from "../NavBars/LevelsNavBar";
import Table1Input from "../Tables/Table1Input";
import Table2Input from "../Tables/Table2Input";
import Table3Input from "../Tables/Table3Input";
import Table4Input from "../Tables/Table4Input";
import Table6Input11 from "../Tables/Table6Input11";
import Table6Input12 from "../Tables/Table6Input12";
import TablePriceAirFrceInput from "../Tables/TablePriceAirForceInput";
import TablePriceAgatInput from "../Tables/TablePriceAgatInput";
import Table6InputTargetMatseva from "../Tables/Table6InputTargetMatseva";

import "../../Styles/InputScreenStyles.css";
import Table8Input from "../Tables/Table8Input";

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
