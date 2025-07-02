# 🛍️ ShoppyGlobe - E-commerce React Application

ShoppyGlobe is a simple yet modern e-commerce application built using **React**, **Redux Toolkit**, and **Tailwind CSS**. It showcases core frontend skills including dynamic product listing, cart functionality, search filtering, routing, and responsive design.

---

## 📌 Project Features

### 🧩 Component Structure

- **App** – Root component that includes routing and layout
- **Header** – Navigation bar with site title, search bar, and cart icon
- **ProductList** – Displays a list of products fetched from the API
- **ProductItem** – A single product card with image, title, price, and "Add to Cart"
- **ProductDetail** – View detailed information of a selected product
- **Cart** – Displays all cart items with options to change quantity or remove
- **CartItem** – Each item in the cart
- **NotFound** – 404 Page for undefined routes
- **Loader** – A full-screen loading spinner during lazy loading
- **CartNotification** – A toast-style popup shown when items are added to the cart

### 📦 Functional Highlights

- 🔄 **Data Fetching** from `https://dummyjson.com/products`
- 🔍 **Live Product Search** by title, brand, or category (Redux-managed)
- 🛒 **Cart Features:**
  - Add products to cart
  - Increase or decrease quantity
  - Remove items
  - Auto-calculate subtotal
- 🔗 **Product Detail Pages** via route parameters
- 💾 **State Management** using Redux Toolkit
- 📱 **Responsive UI** with Tailwind CSS
- ⚡ **Code Splitting & Lazy Loading** with `React.lazy` & `Suspense`
- 🛑 **404 Page** for unknown routes
- ✅ **Toast Notification** for successful cart actions on home page

---

## 🧱 Tech Stack

| Technology       | Purpose                             |
| ---------------- | ----------------------------------- |
| React            | Frontend framework                  |
| Redux Toolkit    | Global state management             |
| React Router DOM | Page routing                        |
| Tailwind CSS     | Utility-first CSS framework         |
| Vite             | Lightning-fast frontend build tool  |
| Font Awesome     | UI icons (cart, trash, stars, etc.) |

---

---

## 🧪 How to Run This Project Locally (💻)

Follow these simple steps to run the project on your local system:

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/GitAvinash003/shoppy-globe-ecommerce.git
cd shoppy-globe-ecommerce-main
#install dependency 
npm install
#start App 
npm run dev
#visit browser
Visit the app at 👉 http://localhost:5173


```
