import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProfileImages, setUser } from "../../utils/slices/profileSlice";
import { FiUpload } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import IconBtn from "../common/IconBtn";
import {
  uploadProfileImage,
  getAllImages,
  deleteImage,
} from "../../services/operations/profileAPI";

const BASE_URL = "http://localhost:4000/uploads/";

const MyProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const { user, profileImages } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const inputFile = useRef(null);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log("profileImage", profileImage);
    dispatch(
      uploadProfileImage(profileImage, token, user, profileImages, navigate)
    );
    setProfileImage("");
    inputFile.current.value = "";
    getData();
  };

  const handleOnChange = (e) => {
    // console.log(e.target.files[0]);
    setProfileImage(e.target.files[0]);
  };

  const handleOnDelete = async (imageId) => {
    dispatch(deleteImage(imageId, token, navigate));
    // let filtered = profileImages.filter((image) => image._id !== imageId);
    // dispatch(setProfileImages(filtered));

    // console.log("data", data);
  };

  const getData = async () => {
    dispatch(getAllImages(token, user));
    // console.log("data", data);
    // setAllImages(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-slate-950">
      <div className="mx-auto flex flex-col gap-12 py-10 px-[80px] self-stretch">
        <h1 className="font-inter font-medium text-3xl text-white">
          My Profile
        </h1>
        <div className="flex flex-col gap-y-10 w-full self-stretch">
          <div className="px-12 py-8 bg-slate-800 rounded-lg border border-slate-700 flex flex-col justify-between items-start gap-6 self-stretch">
            <div className="flex items-center gap-6">
              <img
                src={user?.image}
                alt={`profile-${user?.name}`}
                className="aspect-square w-[78px] rounded-full object-cover"
              />
              <div className="flex flex-col w-[526px] gap-[2px] items-start flex-[1_0_0]">
                <p className="font-inter font-medium text-[18px] text-white">
                  {user.name}
                </p>
                <p className="font-inter text-[16px] font-normal leading-[22px] text-slate-500">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <h1 className="font-inter font-medium text-xl text-white">
                Edit Profile
              </h1>
              <form onSubmit={handleOnSubmit}>
                <div className="flex gap-x-6  items-start">
                  <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-white">
                      Select Image
                    </p>
                    <input
                      type="file"
                      required
                      ref={inputFile}
                      onChange={handleOnChange}
                      placeholder="Enter profile image"
                      style={{
                        boxShadow:
                          "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-slate-900 p-[12px] text-white"
                    />
                  </label>
                  <IconBtn
                    text="Upload"
                    onclick={() => {}}
                    type="submit"
                    customClasses="py-2 mt-8 px-5 bg-[yellow]  rounded-md"
                  >
                    {" "}
                    <FiUpload />
                  </IconBtn>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-12 py-8 bg-slate-800 rounded-lg border border-slate-700 flex flex-col gap-8 items-start self-stretch">
            <div className="flex justify-between items-center self-stretch">
              <h2 className="font-inter text-[18px] font-semibold leading-[26px] text-white">
                All Profile Images
              </h2>
            </div>
            {profileImages && (
              <div className="flex flex-wrap gap-x-6">
                {profileImages.map((image) => (
                  <div key={image._id} className="relative group">
                    {/* here images are not accessible */}
                    <img
                      src={`${BASE_URL}${image.profileImage}`}
                      alt={image.profileImage}
                      className="pointer-events-none w-[250px] h-[250px] rounded-md object-contain group-hover:scale-105 duration-200"
                    />
                    <p className="absolute left-0 bottom-0 text-[16px] text-slate-200 invisible group-hover:visible duration-200 ">
                      Passcode - {image.profileUniqueId}
                    </p>
                    <div
                      className="absolute right-0 bottom-[50px] p-2 bg-slate-400 z-[1000] rounded-full invisible group-hover:visible duration-200"
                      onClick={() => handleOnDelete(image._id)}
                    >
                      <MdDelete className="text-[red] w-5 h-5 opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
