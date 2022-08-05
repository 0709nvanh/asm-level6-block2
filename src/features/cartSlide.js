import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartAPI from "../api/cart";

export const getListOrder = createAsyncThunk("carts/getListOrder", async () => {
  const { data } = await cartAPI.getListOrder();
  return data;
});

export const updateStatusOrder = createAsyncThunk(
  "carts/updateStatusOrder",
  async (action) => {
    const { data } = await cartAPI.updateStatusOrder(action);
    return data;
  }
);

export const getOrderById = createAsyncThunk(
  "carts/getOrderById",
  async (id) => {
    const { data } = await cartAPI.getCartById(id);
    return data;
  }
);

export const getOrderByUser = createAsyncThunk(
  "carts/getOrderByUser",
  async (userId) => {
    const { data } = await cartAPI.getCartByUser(userId);
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
    order: {},
    orders: [],
    loading: false,
    error: {}
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
      state.carts = [];
    }
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
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
    });
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getOrderByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    });
    builder.addCase(getOrderByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderByUser.rejected, (state, action) => {
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

    builder.addCase(updateStatusOrder.fulfilled, (state, action) => {
      state.loading = false;
      const check = state.orders.find(
        (item) => item._id === action.payload._id
      );
      if (check) {
        check.status = action.payload.status;
      }
    });
    builder.addCase(updateStatusOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStatusOrder.rejected, (state, action) => {
      state.error = action.payload;
    });
  }
});

export const {
  increateCart,
  addCart,
  removeCart,
  decreateCart,
  removeAllCart
} = cartSlice.actions;

export default cartSlice.reducer;
