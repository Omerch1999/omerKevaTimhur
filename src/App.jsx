import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InputScreen from "./Components/Screens/InputScreen/InputScreen";
import TiubimIadaniim from "./Components/Screens/Tiubimiadaniim/TiubimIadaniimScreen";
import LevelsNavBar from "./Components/NavBars/LevelsNavBar";

import "./Styles/TableStyles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LevelsNavBar />,
    children: [
      { path: "/input_screen", element: <InputScreen /> },
      { path: "/tiubim_idaniim", element: <TiubimIadaniim /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
