# ShopKart Frontend

Complete React frontend for Spring Boot eCommerce backend.

## Stack
- React 18 + Vite
- Tailwind CSS (Orange theme)
- Framer Motion (animations)
- Redux Toolkit (state management)
- Axios (JWT interceptor)
- React Router DOM v6
- React Hot Toast (notifications)

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start backend
Make sure your Spring Boot backend is running on `http://localhost:8080`

### 3. Start frontend
```bash
npm run dev
```
Frontend runs at: `http://localhost:3000`

## API Endpoints Used

| Feature     | Endpoint                                |
|-------------|----------------------------------------|
| Register    | POST /user/register                    |
| Login       | POST /user/login                       |
| Products    | GET  /api/products/get?page=0&size=12  |
| Search      | GET  /api/products/search?name=x       |
| Product by ID | GET /api/products/getById/{id}       |
| Add to Cart | POST /api/cart/add                     |
| Get Cart    | GET  /api/cart/user/{userId}           |
| Place Order | POST /api/orders/place/{userId}        |
| Get Orders  | GET  /api/orders/user/{userId}         |
| Categories  | GET  /categories/get  [ADMIN]          |
| Add Category| POST /categories/create  [ADMIN]       |
| Add Product | POST /api/products/create  [ADMIN]     |
| Update      | PUT  /api/products/update/{id} [ADMIN] |
| Delete      | DELETE /api/products/delete/{id} [ADMIN]|

## Pages
- `/`          — Home (hero + featured products)
- `/products`  — All products (search + pagination)
- `/products/:id` — Product detail
- `/cart`      — Shopping cart
- `/checkout`  — Checkout + order placement
- `/orders`    — Order history
- `/profile`   — User profile
- `/wishlist`  — Saved products
- `/login`     — Login
- `/register`  — Register
- `/admin`     — Admin dashboard (ADMIN role only)

## Important Notes
1. On login, JWT token is stored in localStorage
2. Token auto-attaches to every API request via Axios interceptor
3. Token expiry is checked on app load — auto logout if expired
4. Cart is fetched from backend on login
5. Wishlist is stored in localStorage
6. Dark mode preference is persisted in localStorage
