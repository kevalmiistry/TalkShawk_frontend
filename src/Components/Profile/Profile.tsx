import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import S from "./Profile.module.scss";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

type TProp = {
  setIsProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Profile: FC<TProp> = ({ setIsProfileModalOpen }) => {
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <>
      <div className={S.profile_main}>
        <div className={S.head_wrapper}>
          <h3>Your Profile</h3>
          <FontAwesomeIcon
            onClick={() => setIsProfileModalOpen(false)}
            className={S.icon}
            icon={faClose}
          />
        </div>
        <div className={S.wrapper}>
          <img src={user?.pic} alt="Loogedin User's Pic" />
          <div>
            <p className={S.name}>{user?.name}</p>
            <p className={S.username}>@{user?.username}</p>
          </div>
        </div>
        <p className={S.email}>
          Email: <code>{user?.email}</code>
        </p>
      </div>
    </>
  );
};

export default Profile;
