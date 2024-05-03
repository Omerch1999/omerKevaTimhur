import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InputScreen from "./Components/Screens/InputScreen";

import "./Styles/TableStyles.css";
import TiubimIadaniim from "./Components/Screens/TiubimIadaniimScreen";
import LevelsNavBar from "./Components/NavBars/LevelsNavBar";

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
