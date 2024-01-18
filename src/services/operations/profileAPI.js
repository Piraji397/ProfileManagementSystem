import { toast } from "react-hot-toast";
import { setLoading } from "../../utils/slices/authSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../api";

const {
  UPLOAD_PROFILE_IMAGE,
  GET_ALL_IMAGES,
  DELETE_PROFILE_IMAGE,
  DOWNLOAD_PROFILE_IMAGE,
} = profileEndpoints;

export function uploadProfileImage(profileImage, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append("file", profileImage);
      const response = await apiConnector(
        "POST",
        UPLOAD_PROFILE_IMAGE,
        profileImage,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPLOAD_PROFILE_IMAGE API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Profile Image Uploaded Successful");
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("UPLOAD_PROFILE_IMAGE API ERROR............", error);
      toast.error("Could not uplaod image");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export async function getAllImages(token) {
  let result = [];
  const toastId = toast.loading("loading...");
  try {
    const response = await apiConnector("GET", GET_ALL_IMAGES, null, {
      Authorization: `Bearer ${token}`,
    });
    console.log("GET_ALL_IMAGES Response.........", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("All images fetched successfully");
    result = response.data.data;
  } catch (error) {
    console.log("GET_ALL_IMAGES ERROR.........", error);
    toast.error("Could not fetch images");
  } finally {
    toast.dismiss(toastId);
  }
  return result;
}
