/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
// import { Aside } from "../dashboard/aside";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import PaginationComponent from "../../../components/common/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { CommonRoutes } from "../../../../routes";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface IFormInput {
  name: string;
  price: number;
  description: string;
  quantity: string;
  file: File;
}

const MyStore = () => {
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const { id } = useAppSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(9);
  const [meta, setMeta] = useState<any>({});
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  // useEffect(() => {
  //   // Set initial page, search, and pageSize from URL params
  //   setPage(parseInt(params.page) || 1);
  //   setSearch(params.search || "");
  //   setPageSize(parseInt(params.pageSize) || 9);
  // }, [params]);
  const userId = id;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/${userId}?search=${search}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      console.log("Response:", response.data);
      setProducts(response.data.data);
      setMeta(response.data.meta);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // let pageData = page;
    // if (search) {
    //   pageData = 1;
    //   setPage(1);
    // }
    navigate(
      `${CommonRoutes.MY_STORE}?page=${page}&search=${search}&pageSize=${pageSize}`,
      {
        replace: true,
      }
    );
    fetchData();
  }, [navigate, page, search, pageSize]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  // getAllProductsOfAdmin(id);
  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  };

  const handleCreateProduct = (product) => {
    // Implement your product creation logic here
    setShowModal(false);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("file", data.file[0]);
    formData.append("description", data.description);
    formData.append("quantity", data.quantity);
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
      fetchData();
    } catch (error) {
      console.log("error in uploading file", error);
    }
  };
  console.log(products);
  return (
    <div className="flex h-full bg-blue-950 overflow-x-hidden p-10 ml-10">
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
          {products?.length > 0 ? (
            <>
              <div className="flex gap-10 flex-wrap">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="bg-slate-100  shadow-md p-4 w-[25rem] h-[25rem] rounded-lg hover:shadow-lg hover:shadow-blue-500/50 hover:cursor-pointer"
                  >
                    <img
                      src={`http://localhost:4000/uploads/${product?.imageUrl}`}
                      alt={product?.name}
                      // width={400}
                      // height={400}
                      className="w-full h-[220px] object-contain mb-2 rounded-lg"
                    />
                    <NavLink to={`/admin/product/${product?.id}`}>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold mb-1">
                          {product?.name}
                        </h2>
                        <p className="text-gray-600 mb-1 font-bold ">
                          ${product?.price}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-1">
                        {product?.description?.length > 150
                          ? `${product?.description?.substring(0, 150)}...`
                          : product.description}
                      </p>
                    </NavLink>
                  </article>
                ))}
              </div>
              <div className="pb-10">
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
          <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white shadow-md p-4 rounded w-1/2">
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
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product description"
                    {...register("description", {
                      required: true,
                    })}
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
                    {...register("price", { required: true, min: 1 })}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="quantity"
                    className="block text-gray-700 font-bold mb-1"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product quantity"
                    {...register("quantity", { required: true, min: 1 })}
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
