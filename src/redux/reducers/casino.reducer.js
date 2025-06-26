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

export const getCasinoListByCateogeory = createAsyncThunk(
  "websit/getCasinoListByCateogeory",
  async (payload, { rejectWithValue }) => {
    try {
      const casinoListByCateogeory = await casinoServices.getCasinoListByCateogeory(payload);


      return casinoListByCateogeory;
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const getCasinoListByProviderName = createAsyncThunk(
  "websit/getCasinoListByProviderName",
  async (payload, { rejectWithValue }) => {
    try {
      const cosinoGroupList = await casinoServices.getCasinoListByProviderName(payload);

      return cosinoGroupList;
    } catch (error) {

      return rejectWithValue(error.message);
    }
  }
);

export const getInternationalGroupCasinoList = createAsyncThunk(
  "websit/getInternationalGroupCasinoList",
  async (payload, { rejectWithValue }) => {
    try {
      const cosinoGroupList = await casinoServices.getInternationalGroupCasinoList(payload);

      return cosinoGroupList;
    } catch (error) {

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

      // casino international List
      .addCase(getInternationalGroupCasinoList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInternationalGroupCasinoList.fulfilled, (state, action) => {
        state.loading = false;
        state.getInternationalGroupCasinoListData = action.payload?.data;
      })
      .addCase(getInternationalGroupCasinoList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // getCasinoListByCateogeory
      .addCase(getCasinoListByCateogeory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCasinoListByCateogeory.fulfilled, (state, action) => {
        state.loading = false;
        state.getCasinoListByCateogeoryData = action.payload?.data;
      })
      .addCase(getCasinoListByCateogeory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // provierd list according to provider
      .addCase(getCasinoListByProviderName.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCasinoListByProviderName.fulfilled, (state, action) => {
        state.loading = false;
        state.getCasinoListByProviderNameData = action.payload?.data;
      })
      .addCase(getCasinoListByProviderName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export const { logout } = casinoSlice.actions;

export default casinoSlice.reducer;
