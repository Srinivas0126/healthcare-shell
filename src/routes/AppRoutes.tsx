import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { remoteApps } from "../mfes/registry";
import LoginPage from "../pages/LoginPage";
import RemoteRoute from "../mfes/RemoteRoute";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<LoginPage />} path="/login" />

      <Route element={<ProtectedRoute />}>
        <Route element={<Navigate replace to="/health-records" />} path="/claims/*" />
        {remoteApps.map((remoteApp) => (
          <Route
            element={<RemoteRoute remoteApp={remoteApp} />}
            key={remoteApp.id}
            path={`${remoteApp.basePath}/*`}
          />
        ))}
      </Route>

      <Route element={<NotFoundPage />} path="/404" />
      <Route element={<Navigate replace to="/404" />} path="*" />
    </Routes>
  );
};

export default AppRoutes;
