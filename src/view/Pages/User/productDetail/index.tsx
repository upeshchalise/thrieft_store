import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import { setCart } from "../../../../modules/cart/action";
import { useDispatch } from "react-redux";

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}
export const ProductDetailPage: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [products, setProducts] = useState<ProductDetail>({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    imageUrl: "",
  });
  //   const navigate = useNavigate();
  //   const openUpdateModal = () => {
  //     setIsUpdateModal(true);
  //   };
  //   const closeUpdateModal = () => {
  //     setIsUpdateModal(false);
  //   };

  //   const openDeleteModal = () => {
  //     setIsDeleteModal(true);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   const closeDeleteModal = useCallback(() => {
  //     setIsDeleteModal(false);
  //   }, [setIsDeleteModal]);

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
  }, [productId, auth.access_token]);
  const addToCart = () => {
    dispatch(setCart(products)); // Dispatching setCart action with the product
  };
  return (
    <>
      <h1 className="text-3xl text-white p-10">Product Detail</h1>
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
        <div className="w-full text-center">
          <button
            className="text-xl mt-4 font-medium px-10 py-3 text-blue-600 rounded-lg border border-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};
