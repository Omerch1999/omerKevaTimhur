import { NavLink, Outlet } from "react-router-dom";
import "./NavBarStyles.scss";

export default function LevelsNavBar() {
  const noLinkStyle = { color: "black", textDecoration: "none" };

  return (
    <>
      <nav style={{ backgroundColor: "lightgrey", borderRadius: "2vw" }}>
        <ul>
          <li className="li">נתוני בסיס</li>
          <li className="li">
            <NavLink
              to="/input_screen"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              style={noLinkStyle}
            >
              טבלאות פרמטרים
            </NavLink>
          </li>
          <li className="li">טבלת החרגות</li>
          <li className="li">
            <NavLink
              to="/tiubim_idaniim"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              style={noLinkStyle}
            >
              טבלת טיובים ידניים
            </NavLink>
          </li>
          <li className="li">טיפול בחריגים</li>
        </ul>
        <ul>
          <li className="li">שלב 1 - מקדמי הקצאה</li>
          <li className="li">שלב 2 - מקדמי התייעלות</li>
          <li className="li">שלב 3 - מודל הסגל</li>
          <li className="li">שלב 4 - השוואה</li>
          <li className="li">שלב 5 - טיובים ידניים</li>
          <li className="li">שלב 6 - יעדי מצבות</li>
          <li className="li">שלב 7 - הקצאות סופיות</li>
          <li className="li">כמות ראשים במובהק</li>
          <li className="li">השוואת תמחורים</li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
