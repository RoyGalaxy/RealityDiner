import React, { useContext, useEffect, useState } from 'react'
import Counter from './reactbits/Counter'
import { ShopContext } from '../context/ShopContext'


const CartButton = ({componentStyle, text, itemId}) => {
  const { addToCart, cartItems } = useContext(ShopContext)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if(cartItems && cartItems[itemId] > 0){
      setCount(cartItems[itemId])
    }
  }, [cartItems])

  const incrementCount = (e) => {
    e.stopPropagation();

    addToCart(itemId, count + 1)
  }

  const decrementCount = (e) => {
    e.stopPropagation();
    
    addToCart(itemId, count - 1)
    if(count == 1){
      setCount(0)
    }
  }

  return (
    <div style={componentStyle || {}} className='cursor-pointer'>
      {count > 0 ? (
        <div className='flex max-w-fit items-center justify-center sm:gap-2 sm:p-2 gap-1 p-1 sm:px-3 px-2 bg-primary rounded-lg -ml-1 mb-4'>
          <p onClick={decrementCount} className='text-white-soft font-bold text-3xl -mt-2'>-</p>
            <Counter
              value={count}
              places={[100, 10, 1]}
              fontSize={18}
              padding={5}
              gap={4}
              textColor="white"
              fontWeight={600}
              gradientFrom=''
              gradientTo=''
            />
          <p onClick={incrementCount} className='text-white-soft font-bold text-2xl -mt-1'>+</p>
        </div>
      ) : (
        <div  onClick={incrementCount} className='flex max-w-fit items-center justify-center p-2 px-4 bg-primary rounded-lg -ml-1 mb-4'>
          <p className='text-white font-semibold text-lg'>{text || 'Add To Cart'}</p>
        </div>
      )}
    </div>
  )
}

export default CartButton