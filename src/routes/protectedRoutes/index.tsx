import * as React from "react";
import { VFC } from "react";
import { Navigate, Outlet, RoutesProps } from "react-router-dom";

interface Props extends RoutesProps {
  isAllowed: boolean;
  redirect: string;
}
export const ProtectedRoutes: VFC<Props> = ({
  isAllowed,
  redirect,
  ...rest
}) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirect} />;
};
