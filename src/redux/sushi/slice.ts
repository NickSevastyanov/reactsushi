import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchsushis } from './asyncActions';
import { Sushi, SushiSliceState, Status } from './types';

const initialState: SushiSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Sushi[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchsushis.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchsushis.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchsushis.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
