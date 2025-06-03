import { ShopContext } from '@/context/ShopContext';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ARMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { categorizedProducts } = useContext(ShopContext)
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate()

  return (
    <div className='absolute top-20 right-4 flex flex-col items-end '>
      <div className='bg-white-light py-2 px-5 mb-6 max-w-fit rounded-lg shadow-md cursor-pointer'>
        <p onClick={() => setMenuVisible(!menuVisible)} className='p-xl text-xl font-bold'>{menuVisible ? 'Close' : 'Menu'}</p>
      </div>
      {
        menuVisible && (
          <div className="bg-white shadow-lg rounded-lg w-64 p-4 max-h-96 overflow-scroll border border-gray-300">
            <h2 className="text-lg font-bold text-black">AR Menu</h2>
            <ul className="mt-2 space-y-2">
              {
                selectedCategory.length > 0 && menuVisible
                  ?
                  categorizedProducts[selectedCategory].map((item, index) => (
                    <li
                      key={index}
                      className={`flex justify-between text-md text-gray-700`}
                      onClick={() => {navigate(`/product/ar/${item._id}`);setSelectedCategory(''); setMenuVisible(false)}}
                    >
                      {item.name}
                    </li>
                  )) : menuVisible && Object.entries(categorizedProducts).map(([key, value]) => (
                    <li
                      key={key}
                      className={`flex justify-between text-md text-gray-700`}
                      onClick={() => setSelectedCategory(key)}
                    >
                      {key}
                      <span className="text-gray-500 text-md">{value.length}</span>
                    </li>
                  ))
              }
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default ARMenu