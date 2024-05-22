/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "../../../routes/protectedRoutes";
import { CommonRoutes } from "../../../routes";
import { Signup } from "../../Pages/Common/Signup";
import Home from "../../Pages/User/Home";
import { Login } from "../../Pages/Common/Login";
import { useAppSelector } from "../../../store/hooks";
import AdminDashboard from "../../Pages/Admin/dashboard";
import MyStore from "../../Pages/Admin/store";
import AdminLayout from "../layout/admin-layout";

export const App: FC = () => {
  const { email, role } = useAppSelector((state: { user: any }) => state.user);
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const isAuth = Boolean(auth);
  const isAllowed = isAuth;
  const isAdmin = role === "ADMIN";
  const isCustomer = role === "CUSTOMER";
  console.log("isCustomer", isCustomer);
  const isAuthenticated = Boolean(role);
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoutes
            isAllowed={!isAuthenticated}
            redirect={
              isAdmin
                ? CommonRoutes.ADMIN_PAGE
                : isCustomer
                ? CommonRoutes.HOME_PAGE
                : CommonRoutes.LOGIN
            }
          />
        }
      >
        <Route path={CommonRoutes.SIGNUP} element={<Signup />} />
        <Route path={CommonRoutes.LOGIN} element={<Login />} />
        <Route element={<Navigate to={CommonRoutes.LOGIN} />} path="/" />
        <Route element={<Navigate to={CommonRoutes.LOGIN} />} path="*" />
      </Route>
      {/* <Route element={<AdminLayout />}>
        {isAdmin ? (
          <Route
            element={
              <ProtectedRoutes
                isAllowed={isAdmin}
                redirect={CommonRoutes.ADMIN_PAGE}
              />
            }
          >
            <Route
              path={CommonRoutes.ADMIN_PAGE}
              element={<AdminDashboard />}
            />
            <Route path={CommonRoutes.MY_STORE} element={<MyStore />} />
          </Route>
        ) : isCustomer ? (
          <Route
            element={
              <ProtectedRoutes
                isAllowed={isCustomer}
                redirect={CommonRoutes.HOME_PAGE}
              />
            }
          >
            <Route path={CommonRoutes.HOME_PAGE} element={<Home />} />
          </Route>
        ) : (
          <Route path={CommonRoutes.LOGIN} element={<Login />} />
        )}
      </Route> */}
      <Route element={<AdminLayout />}>
        {isAdmin ? (
          <>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={isAdmin}
                  redirect={CommonRoutes.ADMIN_PAGE}
                />
              }
            >
              <Route
                path={CommonRoutes.ADMIN_PAGE}
                element={<AdminDashboard />}
              />
              <Route path={CommonRoutes.MY_STORE} element={<MyStore />} />
            </Route>
          </>
        ) : null}
      </Route>
      <Route>
        {isCustomer ? (
          <>
            <Route
              element={
                <ProtectedRoutes
                  isAllowed={isCustomer}
                  redirect={CommonRoutes.HOME_PAGE}
                />
              }
            >
              <Route path={CommonRoutes.HOME_PAGE} element={<Home />} />
            </Route>
          </>
        ) : null}
      </Route>

      {/* <Route path={CommonRoutes.LOGIN} element={<Login />} /> */}
    </Routes>
  );
};
