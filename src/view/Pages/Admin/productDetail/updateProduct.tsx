import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: number;
  imageUrl: string;
}
interface UpdateProductProps {
  isUpdateModal: boolean;
  closeUpdateModal: () => void;
  productDetails: ProductDetail;
}

export const UpdateProduct: React.FC<UpdateProductProps> = ({
  isUpdateModal,
  closeUpdateModal,
  productDetails,
}) => {
  const auth = useAppSelector((state: { auth: any }) => state.auth);

  const { register, handleSubmit, reset } = useForm<ProductDetail>();

  const onSubmit: SubmitHandler<ProductDetail> = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("price", data?.price.toString());
    formData.append("file", data?.file[0]);
    formData.append("description", data?.description);
    formData.append("quantity", data?.quantity);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/product/update/${productDetails.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      // console.log("Upload successful", formData);
      setTimeout(() => {
        closeUpdateModal();
      }, 500);
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
              Update Product
            </h2>
            {/* Add form fields to update product details */}
            {/* You can use productDetails to prefill the form fields */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mb-4 w-full">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  defaultValue={productDetails?.name}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product name"
                  {...register("name")}
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  defaultValue={productDetails?.description}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                  {...register("description")}
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  defaultValue={productDetails?.price}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product price"
                  {...register("price")}
                />
              </div>
              <div className="mb-4 w-full">
                <label
                  htmlFor="quantity"
                  className="block text-gray-700 font-bold mb-1"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  defaultValue={productDetails.quantity}
                  className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product quantity"
                  {...register("quantity")}
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
