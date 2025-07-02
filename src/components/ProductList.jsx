import React, { useState, useEffect } from 'react'
import useFetchProducts from '../hooks/useFetchProducts'
import ProductItem from './ProductItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'

export default function ProductList() {
  const { products, error, loading } = useFetchProducts()
  const [search, setSearch] = useState('')
  const [sortOption, setSortOption] = useState('default')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [showFilters, setShowFilters] = useState(false)
  
  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))]

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch(sortOption) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        default: return 0
      }
    })

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Error Loading Products</h3>
          <p className="mb-4">We encountered an issue fetching the product data.</p>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with search and filters */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Premium Collection</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our curated selection of premium products crafted for excellence
        </p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search premium products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Toggle Button (Mobile) */}
          <button 
            className="md:hidden flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-3 pl-4 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <FontAwesomeIcon icon={faSort} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <div className={`mt-6 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-3 text-gray-700 capitalize">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="relative pt-1">
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Min</label>
                    <input
                      type="number"
                      min="0"
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Max</label>
                    <input
                      type="number"
                      min={priceRange[0]}
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <div className="bg-blue-50 rounded-lg p-4 w-full">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredProducts.length}</span> of {products.length} premium products
                </p>
                {(search || selectedCategory !== 'all' || priceRange[1] < 2000) && (
                  <button 
                    className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800 transition"
                    onClick={() => {
                      setSearch('')
                      setSelectedCategory('all')
                      setPriceRange([0, 2000])
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="bg-gray-200 animate-pulse h-60"></div>
              <div className="p-5">
                <div className="bg-gray-200 animate-pulse h-4 rounded w-3/4 mb-3"></div>
                <div className="bg-gray-200 animate-pulse h-4 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between">
                  <div className="bg-gray-200 animate-pulse h-6 rounded w-1/4"></div>
                  <div className="bg-gray-200 animate-pulse h-6 rounded w-1/4"></div>
                </div>
                <div className="bg-gray-200 animate-pulse h-10 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {!loading && filteredProducts.length > 0 ? (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      ) : null}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-2xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter to find what you're looking for
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
              onClick={() => {
                setSearch('')
                setSelectedCategory('all')
                setPriceRange([0, 2000])
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}