import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  profileImages: localStorage.getItem("profileImages")
    ? JSON.parse(localStorage.getItem("profileImages"))
    : null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, value) {
      state.user = value.payload;
    },
    setProfileImages(state, value) {
      state.profileImages = value.payload;
    },
    removeProfileImages(state, value) {
      const imageId = value.payload;
      const existingCourseIndex = state.profileImages.findIndex(
        (item) => item._id === imageId
      );
      state.profileImages.splice(existingCourseIndex, 1);
      localStorage.setItem(
        "profileImages",
        JSON.stringify(state.profileImages)
      );
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setUser, setProfileImages, removeProfileImages, setLoading } =
  profileSlice.actions;
export default profileSlice.reducer;
