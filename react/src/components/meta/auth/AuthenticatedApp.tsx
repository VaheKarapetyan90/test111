import { Routes, Route } from "react-router-dom";
import { AppRoutes } from "../../../constants/routes.constants";
import Home from "../../../pages/Home";

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path={AppRoutes.home()} element={<Home />} />
      <Route path={AppRoutes.fallback()} element={<Home />} />
    </Routes>
  );
}
