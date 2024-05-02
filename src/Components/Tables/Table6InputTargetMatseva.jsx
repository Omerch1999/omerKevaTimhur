import { InputNumber } from "antd";
import { useState } from "react";
import { hitkansutPercentage } from "../../data";

export default function Table6InputTarget() {
  const [hitkansutPercentageS, setHitkansutPercentageS] = useState(
    parseFloat(hitkansutPercentage)
  );
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <b>שלב 6- מס יעדי מצבות</b>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <InputNumber></InputNumber>התכנסות נדרשת במ"ר
      </div>
      <div style={{ textAlign: "center", fontWeight: "700" }}>
        סימולציית חישוב מס
      </div>
      <div style={{ textAlign: "center" }}>
        <div>סך הקצאות מ"ר של כלל הקס"מים לאחר החרגות</div>
        <div>
          <InputNumber style={{ width: "6.5vw" }}></InputNumber>
        </div>
        <div>אחוז התכנסות רצוי</div>
        <div>
          <InputNumber
            style={{ width: "6.5vw" }}
            defaultValue={hitkansutPercentageS}
            max={100}
            min={0}
            step={0.01}
            addonAfter={"%"}
          ></InputNumber>
        </div>
      </div>
    </>
  );
}
