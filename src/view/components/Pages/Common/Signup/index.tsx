/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { CommonRoutes } from "../../../../../routes";
// import { Input } from "../../../common/Input/Input";
import {
  // Controller,
  // FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    control,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<IFormInput>();
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
      reset();
      navigate(CommonRoutes.LOGIN);
    } catch (error) {
      console.log("an error occured", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-screen bg-slate-50 flex justify-center items-center">
        <div className="bg-white flex flex-col items-center gap-6 w-[650px] rounded-lg h-fit mx-auto py-10 px-10">
          <input
            type="text"
            placeholder="First Name"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("firstName", { required: true })}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("lastName", { required: true })}
          />
          <input
            type="text"
            placeholder="Email"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("password", { required: true, minLength: 8 })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-white border-2 border-blue-950 px-2 py-4 rounded-md w-full text-lg"
            {...register("confirmPassword", { required: true, minLength: 8 })}
          />
          <select {...register("role")}>
            <option value="CUSTOMER">customer</option>
            <option value="ADMIN">admin</option>
          </select>
          <button className="w-full bg-gray-800 text-white py-5 rounded-lg text-lg">
            Signup
          </button>
          <p>
            Already have an account? <Link to={CommonRoutes.LOGIN}>Login</Link>{" "}
          </p>
        </div>
      </div>
    </form>
  );
};
