import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: unknown | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUserSuccess(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUserError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<unknown>) {
      state.loading = false;
      state.data = action.payload;
    },
    updateUserError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserError,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
} = userSlice.actions;

export default userSlice.reducer;
