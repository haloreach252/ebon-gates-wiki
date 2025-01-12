import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch pages
export const fetchPages = createAsyncThunk('pages/fetchPages', async () => {
    const response = await axios.get('http://localhost:5000/api/pages');
    return response.data;
})

// Async thunk to search pages
export const searchPages = createAsyncThunk('pages/searchPages', async (query) => {
    const response = await axios.get(`http://localhost:5000/api/pages/search?q=${query}`);
    return response.data;
})

const pagesSlice = createSlice({
    name: 'pages',
    initialState: {
        items: [],
        searchResults: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPages.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPages.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
          })
          .addCase(fetchPages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          // Search Pages
          .addCase(searchPages.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(searchPages.fulfilled, (state, action) => {
            state.loading = false;
            state.searchResults = action.payload;
          })
          .addCase(searchPages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
})

export default pagesSlice.reducer;