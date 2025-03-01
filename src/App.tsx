import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routing/routes";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "false"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const router = createBrowserRouter(routes({ darkMode, setDarkMode }));

  return <RouterProvider router={router} />;
}

export default App;
