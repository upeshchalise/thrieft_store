import React, { useState } from "react";
import { Aside } from "../dashboard/aside";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";

interface IFormInput {
  name: string;
  price: number;
  file: File;
}

const products = [
  { id: 1, name: "brown hook", price: 100, image: "/Rectangle_27.png" },
  { id: 2, name: "grey hook", price: 200, image: "/Rectangle_28.png" },
  { id: 3, name: "blue hook", price: 300, image: "/Rectangle_29.png" },
];

export default function MyStore() {
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateProduct = (product) => {
    // Implement your product creation logic here
    setShowModal(false);
  };
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("file", data.file[0]);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      console.log("Upload successful", formData);
      reset();
      setShowModal(false);
    } catch (error) {
      console.log("error in uploading file", error);
    }
  };
  return (
    <div className="flex h-screen bg-blue-950">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">My Store</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <p className="text-white hover:text-blue-500 text-2xl">My Products</p>
        {/* <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4"> */}
        <ul className="flex gap-3">
          {products.map((product) => (
            <li key={product.id} className="bg-white shadow-md p-4 w-60">
              <img
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-auto object-cover mb-2"
              />
              <h2 className="text-lg font-bold mb-1">{product.name}</h2>
              <p className="text-gray-600 mb-1">${product.price}</p>
            </li>
          ))}
        </ul>
        {showModal && (
          <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white shadow-md p-4 rounded">
              <h2 className="text-lg font-bold mb-2">Create Product</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product name"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product price"
                    {...register("price", { required: true })}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="image"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    {...register("file", { required: true })}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Create
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
