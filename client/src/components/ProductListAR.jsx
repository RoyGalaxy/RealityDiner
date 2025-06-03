import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate, useParams } from "react-router-dom";
import CartButton from "./CartButton";

// const products = [
//   {
//     id: 1,
//     name: "Chargrilled Smoky...",
//     description: "A succulent Volcano beef patty, chargrilled to perfection...",
//     price: "AED 68",
//     image: "https://via.placeholder.com/80", // Replace with actual image URL
//   },
//   {
//     id: 2,
//     name: "Crispy Chicken...",
//     description: "A crispy chicken patty with aromatic spices...",
//     price: "AED 38",
//     image: "https://via.placeholder.com/80",
//   },
//   {
//     id: 3,
//     name: "Grilled Veggie...",
//     description: "A delicious grilled veggie patty with fresh greens...",
//     price: "AED 42",
//     image: "https://via.placeholder.com/80",
//   },
// ];

const ProductCard = ({ product }) => {
  const {currency} = useContext(ShopContext)
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/product/ar/${product._id}`)} className="relative w-4/5 bg-white p-4 pb-0 rounded-lg shadow-md border border-gray-200 flex-shrink-0">
      {/* Product Name (One Line with Ellipsis) */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-base w-[85%] truncate">{product.name}</h3>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>

      {/* Product Description (Two Lines Max with Ellipsis) */}

      {/* Price & Add Button */}
      <div className="my-3">
        <span className="text-lg font-semibold">{currency} {product.price}</span>
      </div>
        <CartButton itemId={product._id}/>
    </div>
  );
};



const ProductListAR = () => {
  const { id } = useParams()
  const {getProductById, getProductsByCategory } = useContext(ShopContext)
  const product = id ? useMemo(() => getProductById(id)) : undefined
  const products = product?.category ? useMemo(() => getProductsByCategory(product?.category)) : undefined

  return (
    <div className="overflow-x-auto whitespace-nowrap px-4 py-2 fixed left-0 bottom-6 w-full">
      <div className="flex gap-4 flex-nowrap">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
    
  );
};

export default ProductListAR;
