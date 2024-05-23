import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import { UpdateProduct } from "./updateProduct";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: number;
  imageUrl: string;
}
export const AdminProductDetailPage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isUpdateModal, setIsUpdateModal] = useState<boolean>(false);
  const { productId } = useParams();

  const [products, setProducts] = useState<ProductDetail>({});
  const navigate = useNavigate();
  const openUpdateModal = () => {
    setIsUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModal(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setTimeout(() => {
          closeDeleteModal();
          navigate("/admin/mystore?page=1&search=&pageSize=9");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      setProducts(response.data);
    };
    fetchProductDetails();
  }, [productId, closeDeleteModal, auth.access_token]);
  return (
    <>
      <h1 className="text-3xl text-white">Product Detail</h1>
      <div className="w-3/4 mx-auto mt-10 p-10 bg-blue-100 h-max rounded-lg">
        <div className="flex justify-center gap-10 items-center h-full">
          <img
            src={`http://localhost:4000/uploads/${products.imageUrl}`}
            alt="product"
            className="w-1/2 rounded-lg h-[400px]"
          />
          <div className="text-3xl flex flex-col gap-5 bg-slate-50 p-5 rounded-lg min-h-[400px] w-1/2">
            <p>Name: {products.name}</p>
            <p>Price: Rs. {products.price}</p>
            <p>Quantity: {products.quantity}</p>
            <p className="text-2xl"> Description: {products.description}</p>
          </div>
        </div>
        <div className="mt-10 flex gap-5 items-center justify-center">
          <button
            className="text-xl font-medium px-10 py-3 text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={openUpdateModal}
          >
            Update
          </button>
          <button
            className="text-xl font-medium px-10 py-3 text-red-600 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white"
            onClick={openDeleteModal}
          >
            Delete
          </button>
        </div>
      </div>
      {isDeleteModal && (
        <div className="fixed top-0 right-1/3 w-1/4 h-full bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white rounded-lg p-4 w-11/12 h-[300px] flex flex-col items-center justify-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4 text-blue-950">
              Delete Confirmation
            </h2>
            <p className="text-blue-950">
              Are you sure you want to delete the product?
            </p>
            <div className="flex justify-center gap-3 mt-4 ">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-7 rounded mr-4"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-7 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <UpdateProduct
        isUpdateModal={isUpdateModal}
        closeUpdateModal={closeUpdateModal}
        productDetails={products}
      />
    </>
  );
};
