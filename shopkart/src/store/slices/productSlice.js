import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productService } from '../../services/endpoints'

export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async ({ page = 0, size = 12 } = {}) => {
    const res = await productService.getAll(page, size)
    return res.data   // Page object: { content, totalPages, totalElements, number }
  }
)

export const searchProducts = createAsyncThunk(
  'product/search',
  async ({ name, page = 0, size = 12 }) => {
    const res = await productService.search(name, page, size)
    return res.data
  }
)

export const fetchProductById = createAsyncThunk(
  'product/fetchById',
  async (id) => {
    const res = await productService.getById(id)
    return res.data
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    currentProduct: null,
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    loading: false,
    searchQuery: '',
  },
  reducers: {
    setSearchQuery(state, { payload }) { state.searchQuery = payload },
    setCurrentPage(state, { payload }) { state.currentPage = payload },
  },
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending,   (s) => { s.loading = true })
    b.addCase(fetchProducts.fulfilled, (s, { payload }) => {
      s.loading = false
      s.items         = payload.content
      s.totalPages    = payload.totalPages
      s.totalElements = payload.totalElements
      s.currentPage   = payload.number
    })
    b.addCase(fetchProducts.rejected,  (s) => { s.loading = false })

    b.addCase(searchProducts.pending,   (s) => { s.loading = true })
    b.addCase(searchProducts.fulfilled, (s, { payload }) => {
      s.loading = false
      s.items      = payload.content
      s.totalPages = payload.totalPages
    })
    b.addCase(searchProducts.rejected, (s) => { s.loading = false })

    b.addCase(fetchProductById.pending,   (s) => { s.loading = true })
    b.addCase(fetchProductById.fulfilled, (s, { payload }) => { s.loading = false; s.currentProduct = payload })
    b.addCase(fetchProductById.rejected,  (s) => { s.loading = false })
  },
})

export const { setSearchQuery, setCurrentPage } = productSlice.actions

export const selectProducts       = (s) => s.product.items
export const selectCurrentProduct = (s) => s.product.currentProduct
export const selectProductLoading = (s) => s.product.loading
export const selectTotalPages     = (s) => s.product.totalPages
export const selectCurrentPage    = (s) => s.product.currentPage
export const selectSearchQuery    = (s) => s.product.searchQuery

export default productSlice.reducer
