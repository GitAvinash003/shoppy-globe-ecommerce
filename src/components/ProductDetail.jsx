import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

import Loader from './Loader'

export default function ProductDetail() {
  const [showPopup, setShowPopup] = useState(false)
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => setError(err.message))
  }, [id])

  const handleAdd = () => {
    dispatch(addToCart(product))
    
  }
  

  if (error) return <p className="text-red-500">Error loading product: {error}</p>
  if (!product) return <Loader/>

  return (
    

    <div className="p-6 max-w-4xl mx-auto">
      
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mb-4">${product.price}</p>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

    
    
  )
}
