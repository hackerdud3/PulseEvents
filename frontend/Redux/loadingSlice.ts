import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  loadingState: boolean;
}

const initialState: LoadingState = {
  loadingState: false
};

export const laodingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});


export { setLoading } = laodingSlice.actions;
export default laodingSlice.reducer;