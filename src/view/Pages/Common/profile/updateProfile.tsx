import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";

interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  imageUrl: string;
}
interface UpdateUserProps {
  isUpdateModal: boolean;
  closeUpdateModal: () => void;
  userDetails: UserDetails;
}

export const UpdateProfileModal: React.FC<UpdateUserProps> = ({
  isUpdateModal,
  closeUpdateModal,
  userDetails,
}) => {
  const auth = useAppSelector((state: { auth: any }) => state.auth);

  const { register, handleSubmit, reset } = useForm<UserDetails>();

  const onSubmit: SubmitHandler<UserDetails> = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data?.first_name);
    formData.append("last_name", data?.last_name);
    formData.append("file", data?.file[0]);

    try {
      const response = await axios.put(
        `http://localhost:4000/api/user/update/${userDetails.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      setTimeout(() => {
        closeUpdateModal();
      }, 500);
      // Rest of your code
    } catch (error) {
      console.log("error in uploading file", error);
    }
  };
  return (
    <>
      {isUpdateModal && (
        <div className="fixed top-0 right-1/3 w-1/2 h-[600px] bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white rounded-lg p-4 w-11/12 h-[600px] flex flex-col items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-blue-950">
              Update Profile
            </h2>
            <img
              src={`http://localhost:4000/uploads/${userDetails?.imageUrl}`}
              alt="profile"
              className="h-40 w-40 rounded-full"
            />
            {/* Add form fields to update product details */}
            {/* You can use productDetails to prefill the form fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-4 w-full">
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 font-bold mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  defaultValue={userDetails?.first_name}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter first name"
                  {...register("first_name")}
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  defaultValue={userDetails?.last_name}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter  last name"
                  {...register("last_name")}
                />
              </div>

              <div className="mb-4 w-full">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  {...register("file")}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Add form submission and cancel button */}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-7 rounded"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-7 rounded mr-4"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
