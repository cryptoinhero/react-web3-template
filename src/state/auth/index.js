import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from './hooks';

let token = localStorage.getItem('nftologyToken')
    ? localStorage.getItem('nftologyToken')
    : null;

const initialState = {
  user: null ,
  token: token ,
  dataLoading: false,
  errorMessage: null,
};

export const fetchUserInfoAsync = createAsyncThunk(
  'auth/fetchUserInfoAsync',
  async (address) => {
    const res = await fetchUser(address)
    console.log(address)
    return res
  }
);

export const itemSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.dataLoading = false
    },
    loggedIn: (state, action) => {
      state.token = action.payload
      state.dataLoading = false
    },
    loggedOut: (state, action) => {
      state.user = ''
      state.token = ''
    },
    setError: (state, action) => {
      state.errorMessage = action.payload
      state.dataLoading = false
    },
    setLoading: (state, action) => {
      state.dataLoading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.dataLoading = false
        state.user = action.payload
      });
  },
});

export const { setUser, loggedIn, loggedOut, setError, setLoading } = itemSlice.actions;

export default itemSlice.reducer;