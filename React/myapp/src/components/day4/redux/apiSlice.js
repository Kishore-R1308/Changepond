import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5555/product";

/* FETCH */
export const fetchData = createAsyncThunk(
  "api/fetchData",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

/* DELETE */
export const deleteData = createAsyncThunk(
  "api/deleteData",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

/* UPDATE */
export const updateData = createAsyncThunk(
  "api/updateData",
  async ({ id, product }) => {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(updateData.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default apiSlice.reducer;
