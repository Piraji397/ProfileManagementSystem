const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authEndPoints = {
  SIGNUP_API: BASE_URL + "/auth/register",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const profileEndpoints = {
  UPLOAD_PROFILE_IMAGE: BASE_URL + "/profile/uploadProfileImage",
  GET_ALL_IMAGES: BASE_URL + "/profile/getAllProfileImage",
  DELETE_PROFILE_IMAGE: BASE_URL + "/profile/deleteProfileImage",
  DOWNLOAD_PROFILE_IMAGE: BASE_URL + "/profile/downloadImage",
};
