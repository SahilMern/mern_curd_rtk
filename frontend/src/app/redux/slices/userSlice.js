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
    // Optional: You can add an action for setting loading state
    setLoading: (state) => {
      state.loading = true;
      state.error = false;

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
      console.log("Sign In Failed", action.payload);
      state.loading = false; // Set loading to false on failure
      state.error = action.payload; // Set the error message
    },

   
  },
});

export const { setUser, signInSuccess, signInFail, setLoading } = userSlice.actions;
export default userSlice.reducer;
