import LevelsNavBar from "../NavBars/LevelsNavBar";
import Table1Input from "../Tables/Table1Input";
import Table2Input from "../Tables/Table2Input";
import Table3Input from "../Tables/Table3Input";
import Table4Input from "../Tables/Table4Input";
import Table6Input11 from "../Tables/Table6Input11";

import "../../Styles/InputScreenStyles.css";
import Table6Input12 from "../Tables/Table6Input12";
import TablePriceAirFrceInput from "../Tables/TablePriceAirForceInput";
export default function InputScreen() {
  return (
    <div>
      <LevelsNavBar></LevelsNavBar>
      <div className="tables-in-page-first-row">
        <Table1Input></Table1Input>
      </div>
      <div className="tables-in-page-second-row">
        <Table3Input></Table3Input>
        <Table4Input></Table4Input>
        <Table2Input></Table2Input>
        <Table6Input11></Table6Input11>
        <Table6Input12></Table6Input12>
        <div className="tables-in-page-second-third">
          <TablePriceAirFrceInput></TablePriceAirFrceInput>
        </div>
      </div>
    </div>
  );
}
