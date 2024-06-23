/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
// import { Aside } from "../dashboard/aside";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import axios from "axios";
import PaginationComponent from "../../../components/common/pagination";
import { useNavigate, useParams } from "react-router-dom";
import { CommonRoutes } from "../../../../routes";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Header from "../../../components/common/Header";
import { calculateTotals } from "../../../../modules/cart/action";


const MyStore = () => {
  const auth = useAppSelector((state: { auth: any }) => state.auth);
  const { id } = useAppSelector((state) => state.user);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(9);
  const [meta, setMeta] = useState<any>({});
  const params = useParams();
  const navigate = useNavigate();
const dispatch = useAppDispatch()
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/all/products?search=${search}&page=${page}&pageSize=${pageSize}`,
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
  }, [page, search, pageSize, auth.access_token]);

  useEffect(() => {
    navigate(
      `${CommonRoutes.HOME_PAGE}?page=${page}&search=${search}&pageSize=${pageSize}`,
      {
        replace: true,
      }
    );
    fetchData();
  }, [navigate, page, search, pageSize, fetchData]);
  useEffect(() => {
    fetchData();
  }, [page, search, pageSize, auth.access_token, fetchData]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }
  // getAllProductsOfAdmin(id);

  // console.log(products);
  return (
    <div className="flex h-full bg-blue-950 overflow-x-hidden p-10 ml-10">
      <div>
        <div>

        <Header/>
        </div>
        <input type="text" onChange={handleSearch} className="text-lg py-2 roundend-lg" placeholder="search product"/>
        <div className="w-full mt-5 sm:ml-10">
          {products.length > 0 ? (
            <>
              <div className="flex gap-10 flex-wrap">
                {products.map((product) => (
                  <article
                    key={product.id}
                    className="bg-slate-100  shadow-md p-4 w-[25rem] h-[25rem] rounded-lg hover:shadow-lg hover:shadow-blue-500/50 hover:cursor-pointer"
                  >
                    <img
                      src={`http://localhost:4000/uploads/${product.imageUrl}`}
                      alt={product.name}
                      // width={400}
                      // height={400}
                      className="w-full h-[220px] object-contain mb-2 rounded-lg"
                    />
                    <NavLink to={`/product/${product.id}`}>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold mb-1">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 mb-1 font-bold ">
                          Rs. {product.price}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-1">
                        {product.description.length > 150
                          ? `${product.description.substring(0, 150)}...`
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
      </div>
    </div>
  );
};
export default MyStore;
