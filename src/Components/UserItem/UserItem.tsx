import React from "react";
import S from "./UserItem.module.scss";

type TProp = {
  user: UserData;
  handleFunction: () => void;
};
const UserItem: React.FC<TProp> = ({ user, handleFunction }) => {
  return (
    <li className={S.useritem} onClick={handleFunction}>
      <img src={user.pic} alt="" />
      <div>
        <p className={S.name}>{user.name}</p>
        <p className={S.username}>@{user.username}</p>
      </div>
    </li>
  );
};

export default UserItem;
