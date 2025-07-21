import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import CartButton from '../components/CartButton';
import { Link } from 'react-router-dom';
import Layout from './Layout';


const ProductCard = ({ product }) => {
  const { currency } = useContext(ShopContext)

  return (
    <div className="flex items-center justify-between border-b py-6 shadow-md px-2">
      {/* Left Section - Product Info */}
      <div className="flex items-center gap-3">
        <img src={product.image.replace("w800-h800","w200-h200")} className='h-12 aspect-square rounded-md' alt="" />
        <div>
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
          <p className="text-gray-500">{currency} {product.price}</p>
        </div>
      </div>

      {/* Right Section - Quantity Controls & Total */}
      <div className="">
        <CartButton itemId={product._id}/>
        {/* <p className="font-semibold">{currency} {product.price * product.quantity || "NaN"}</p> */}
      </div>
    </div>
  );
};

const CartSummary = ({ total }) => {
  const { currency, deliveryFee } = useContext(ShopContext)

  return (
    <div className="bg-white p-6 rounded-lg mt-6 border border-white-light shadow-md">
      <h2 className="font-bold text-lg mb-4 flex items-center">
        <span className="border-l-4 border-primary pl-2">Bill Summary</span>
      </h2>
      <div className="flex justify-between text-gray-700">
        <span>Item Total</span>
        <span>{currency} {total || "NaN"}</span>
      </div>
      <div className="flex justify-between text-gray-700 mt-2">
        <span>Delivery Charges</span>
        <span>{currency} {deliveryFee}</span>
      </div>
      <hr className="my-3" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Grand Total</span>
        <span>{currency} {total + deliveryFee || "NaN"}</span>
      </div>
    </div>
  );
};


const Cart = () => {
  const { cartItems, getProductById } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [total, setTotal ] = useState(0)

  useEffect(() => {
    const tempData = [];
    let tempTotal = 0;

    for (let item in cartItems){
        if (cartItems[item] > 0){
          tempData.push({
            _id: item,
            quantity: cartItems[item],
          })
          tempTotal += cartItems[item] * getProductById(item).price;
      }
    }
    setCartData(tempData);
    setTotal(tempTotal);
  }, [cartItems])

  return (
    <Layout>
      <div className="relative py-20 px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-2 pb-4">
          {cartData.map((product) => {
            const productData = getProductById(product._id);
            productData.quantity = product.quantity;
            return (
              <ProductCard key={product._id} product={productData} />
            )
          })}
        </div>

        <CartSummary total={total} />
        

        {/* Fixed Bottom Section */}
        <Link to="/login" className="fixed bottom-4 left-0 right-0 p-6 flex justify-center">
          <button className="bg-primary w-full text-white font-bold tracking-wider text-lg px-6 py-4 rounded-lg shadow-md">
            Checkout
          </button>
        </Link>
      </div>
    </Layout>
  );
}

export default Cart