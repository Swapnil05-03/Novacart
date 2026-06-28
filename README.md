![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

# 🛒 NovaCart — Premium Modern E-Commerce Platform

NovaCart is a modern full-stack e-commerce platform built using **React**, **Vite**, **Tailwind CSS**, and **Supabase**. It delivers a complete online shopping experience with secure authentication, product browsing, search, filtering, wishlist, shopping cart, checkout, delivery location, order history, and a powerful admin dashboard for managing products, orders, and users.

The project is designed to resemble a real-world e-commerce application while keeping the code clean, reusable, responsive, and easy to maintain.

> **Status:** Portfolio project under active development. New features and improvements are continuously being added.

---

# 📑 Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Supabase Setup](#supabase-setup)
- [Deployment (Vercel)](#deployment-vercel)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)
- [Resume Highlights](#resume-highlights)
- [Contributors](#contributors)
- [License](#license)

---

# 🌐 Live Demo

Coming Soon...

---

# ✨ Features

## 🛍️ Storefront

- **Authentication** — Email & Password Sign Up/Login, Google OAuth, Forgot Password, Reset Password, Persistent Sessions, Protected Routes.
- **Home Page** — Dynamic Hero Slider, Category Grid, Featured Products, Trending Products, Best Sellers, Promotional Banners.
- **Product Catalog** — Product Grid, Smart Search, Category Filters, Price Filters, Rating Filters, Sorting Options, Pagination.
- **Product Details** — Image Gallery, Product Specifications, Customer Reviews & Ratings, Related Products, Recently Viewed Products, Native Share.
- **Wishlist** — Persistent Wishlist with Smooth Add/Remove Experience.
- **Shopping Cart** — Quantity Controls, Coupon Support, Live Price Breakdown, Shipping Charges, Taxes, Grand Total.
- **Checkout** — Shipping Address, Delivery Location Selection, Order Summary and Demo Checkout Flow.
- **Profile** — Avatar Upload, Personal Information, Order History, Account Settings, Password Update, Theme Preferences.

## 👨‍💼 Admin Panel

- **Dashboard** — Revenue, Orders, Products and Users Overview with Analytics.
- **Product Management** — Add, Edit, Delete Products with Multiple Images.
- **Order Management** — Manage Orders, Update Status and View Order Details.
- **User Management** — Search Users, Manage Roles and View User Information.

## ⚙️ Technical Highlights

- Functional React Components with Hooks
- Context API + Custom Hooks
- Optimistic UI Updates
- Skeleton Loading Screens
- Toast Notifications
- Lazy Loaded Images
- Debounced Search
- Row Level Security (RLS)
- Dark & Light Theme Support
- Smooth Animations with Framer Motion

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | React 18 (Vite) |
| Routing | React Router DOM v6 |
| Styling | Tailwind CSS |
| Forms | React Hook Form |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| Animations | Framer Motion |
| Charts | Recharts |
| Backend | Supabase (Auth, PostgreSQL, Storage, RLS) |
| Deployment | Vercel |
| Package Manager | npm |

> **Note:** This project uses Context API and Custom Hooks for state management instead of Redux to keep the application lightweight and maintainable.

---

# 📂 Folder Structure

```text
novacart/
├── public/
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── product/
│   │   ├── cart/
│   │   └── admin/
│   │
│   ├── pages/
│   │   ├── admin/
│   │   └── *.jsx
│   │
│   ├── layouts/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── lib/
│   ├── utils/
│   ├── constants/
│   ├── App.jsx
│   └── main.jsx
│
├── supabase/
│   ├── 01_schema.sql
│   ├── 02_rls_policies.sql
│   ├── 03_storage_setup.sql
│   ├── 04_seed_data.sql
│   └── 05_make_admin.sql
│
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md

---

# 🚀 Getting Started

## Prerequisites

- Node.js 18+
- npm
- Free Supabase Account

## Installation

```bash
npm install
```

Create `.env`

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Start Development Server

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These values can be found in your **Supabase Dashboard → Settings → API**.

---

# 🗄️ Supabase Setup

1. Create a new Supabase project.
2. Run the SQL files inside the `supabase` folder in the following order:

- 01_schema.sql
- 02_rls_policies.sql
- 03_storage_setup.sql
- 04_seed_data.sql *(Optional Demo Data)*

3. Enable Google Authentication (Optional).
4. Create an account using the application.
5. Run `05_make_admin.sql` to promote your account as Admin.

---

# 🚀 Deployment (Vercel)

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Select **Vite** as the framework preset.
4. Add the following environment variables:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

5. Deploy the application.
6. Add your deployed Vercel URL to Supabase Authentication Redirect URLs if using Google Authentication.

---

# 📸 Screenshots

> Screenshots will be added after the final UI polish and project completion.

Planned screenshots:

- 🏠 Home Page
- 🛍️ Product Listing
- 📦 Product Details
- ❤️ Wishlist
- 🛒 Shopping Cart
- 📍 Delivery Location
- 👨‍💼 Admin Dashboard

---

# 🚀 Future Improvements

- 💳 Razorpay Payment Gateway Integration
- 🤖 AI Product Recommendations
- 🎟️ Coupons & Offers
- 📦 Live Order Tracking
- ⭐ Product Reviews & Ratings
- 📧 Email Notifications
- 🌍 Multi-language & Multi-currency Support
- 📱 Progressive Web App (PWA)
- 📊 Advanced Sales Analytics
- ⚡ Better Image Optimization

---

# 📄 Resume Highlights

- Built a modern full-stack e-commerce platform using **React, Vite, Tailwind CSS, and Supabase**.
- Developed secure authentication with email/password and Google OAuth.
- Created a complete shopping experience including product catalog, search, filters, wishlist, shopping cart, checkout, and order history.
- Designed an admin dashboard for managing products, categories, users, and orders.
- Implemented PostgreSQL database with Row Level Security (RLS) for secure data access.
- Used Context API and Custom Hooks for efficient state management.
- Integrated Supabase Storage for managing product images and user avatars.
- Built a responsive interface with light and dark theme support.
- Added smooth animations and modern UI interactions using Framer Motion.

---

# 👨‍💻 Contributors

- Swapnil Dwivedi
- Dhruv Soni

---

# 🤝 Contributing

Contributions, suggestions, and improvements are always welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your work.
5. Open a Pull Request.

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📜 License

This project is licensed under the **MIT License**.

---

### Thank you for visiting NovaCart! 🚀