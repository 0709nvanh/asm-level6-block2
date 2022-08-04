import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartAPI from "../api/cart";

export const getListOrder = createAsyncThunk(
  "carts/getListOrder",
  async (page) => {
    const { data } = await cartAPI.getListOrder(page);
    return data;
  }
);

export const addOrder = createAsyncThunk("carts/addOrder", async (action) => {
  const { data } = await cartAPI.addOrder(action);
  return data;
});

const cartSlice = createSlice({
  name: "carts",
  initialState: {
    carts: [],
    orders: [],
    loading: false,
    error: {},
  },
  reducers: {
    increateCart: (state, action) => {
      const check = state.carts.find((item) => item._id === action.payload);
      check.quantity += 1;
    },
    decreateCart: (state, action) => {
      const check = state.carts.find((item) => item._id === action.payload);
      if (check && check.quantity > 0) {
        check.quantity -= 1;
      } else {
        state.carts = state.carts.filter((item) => item._id !== action.payload);
      }
    },
    addCart: (state, action) => {
      const check = state.carts.find((item) => item._id === action.payload._id);
      if (check) {
        check.quantity += action.payload.quantity;
      } else {
        state.carts = [...state.carts, action.payload];
      }
    },
    removeCart: (state, action) => {
      state.carts = state.carts.filter((item) => item._id !== action.payload);
    },
    removeAllCart: (state, action) => {
      state.carts = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getListOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = [...state.orders, action.payload];
    });
    builder.addCase(addOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { increateCart, addCart, removeCart, decreateCart, removeAllCart } =
  cartSlice.actions;

export default cartSlice.reducer;
