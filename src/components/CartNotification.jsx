// src/components/CartNotification.jsx
import React from 'react'

export default function CartNotification({ message }) {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 animate-slide-in">
      ✅ {message}
    </div>
  )
}
