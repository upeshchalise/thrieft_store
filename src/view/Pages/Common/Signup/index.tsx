/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { CommonRoutes } from "../../../../routes";
// import { Input } from "../../../common/Input/Input";
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";import {
  // Controller,
  // FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { createUniversityAccountSchema } from "../../../../utils/schema";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IFormInput>({
    resolver: yupResolver(createUniversityAccountSchema())
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/create",
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          confirm_password: data.confirmPassword,
          role: data.role,
        }
      );
      console.log(response)
      // toast.success("Account created successfully")
      if(response.status === 201) {
        toast.success("Account created successfully");
      }else {
        toast.error(response.data.message)
      }
      reset();
      navigate(CommonRoutes.LOGIN);
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
    <ToastContainer />
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-screen bg-slate-50 flex justify-center items-center flex-col">
      <h2 className="font-bold text-5xl mb-2">YUSHIN</h2>

        <div className="bg-white flex flex-col items-center gap-3 w-[650px] rounded-lg h-fit mx-auto py-10 px-10">
          <input
            type="text"
            placeholder="First Name"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("firstName")}
          />
          {errors.firstName && <p role="alert" className="text-red-500">{errors.firstName.message}</p>}
          <input
            type="text"
            placeholder="Last Name"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("lastName")}
          />
          {errors.lastName && <p role="alert" className="text-red-500">{errors.lastName.message}</p>}
          <input
            type="text"
            placeholder="Email"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("email")}
          />
          {errors.email && <p role="alert" className="text-red-500">{errors.email.message}</p>}
          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("password")}
          />
          {errors.password && <p role="alert" className="text-red-500">{errors.password.message}</p>}
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p role="alert" className="text-red-500">{errors.confirmPassword.message}</p>}
          <select {...register("role")}>
            <option value="CUSTOMER">customer</option>
            {/* <option value="ADMIN">admin</option> */}
          </select>
          {errors.role && <p role="alert" className="text-red-500">{errors.role.message}</p>}
          <button className="w-full bg-gray-800 text-white py-5 rounded-lg text-lg">
            Signup
          </button>
          <p>
            Already have an account? <Link to={CommonRoutes.LOGIN}>Login</Link>{" "}
          </p>
        </div>
      </div>
    </form>
            </>
  );
};
