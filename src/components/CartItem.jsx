import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, changeQuantity } from '../redux/cartSlice'

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeFromCart(item.id))
  }

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value)
    if (quantity > 0) {
      dispatch(changeQuantity({ id: item.id, quantity }))
    }
  }

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded" />
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-gray-600">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 p-1 border rounded"
        />
        <button
          onClick={handleRemove}
          className="text-red-600 hover:underline"
        > 
        <FontAwesomeIcon icon="trash" className="text-red-500 mr-2" />
          Remove
        </button>
      </div>
    </div>
  )
}
