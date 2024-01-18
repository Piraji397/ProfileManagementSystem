import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../utils/slices/authSlice";
import { setUser } from "../../utils/slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { authEndPoints } from "../api";

const { SIGNUP_API, LOGIN_API } = authEndPoints;

export function signUp(name, email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
      });
      console.log("SIGNUP API RESPONSE............", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
      navigate("/signup");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
      console.log("LOGIN_API Response.........", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login successful");
      dispatch(setToken(response.data.token));
      const userImage = response?.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.name}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.user, image: userImage })
      );
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN_API ERROR.........", error);
      toast.error("Login Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
