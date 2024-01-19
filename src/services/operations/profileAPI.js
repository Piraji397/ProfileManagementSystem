import { toast } from "react-hot-toast";
import { setLoading } from "../../utils/slices/authSlice";
import {
  setProfileImages,
  removeProfileImages,
  setUser,
} from "../../utils/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";

const {
  UPLOAD_PROFILE_IMAGE,
  GET_ALL_IMAGES,
  DELETE_PROFILE_IMAGE,
  DOWNLOAD_PROFILE_IMAGE,
} = profileEndpoints;

export function uploadProfileImage(
  profileImage,
  token,
  user,
  profileImages,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      const response = await apiConnector(
        "POST",
        UPLOAD_PROFILE_IMAGE,
        formData,
        {
          Authorization: `Bearer ${token}`,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("UPLOAD_PROFILE_IMAGE API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Image Uploaded Successful");
      // navigate("/dashboard/my-profile");
      console.log("merge data", [...profileImages, response.data.data]);
      console.log("merge data", response.data.data);
      dispatch(setProfileImages([...profileImages, response.data.data]));
      localStorage.setItem(
        "profileImages",
        JSON.stringify([...profileImages, response.data.data])
      );
      if (response.data.data) {
        let image =
          "http://localhost:4000/uploads/" + response.data.data?.profileImage;
        dispatch(setUser({ ...user, image }));
        localStorage.setItem("user", JSON.stringify({ ...user, image }));
      }
    } catch (error) {
      console.log("UPLOAD_PROFILE_IMAGE API ERROR............", error);
      toast.error("Could not uplaod image");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function getAllImages(token, user) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", GET_ALL_IMAGES, null, {
        Authorization: `Bearer ${token}`,
      });
      console.log("GET_ALL_IMAGES Response.........", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("All images fetched successfully");
      if (response.data.data) {
        let image =
          "http://localhost:4000/uploads/" +
          response.data.data[response.data.data.length - 1].profileImage;
        dispatch(setUser({ ...user, image }));
        localStorage.setItem("user", JSON.stringify({ ...user, image }));
      }
      dispatch(setProfileImages(response.data.data));
      localStorage.setItem("profileImage", JSON.stringify(response.data.data));
    } catch (error) {
      console.log("GET_ALL_IMAGES ERROR.........", error);
      toast.error("Could not fetch images");
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
}

export function deleteImage(imageId, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_PROFILE_IMAGE,
        { imageId },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("DELETE_PROFILE_IMAGE API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Image Deleted Successfully");
      dispatch(removeProfileImages(imageId));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("DELETE_PROFILE_IMAGE API ERROR............", error);
      toast.error("Could not delete image");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
