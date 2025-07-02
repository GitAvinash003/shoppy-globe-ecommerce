import React from 'react'

export default function AddToCartPopup({ message, onClose }) {
  return (
    <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-green-600 text-xl font-bold mb-2">✅ {message}</h2>
        <p className="text-gray-600 text-sm">Product successfully added to your cart.</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  )
}
