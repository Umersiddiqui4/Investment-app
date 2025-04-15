import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isMobile: false,
  sidebarCollapsed: false,
  selectedCategory: "",
  signOut: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSidebarOpen: (state, action) => {
      state.sideBarOpen = action.payload;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSignOut: (state, action) => {
      state.signOut = action.payload;
    },
  },
});

export const { setSidebarOpen, setSidebarCollapsed, setIsMobile, setSelectedCategory, setSignOut } = appSlice.actions;
export default appSlice.reducer;
