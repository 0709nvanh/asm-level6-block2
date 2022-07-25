import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productAPI from "../api/product";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (page) => {
    const { data } = await productAPI.getList(page);
    return data;
  }
);

export const readProduct = createAsyncThunk(
  "product/readProduct",
  async (slug) => {
    const { data } = await productAPI.read(slug);
    return data;
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product) => {
    const { data } = await productAPI.create(product);
    return data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const { data } = await productAPI.update(product);
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(readProduct.fulfilled, (state, action) => {
      state.loading = false;
      console.log("ádasdasdasd", action.payload);
      state.product = action.payload;
    });
    builder.addCase(readProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default productSlice.reducer;
