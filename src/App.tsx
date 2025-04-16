import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routing/routes";
import { useEffect } from "react";
import { useNotesStore } from "./stores/useNotesStore";

function App() {
  const { loading, fetchNotes } = useNotesStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) return <div>Loading...</div>;

  const router = createBrowserRouter(routes());

  return <RouterProvider router={router} />;
}

export default App;
