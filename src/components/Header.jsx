import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChevronDown, faSearch, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const cartItems = useSelector((state) => state.cart)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const location = useLocation()

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
      {/* Top Utility Bar */}
      
      
      {/* Main Navigation */}
      <div className="max-w-7xl f  mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center">
        {/* Logo */}
        <div className="flex  items-center justify-between mb-3 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-blue-800 flex items-center">
            <span className="bg-blue-800  text-yellow-400 px-2 py-1 mr-1 rounded">S</span>
            hoppyGlobe
          </Link>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

       

        {/* Navigation Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/account" className="flex flex-col items-center text-gray-700 hover:text-blue-700">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            <span className="text-xs mt-1">Account</span>
          </Link>
          <Link to="/cart" className="relative flex flex-col items-center text-gray-700 hover:text-blue-700">
            <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            <span className="text-xs mt-1">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-gray-100 border-t border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto space-x-6">
          <Link to="/" className={`whitespace-nowrap py-1 ${location.pathname === '/' ? 'text-blue-700 font-semibold border-b-2 border-blue-700' : 'text-gray-600 hover:text-blue-700'}`}>
            Home
          </Link>
          
          <div className="relative group">
            <button className="whitespace-nowrap py-1 text-gray-600 hover:text-blue-700 flex items-center">
              Categories <FontAwesomeIcon icon={faChevronDown} className="text-xs ml-1" />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-1 w-48 z-20 border border-gray-200">
              <Link to="/electronics" className="block px-4 py-3 hover:bg-blue-50 border-b border-gray-100">Electronics</Link>
              <Link to="/fashion" className="block px-4 py-3 hover:bg-blue-50 border-b border-gray-100">Fashion</Link>
              <Link to="/home-garden" className="block px-4 py-3 hover:bg-blue-50 border-b border-gray-100">Home & Garden</Link>
              <Link to="/sports" className="block px-4 py-3 hover:bg-blue-50">Sports</Link>
            </div>
          </div>
          
          <Link to="/deals" className="whitespace-nowrap py-1 text-red-600 hover:text-red-800 font-medium">
            Daily Deals
          </Link>
          <Link to="/brands" className="whitespace-nowrap py-1 text-gray-600 hover:text-blue-700">
            Brands
          </Link>
          <Link to="/sell" className="whitespace-nowrap py-1 text-gray-600 hover:text-blue-700">
            Sell
          </Link>
        </div>
      </div>
    </header>
  )
}