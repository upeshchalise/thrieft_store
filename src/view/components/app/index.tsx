import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { useAppSelector } from "../../store/hooks";
import { ProtectedRoutes } from "../../../routes/protectedRoutes";
import { CommonRoutes } from "../../../routes";
import { Signup } from "../Pages/Common/Signup";
import Home from "../Pages/User/Home";
import { Login } from "../Pages/Common/Login";

export const App: FC = () => {
  return (
    <Routes>
      {/* <Route
        element={
          <ProtectedRoutes
            isAllowed={!isAllowed}
            redirect={CommonRoutes.LOGIN}
          />
        }
      > */}
      <Route path={CommonRoutes.HOME_PAGE} element={<Home />} />
      <Route path={CommonRoutes.SIGNUP} element={<Signup />} />
      <Route path={CommonRoutes.LOGIN} element={<Login />} />

      {/* <Route path={CommonRoutes.HOME_PAGE} element={} /> */}
      {/* </Route> */}
    </Routes>
  );
};
