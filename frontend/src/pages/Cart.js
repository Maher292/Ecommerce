import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import displayINRCurrency from "../helpers/displayCurrency";
import {
  deleteCartProduct,
  getCartProducts,
  increastQty,
} from "../store/cartSlice";

const Cart = () => {
  const data = useSelector((state) => state.cart.cart);
  const isLoadingCart = useSelector((state) => state.cart.isLoadingCart);
  const loadingCart = new Array(4).fill(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(SummaryApi.addToCartProductView.url, {
  //       method: SummaryApi.addToCartProductView.method,
  //       credentials: "include",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     });

  //     const responseData = await response.json();

  //     if (responseData.success) {
  //       setData(responseData.data);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  // const handleLoading = async () => {
  //   try {
  //     setLoading(true);
  //     await fetchData();
  //   } catch (err) {
  //     console.log(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    dispatch(getCartProducts());
  }, []);

  function increaseQuantity(id, quantity) {
    dispatch(increastQty({ id, qty: quantity }));
  }

  function decraseQuantity(id, quantity) {
    dispatch(decraseQuantity({ id, qty: quantity }));
  }

  function deleteProduct(id) {
    dispatch(deleteCartProduct(id));
  }
  // const increaseQty = async (id, qty) => {
  //   const response = await fetch(SummaryApi.updateCartProduct.url, {
  //     method: SummaryApi.updateCartProduct.method,
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       _id: id,
  //       quantity: qty + 1,
  //     }),
  //   });

  //   const responseData = await response.json();

  //   if (responseData.success) {
  //     fetchData();
  //   }
  // };

  // const decraseQty = async (id, qty) => {
  //   if (qty >= 2) {
  //     const response = await fetch(SummaryApi.updateCartProduct.url, {
  //       method: SummaryApi.updateCartProduct.method,
  //       credentials: "include",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         _id: id,
  //         quantity: qty - 1,
  //       }),
  //     });

  //     const responseData = await response.json();

  //     if (responseData.success) {
  //       fetchData();
  //     }
  //   }
  // };

  // const deleteCartProduct = async (id) => {
  //   const response = await fetch(SummaryApi.deleteCartProduct.url, {
  //     method: SummaryApi.deleteCartProduct.method,
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       _id: id,
  //     }),
  //   });

  //   const responseData = await response.json();

  //   if (responseData.success) {
  //     fetchData();
  //     context.fetchUserAddToCart();
  //   }
  // };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto p-6">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !isLoadingCart && (
          <p className="bg-white py-5">{t("cart.noData")}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {isLoadingCart
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        alt={`product-${index}`}
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQuantity(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQuantity(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {isLoadingCart ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-white">
              <h2 className="text-white bg-primary-900 px-4 py-1">{t("cart.summary")}</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>{t("cart.quantity")}</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>{t("cart.totalPrice")}</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
