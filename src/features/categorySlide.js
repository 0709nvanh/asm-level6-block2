import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryAPI from "../api/category";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (page) => {
    const { data } = await categoryAPI.getList(page);
    return data;
  }
);

export const readCategory = createAsyncThunk(
  "categories/readCategory",
  async (slug) => {
    const { data } = await categoryAPI.read(slug);
    return data;
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (category) => {
    const { data } = await categoryAPI.create(category);
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (category) => {
    const { data } = await categoryAPI.update(category);
    return data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    category: {},
    loading: false,
    error: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(readCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(readCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(readCategory.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default categorySlice.reducer;
