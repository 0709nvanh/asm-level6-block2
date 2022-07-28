import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from "../api/auth";

export const getListUser = createAsyncThunk("user/getListUser", async () => {
  const { data: users } = await authAPI.getListUser();
  return users;
});

export const searchUserSlide = createAsyncThunk("user/searchUserSlide", async (keySearch) => {
  const { data: users } = await authAPI.searchUser(keySearch);
  return users;
});

export const getUserById = createAsyncThunk("user/getUser", async (id) => {
  const { user } = await authAPI.readUser(id);
  return user;
});

export const updateStatusUser = createAsyncThunk("user/updateStatusUser", async (status) => {
  const { data } = await authAPI.updateStatusUser(status);
  return data;
})

export const loginUser = createAsyncThunk("user/login", async (user) => {
  const { data } = await authAPI.login(user);
  return data;
});

export const signupUser = createAsyncThunk("user/signup", async (user) => {
  const { data } = await authAPI.signup(user);
  return data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    infoUser: {},
    loading: false,
    error: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getListUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getListUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getListUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(searchUserSlide.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(searchUserSlide.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchUserSlide.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload;
    });
    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload.user;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.infoUser = action.payload.user;
    });
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateStatusUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateStatusUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStatusUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});
export default userSlice.reducer;
