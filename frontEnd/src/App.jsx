import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InputScreen from "./Components/Screens/InputScreen/InputScreen";
import TiubimIadaniim from "./Components/Screens/Tiubimiadaniim/TiubimIadaniimScreen";
import LevelsNavBar from "./Components/NavBars/LevelsNavBar";

import "./Styles/TableStyles.css";
import TTry from "./Components/TTry/Ttry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LevelsNavBar />,
    children: [
      { path: "/", element: <TTry></TTry> },
      { path: "/input_screen", element: <InputScreen /> },
      { path: "/tiubim_idaniim", element: <TiubimIadaniim /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
