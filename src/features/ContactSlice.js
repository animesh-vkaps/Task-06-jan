import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContacts = createAsyncThunk(
  "contacts/allcontacts",
  async (page) => {
    try {
      const response = await axios.get(
        `https://api.dev.pastorsline.com/api/contacts.json?companyId=171`,
        {
          headers: {
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNjc2NDM5MjI0LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjYwODg3MjI0fQ.X6EnuvO5j5n9WLNrQUyJ9M4ABtDQpfsrjfWnts3GmPs`,
          },
        }
      );
      return response.data.contacts;
    } catch (error) { 
      console.log(error);
    }
  }
);

const initialState = {
  contacts: {},
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    [getContacts.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = "";
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.contacts = payload;
      state.error = "";
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default contactSlice.reducer;
