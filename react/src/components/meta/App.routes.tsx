import { Route, Routes } from "react-router-dom";

import AuthenticatedApp from "./auth/AuthenticatedApp";
import UnauthenticatedApp from "./auth/UnauthenticatedApp";
import { AppRoutes as appRoutes } from "../../constants/routes.constants";
import { useEffect } from "react";
import { chatState } from "./Context/ChatProvider";
import Home from "../../pages/Home";

export function AppRoutes() {
  const data: string | any = localStorage.getItem("auth");
  const token = JSON.parse(data)?.accessToken;

  const { auth } = chatState();

  const getAppBasedOnAuth = () => {
    if (token || auth) {
      return (
        <Routes>
          <Route path={appRoutes.home()} element={<Home />} />
          {/* <Route path={AppRoutes.fallback()} element={<Home />} /> */}
        </Routes>
      );
    }
    if (!token || !auth) {
      return <UnauthenticatedApp />;
    }

    return <UnauthenticatedApp />;
  };

  return (
    <Routes>
      <Route path={appRoutes.fallback()} element={getAppBasedOnAuth()} />
    </Routes>
  );
}
