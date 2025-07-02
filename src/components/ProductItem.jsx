import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddToCartPopup from './AddToCartPopup'
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function ProductItem({ product }) {
  const dispatch = useDispatch()
  const [showPopup, setShowPopup] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    dispatch(addToCart(product))
    setShowPopup(true)
    
    setTimeout(() => setShowPopup(false), 2000)
  }

  return (
    <>
      {showPopup && (
        <AddToCartPopup
          message={`${product.title} added to cart!`}
          onClose={() => setShowPopup(false)}
        />
      )}

      <div 
        className="relative border border-gray-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Wishlist button */}
        <button className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:bg-red-500 hover:text-white transition-all">
          <FontAwesomeIcon icon={faHeart} className="text-gray-400 hover:text-white" />
        </button>

        {/* Product image with hover effect */}
        <Link to={`/product/${product.id}`} className="block overflow-hidden">
          <div className="relative h-60 overflow-hidden bg-gray-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className={`h-full w-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            {/* Premium tag */}
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
              PREMIUM
            </span>
          </div>
        </Link>

        {/* Product info */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {product.brand}
            </span>
            <Link to={`/product/${product.id}`}>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
                {product.title}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500 capitalize">{product.category}</p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs line-through text-gray-400">
                      ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
                    </span>
                    <span className="text-xs font-medium bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
                <span className="text-amber-500 font-medium">{product.rating}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>

            {/* Add to cart button with hover effect */}
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 rounded-lg hover:from-blue-800 hover:to-blue-900 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-medium transform hover:-translate-y-0.5"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Floating discount tag */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-0 right-0">
            <div className="absolute transform rotate-45 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold py-6 px-10 top-4 -right-10 shadow-md" />
            <span className="absolute top-4 right-2 text-white font-bold text-xs">
              SAVE {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
    </>
  )
}