/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Aside } from "../dashboard/aside";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import PaginationComponent from "../../../components/common/pagination";
import { useNavigate } from "react-router-dom";
import { CommonRoutes } from "../../../../routes";

interface IFormInput {
  name: string;
  price: number;
  file: File;
}

const MyStore = ({
  page: pageParam,
  search: searchParam,
  pageSize: pageSizeParam,
}: {
  page: number;
  search: string;
  pageSize: number;
}) => {
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const { id } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(pageParam);
  const [search, setSearch] = useState<string>(searchParam);
  const [pageSize] = useState<number>(pageSizeParam);
  const [meta, setMeta] = useState<any>({});
  const navigate = useNavigate();
  const getAllProductsOfAdmin = async (
    userId: string,
    search: string = "",
    page: number = 1,
    pageSize: number = 8
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/${userId}?search=${search}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      console.log("response", response);
      // console.log("data", response.data);
      setProducts(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProductsOfAdmin(id, search, page, pageSize);
  }, [id]);

  useEffect(() => {
    let pageData = page;
    if (search) {
      pageData = 1;
      setPage(1);
    }
    navigate(
      `${CommonRoutes.MY_STORE}?page=${pageData}&search=${search}&pageSize=${pageSize}`,
      {
        replace: true,
      }
    );
  }, [navigate, page, search, pageSize]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  // getAllProductsOfAdmin(id);
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
      // console.log("Upload successful", formData);
      reset();
      setShowModal(false);
      getAllProductsOfAdmin(id);
    } catch (error) {
      console.log("error in uploading file", error);
    }
  };
  console.log(products);
  return (
    <div className="flex h-full bg-blue-950">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-white">My Store</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
        <p className="text-white hover:text-blue-500 text-2xl">My Products</p>
        <div className="w-full mt-5 sm:ml-10">
          {products.length > 0 ? (
            <>
              <div className="flex gap-10 flex-wrap">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="bg-white shadow-md p-4 w-[25rem] h-[25rem] rounded-lg hover:shadow-lg hover:shadow-blue-500/50 hover:cursor-pointer"
                  >
                    <img
                      src={`http://localhost:4000/uploads/${product.imageUrl}`}
                      alt={product.name}
                      // width={400}
                      // height={400}
                      className="w-full h-[220px] object-contain mb-2 rounded-lg"
                    />
                    <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                    <p className="text-gray-600 mb-1">${product.price}</p>
                  </article>
                ))}
              </div>
              <div>
                {meta ? (
                  <PaginationComponent
                    currentPage={meta.currentPage}
                    next={meta.next as number}
                    perPage={meta?.perPage}
                    prev={meta.prev as number}
                    total={meta?.total}
                    totalPages={meta.lastPage}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <h1 className="text-white">NO PRODUCTS TO DISPLAY</h1>
          )}
        </div>
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
};
export default MyStore;
