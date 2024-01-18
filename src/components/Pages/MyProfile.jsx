import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import IconBtn from "../common/IconBtn";
import {
  uploadProfileImage,
  getAllImages,
} from "../../services/operations/profileAPI";

const MyProfile = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [allImages, setAllImages] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("profileImage", profileImage);
    dispatch(uploadProfileImage(profileImage, token, navigate));
    setProfileImage("");
  };

  const handleOnChange = (e) => {
    console.log(e.target.files[0]);
    setProfileImage(e.target.files[0]);
  };

  const getData = async () => {
    const data = await getAllImages(token);
    console.log("data", data);
    setAllImages(data);
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
            {allImages.length > 0 ? (
              <div>
                {allImages.map((image) => (
                  <div key={image._id}>
                    {/* here images are not accessible */}
                    <img
                      src={`http://localhost:4000/public/uploads/${image.profileImage}`}
                      alt=""
                    />
                    {/* <p>{image.profileUniqueId}</p> */}
                  </div>
                ))}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
