import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    loading: false,  // Add loading state
    error: null,     // Add error state
  },
  reducers: {
    // Action to set loading state
    setLoading: (state) => {
      state.loading = true;
      state.error = null; // Set error to null instead of false
    },
    
    // Action to set user data
    setUser: (state, action) => {
      console.log(action.payload, "Set User Payload");
      state.email = action.payload.email;
      state.name = action.payload.username;
      state.loading = false;
      state.error = null;
    },
    
    // Action to handle sign-in failure
    signInFail: (state, action) => {
      console.error("Sign In Failed", action.payload);
      state.loading = false; // Set loading to false on failure
      state.error = action.payload || "An unknown error occurred"; // Default error message if no payload
    },
  },
});

export const { setUser, signInFail, setLoading } = userSlice.actions;
export default userSlice.reducer;
