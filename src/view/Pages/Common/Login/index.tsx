/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { CommonRoutes } from "../../../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { useDispatch } from "react-redux";
import { setAuth } from "../../../../modules/auth/action";
import { setUser } from "../../../../modules/user/action";
import { yupResolver } from '@hookform/resolvers/yup';

import {
  // Controller,
  // FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import axios, { AxiosError } from "axios";
import { LoginUser } from "../../../../utils/schema";
import { ToastContainer,toast } from "react-toastify";
interface IFormInput {
  email: string;
  password: string;
}
export const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(LoginUser())
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data
      );
      if (response.status === 200) {
        toast.success("Account created successfully");
        console.log(response.data.data.token.access_token);
        dispatch(
          setAuth({
            access_token: response.data.data.token.access_token,
          })
        );
        dispatch(
          setUser({
            id: response.data.data.user.id,
            firstName: response.data.data.user.first_name,
            lastName: response.data.data.user.last_name,
            email: response.data.data.user.email,
            role: response.data.data.user.role,
            imageUrl: response.data.data.user.image_url,
          })
        );
      }else {
        toast.error(response.data.message)
      }

      const isAdmin = response.data.data.user.role === "ADMIN";
      const isCustomer = response.data.data.user.role === "CUSTOMER";
      if (isAdmin) {
        navigate(CommonRoutes.ADMIN_PAGE);
      } else if (isCustomer) {
        navigate(CommonRoutes.HOME_PAGE);
      }
    } catch (error:AxiosError) {
      console.log("an error occured", error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };
  return (
    <>
    <ToastContainer/>
    
    <div className="w-screen h-screen bg-slate-50 flex justify-center items-center flex-col gap-2">
    <div>

    <h2 className="font-bold text-5xl mb-2">YUSHIN</h2>
    </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white flex flex-col items-center gap-6 w-[660px] rounded-lg h-fit mx-auto py-10 px-10">
          <input
            type="text"
            placeholder="Email"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-[600px] text-lg"
            {...register("email")}
          />
          {errors.email && <p role="alert" className="text-red-500">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-[600px] text-lg"
            {...register("password")}
          />
          {errors.password && <p role="alert" className="text-red-500">{errors.password.message}</p>}

          <button className="w-[600px] bg-gray-800 text-white py-5 rounded-lg text-lg">
            Login
          </button>
          <p>
            Don't have an account? <Link to={CommonRoutes.SIGNUP}>Signup</Link>{" "}
          </p>
        </div>
      </form>
    </div>
    </>
  );
};
