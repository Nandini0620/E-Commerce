import api from './api'

// ─── AUTH ────────────────────────────────────────────────────────────────────
export const authService = {
  register: (data) => api.post('/user/register', data),
  login:    (data) => api.post('/user/login', data),
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
// GET /api/products/get?page=0&size=10
// GET /api/products/getById/{id}
// GET /api/products/search?name=x&page=0&size=10
// POST /api/products/create         [ADMIN]
// PUT  /api/products/update/{id}    [ADMIN]
// DELETE /api/products/delete/{id}  [ADMIN]
export const productService = {
  getAll:   (page = 0, size = 12) => api.get(`/api/products/get?page=${page}&size=${size}`),
  getById:  (id)                  => api.get(`/api/products/getById/${id}`),
  search:   (name, page = 0, size = 12) => api.get(`/api/products/search?name=${name}&page=${page}&size=${size}`),
  create:   (data)                => api.post('/api/products/create', data),
  update:   (id, data)            => api.put(`/api/products/update/${id}`, data),
  delete:   (id)                  => api.delete(`/api/products/delete/${id}`),
}

// ─── CART ─────────────────────────────────────────────────────────────────────
// POST /api/cart/add?userId=x&productId=y&quantity=z
// GET  /api/cart/user/{userId}
export const cartService = {
  add:     (userId, productId, quantity) =>
    api.post(`/api/cart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`),
  getCart: (userId) => api.get(`/api/cart/user/${userId}`),
}

// ─── ORDERS ───────────────────────────────────────────────────────────────────
// POST /api/orders/place/{userId}
// GET  /api/orders/user/{userId}
export const orderService = {
  place:     (userId) => api.post(`/api/orders/place/${userId}`),
  getOrders: (userId) => api.get(`/api/orders/user/${userId}`),
}

// ─── CATEGORIES (ADMIN) ───────────────────────────────────────────────────────
// POST /categories/create   [ADMIN]
// GET  /categories/get      [ADMIN]
export const categoryService = {
  create: (data) => api.post('/categories/create', data),
  getAll: ()     => api.get('/categories/get'),
}
