import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import React, { FC, useState } from "react";
import ChatState from "../../../Context/ChatContext";
import LocalOverLay from "../../LocalOverLay/LocalOverLay";
import S from "./MemberItem.module.scss";
import spinner from "../../../Assets/small_spinner.gif";
import axios from "axios";
import { ToastState } from "../../../Context/ToastContext";
import { Popover, PopoverContent, PopoverTrigger } from "../../Popover/Popover";

type TProp = {
  user: UserData;
};

const MemberItem: FC<TProp> = ({ user }) => {
  const { selectedChat, setSelectedChat, setFetchChatsAgain } = ChatState();
  const state = ChatState();

  const { showToast } = ToastState();
  const [popoverOpen, setPopoverOpen] = useState(false);

  const groupAdminIds = selectedChat?.groupAdmins.map((u) => u._id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMenuPopup = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  };

  const handleRemove = async () => {
    try {
      setPopoverOpen(false);
      const url = import.meta.env.VITE_APP_API_URL + "/chat/removefromgroup";
      const config = {
        headers: {
          "auth-token": state.user?.token,
        },
      };
      const dataToSend = {
        userId: user._id,
        chatId: selectedChat?._id,
      };
      setIsLoading(true);
      const { data } = await axios.put(url, dataToSend, config);
      setIsLoading(false);
      if (data?.success === false) {
        showToast({
          message: data?.message,
          show: true,
          status: "error",
          duration: 5000,
        });
        return;
      }
      setSelectedChat(data);
      setFetchChatsAgain((p) => !p);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMakeAdmin = async () => {
    try {
      setPopoverOpen(false);
      const url = import.meta.env.VITE_APP_API_URL + "/chat/makeadmin";
      const config = {
        headers: {
          "auth-token": state.user?.token,
        },
      };
      const dataToSend = {
        userId: user._id,
        chatId: selectedChat?._id,
      };
      setIsLoading(true);
      const { data } = await axios.put(url, dataToSend, config);
      setIsLoading(false);
      if (data?.success === false) {
        showToast({
          message: data?.message,
          show: true,
          status: "error",
          duration: 5000,
        });
        return;
      }
      setSelectedChat(data);
      setFetchChatsAgain((p) => !p);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveAdmin = async () => {
    try {
      setPopoverOpen(false);
      const url = import.meta.env.VITE_APP_API_URL + "/chat/removeadmin";
      const config = {
        headers: {
          "auth-token": state.user?.token,
        },
      };
      const dataToSend = {
        userId: user._id,
        chatId: selectedChat?._id,
      };
      setIsLoading(true);
      const { data } = await axios.put(url, dataToSend, config);
      setIsLoading(false);
      if (data?.success === false) {
        showToast({
          message: data?.message,
          show: true,
          status: "error",
          duration: 5000,
        });
        return;
      }
      setSelectedChat(data);
      setFetchChatsAgain((p) => !p);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`flex between ${S.member_wrapper}`}
        onClick={handleMenuPopup}
      >
        <li className={S.useritem}>
          <motion.img src={user.pic} alt="" />
          <div>
            <p className={S.name}>
              {user.name}{" "}
              <span className={S.admin_tag}>
                {groupAdminIds?.includes(user._id) && "(Admin)"}
              </span>{" "}
            </p>
            <p className={S.username}>@{user.username}</p>
          </div>
        </li>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger
            className="border-none"
            style={{ background: "#000" }}
          >
            <button className={S.option_btn}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className={S.popover_content}>
            {groupAdminIds?.includes(user._id) ? (
              <p className={S.popover_item} onClick={handleRemoveAdmin}>
                Remove Admin
              </p>
            ) : (
              <>
                <p className={S.popover_item} onClick={handleMakeAdmin}>
                  Make Admin
                </p>
                <p className={S.popover_item} onClick={handleRemove}>
                  Remove
                </p>
              </>
            )}
          </PopoverContent>
        </Popover>
      </motion.div>

      {isLoading && (
        <LocalOverLay>
          <img src={spinner} style={{ width: "3rem" }} alt="Loading..." />
        </LocalOverLay>
      )}
    </>
  );
};

export default MemberItem;
