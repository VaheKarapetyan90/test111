import { Routes, Route, Navigate } from "react-router-dom";
import { AppRoutes } from "../../../constants/routes.constants";
import SignIn from "../../../pages/SignIn";

export default function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path={AppRoutes.singIn()} element={<SignIn />} />
      <Route
        path={AppRoutes.fallback()}
        element={<Navigate replace to={AppRoutes.singIn()} />}
      />
    </Routes>
  );
}
