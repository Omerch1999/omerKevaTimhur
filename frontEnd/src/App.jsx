import { RouterProvider, createBrowserRouter } from "react-router-dom";
import InputScreen from "./Components/Screens/InputScreen/InputScreen";
import TiubimIadaniim from "./Components/Screens/Tiubimiadaniim/TiubimIadaniimScreen";
import LevelsNavBar from "./Components/NavBars/LevelsNavBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
