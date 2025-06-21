import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { casinoServices } from "../services/casino.services";
import { message } from "antd";

const initialState = {

};

export const casinoBetPlaceFunc = createAsyncThunk(
  "casino/casinoBetPlaceFunc",
  async (userData, { rejectWithValue }) => {
    try {
      const user = await casinoServices.casinoBetPlaceFunc(userData);
      message.success(user?.message, 2);
      return user;
    } catch (error) {
      message.error(error?.data?.message, 2);
      return rejectWithValue(error.message);
    }
  }
);


export const intCasinoCateogeoryWiseList = createAsyncThunk(
  "website/getCateogeory",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await casinoServices.intCasinoCateogeoryWiseList(userData);
      // message.success(user?.message, 2);
      return response;
    } catch (error) {
      // message.error(error?.data?.message, 2);
      return rejectWithValue(error.message);
    }
  }
);




const casinoSlice = createSlice({
  name: "casino",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(casinoBetPlaceFunc.pending, (state) => {
        state.casinoLoading = true;
      })
      .addCase(casinoBetPlaceFunc.fulfilled, (state, action) => {
        state.casinoLoading = false;
        state.loggedIn = true;
        state.user = action.payload;
      })
      .addCase(casinoBetPlaceFunc.rejected, (state, action) => {
        state.casinoLoading = false;
        state.error = action.payload;
      })


      .addCase(intCasinoCateogeoryWiseList.pending, (state) => {
        state.casinoLoading = true;
      })
      .addCase(intCasinoCateogeoryWiseList.fulfilled, (state, action) => {
        state.casinoLoading = false;
        state.loggedIn = true;
        state.intCasinoCateogeoryWiseListData = action.payload;
      })
      .addCase(intCasinoCateogeoryWiseList.rejected, (state, action) => {
        state.casinoLoading = false;
        state.error = action.payload;
      })

  },
});

export const { logout } = casinoSlice.actions;

export default casinoSlice.reducer;
