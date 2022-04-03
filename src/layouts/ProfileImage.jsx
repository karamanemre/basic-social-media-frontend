import React from "react";
import { useSelector } from "react-redux";

function ProfileImage(props) {
  const { width, height,border,src} = props;
  const { user } = useSelector((state) => state.user);
  return (
    <img
      src={
        src || 
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
      }
      alt=""
      className="rounded-circle "
      height={height}
      width={width}
      style={{objectFit:"cover",border:border}}
    />
  );
}

export default ProfileImage;

