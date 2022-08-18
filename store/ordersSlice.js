import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
const baseUrl = 'http://localhost:3001';

const initialState = {
  orders: [],
  status: 'idle',
  error: null
}

export const fetchOrders = createAsyncThunk('posts/fetchOrders', async () => {
  let response = await axios.get(`${baseUrl}`)
  return response.data
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    orderAdded: {
      reducer(state, action) {
        state.orders.push(action.payload)
      },
      prepare(title, content, userId) {
        // omit prepare logic
      }
    },
    reactionAdded(state, action) {
      const { orderId, reaction } = action.payload
      const existingOrder = state.orders.find(order => order.id === orderId)
      if (existingOrder) {
        existingOrder.reactions[reaction]++
      }
    },
    orderUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingOrder = state.orders.find(order => order.id === id)
      if (existingOrder) {
        existingOrder.title = title
        existingOrder.content = content
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched orders to the array
        state.orders = state.orders.concat(action.payload)
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { orderAdded, orderUpdated, reactionAdded } = ordersSlice.actions

export default ordersSlice.reducer

export const selectAllOrders = state => state.ordersList.orders
  
export const selectOrderById = (state, orderId) =>
  state.ordersList.orders.find(order => order.id === orderId)