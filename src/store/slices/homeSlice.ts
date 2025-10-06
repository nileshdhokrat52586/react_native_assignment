import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPosts } from '../../api/homeApi';
import type { Item } from '../../types/Item';
import type { PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
  counter: number;
  items: Item[];
  loading: boolean;
}

const initialState: HomeState = {
  counter: 0,
  items: [],
  loading: false,
};

export const fetchData = createAsyncThunk('home/fetchData', async () => {
  const data = await getPosts();
  return data;
});

export const loadPersistedData = createAsyncThunk('home/loadPersistedData', async () => {
  const counter = await AsyncStorage.getItem('counter');
  const items = await AsyncStorage.getItem('items');
  return {
    counter: counter ? JSON.parse(counter) : 0,
    items: items ? JSON.parse(items) : [],
  };
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    incrementCounter(state) {
      state.counter += 1;
      AsyncStorage.setItem('counter', JSON.stringify(state.counter));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false;
        state.items = action.payload;
        AsyncStorage.setItem('items', JSON.stringify(state.items));
      })
      .addCase(loadPersistedData.fulfilled, (state, action) => {
        state.counter = action.payload.counter;
        state.items = action.payload.items;
      });
  },
});

export const { incrementCounter } = homeSlice.actions;
export default homeSlice.reducer;
