import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQty, decreaseQty } from '../redux/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Cart() {
  const cartItems = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded">
              <div className="flex items-center gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                  <p className="text-sm font-bold text-green-700">Subtotal: ${item.price * item.quantity}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="bg-gray-200 px-2 rounded text-lg"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="bg-gray-200 px-2 rounded text-lg"
                >
                  +
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  <FontAwesomeIcon icon="trash" /> Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="text-right mt-6 font-bold text-xl">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  )
}
