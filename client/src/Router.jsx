import { Routes, Route } from "react-router-dom";
import Error from "./features/error/error";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/not-found" element={<Error />} />
    </Routes>
  );
}

export default AppRoutes;
