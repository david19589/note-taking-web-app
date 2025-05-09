import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routing/routes";
import { useEffect } from "react";
import { useUIStore } from "./stores/useUIStore";

const router = createBrowserRouter(routes());

function App() {
  const { font } = useUIStore();

  useEffect(() => {
    document.documentElement.classList.remove("sans", "serif", "monospace");
    document.documentElement.classList.add(font);
  }, [font]);

  return <RouterProvider router={router} />;
}

export default App;
