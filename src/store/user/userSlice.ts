import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  value: UserData | null;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["value"]>) => {
      state.value = action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;

export default userSlice.reducer;
