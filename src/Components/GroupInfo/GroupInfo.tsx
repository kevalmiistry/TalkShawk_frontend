import {
  faArrowLeft,
  faCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import ChatState from "../../Context/ChatContext";
import LocalOverLay from "../LocalOverLay/LocalOverLay";
import SearchBox from "../SearchBox/SearchBox";
import UserItem from "../UserItem/UserItem";
import S from "./GroupInfo.module.scss";
import MemberItem from "./MemberItem/MemberItem";
import spinner from "../../Assets/small_spinner.gif";
import { ToastState } from "../../Context/ToastContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { chatActions } from "../../store/chat/chatSlice";

type TProp = {
  setIsGrpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const GroupInfo: FC<TProp> = ({ setIsGrpModalOpen }) => {
  const user = useSelector((state: RootState) => state.user.value);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  const dispatch = useDispatch<AppDispatch>();

  const { showToast } = ToastState();
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  const groupAdminIds = selectedChat?.groupAdmins.map((u) => u._id);

  const [chatName, setChatName] = useState(selectedChat?.chatName);
  const [isNameEditOpen, setIsNameEditOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (query: string) => {
    try {
      if (query === "") {
        setSearchResults([]);
      } else {
        setIsSearching(true);
        const url = import.meta.env.VITE_APP_API_URL + `/user/?search=${query}`;
        const config = {
          headers: { "auth-token": user?.token },
        };
        const { data } = await axios.get(url, config);
        setSearchResults(data.users);
        setIsSearching(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddUser = async (id: string) => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + "/chat/addtogroup";
      const config = {
        headers: {
          "auth-token": user?.token,
        },
      };
      const dataToSend = {
        chatId: selectedChat?._id,
        newUserId: id,
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
      dispatch(chatActions.setSelectedChat(data));
      dispatch(chatActions.setFetchChatsAgain((p) => !p));
    } catch (error) {
      console.error(error);
    }
  };
  const handleLeaveGroup = async () => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + "/chat/selfremove";
      const config = {
        headers: {
          "auth-token": user?.token,
        },
      };
      const dataToSend = {
        chatId: selectedChat?._id,
      };
      setIsLoading(true);
      const { data } = await axios.put(url, dataToSend, config);
      setIsLoading(false);
      if (data?.success) {
        showToast({
          message: "Chat left!",
          show: true,
          status: "success",
          duration: 5000,
        });
        dispatch(chatActions.setSelectedChat(null));
        dispatch(chatActions.setFetchChatsAgain((p) => !p));
        return;
      } else if (data?.success === false) {
        showToast({
          message: data?.message,
          show: true,
          status: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = async () => {
    try {
      const url = import.meta.env.VITE_APP_API_URL + "/chat/renamegroup";
      const config = {
        headers: {
          "auth-token": user?.token,
        },
      };
      const dataToSend = {
        chatId: selectedChat?._id,
        newName: chatName,
      };
      setIsLoading(true);
      const { data } = await axios.put(url, dataToSend, config);
      setIsNameEditOpen(false);
      setIsLoading(false);
      if (!data) {
        showToast({
          message: "Something went Wrong!",
          show: true,
          status: "error",
          duration: 3000,
        });
        return;
      }
      dispatch(chatActions.setSelectedChat(data));
      dispatch(chatActions.setFetchChatsAgain((p) => !p));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={S.group_info_main}>
        <div className={S.head_wrapper}>
          <FontAwesomeIcon
            className="pointer"
            icon={faArrowLeft}
            onClick={() => setIsGrpModalOpen(false)}
          />
          <h2>Group Info</h2>
        </div>

        <div className={S.img_container}>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            src={selectedChat?.groupPic}
            alt="Group Pic"
            className={S.img}
          />
        </div>

        {isNameEditOpen ? (
          <div className={S.group_name}>
            <motion.input
              className={S.name_input}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, duration: 0.25 }}
              type={"text"}
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
            <FontAwesomeIcon
              onClick={handleNameChange}
              className="pointer"
              style={{ fontSize: "1.25rem" }}
              icon={faCheck}
            />
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={S.group_name}
          >
            {chatName}
            <FontAwesomeIcon
              onClick={() => setIsNameEditOpen(true)}
              className="pointer"
              style={{ fontSize: "1.25rem" }}
              icon={faEdit}
            />
          </motion.p>
        )}

        <div className={S.members}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Members
          </motion.p>

          <ul ref={animationParent}>
            {selectedChat?.users
              .filter((u) => u._id !== user?._id)
              .map((u) => <MemberItem key={u._id} user={u} />)}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className={S.you}
            >
              +You
              {groupAdminIds?.includes(user?._id!) && " (admin)"}
            </motion.p>
          </ul>
        </div>

        {/*  */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className={S.search_wrapper}
        >
          <SearchBox
            key={user?._id}
            search={search}
            setSearch={setSearch}
            isSearchOnFocus={isSearchOnFocus}
            setIsSearchOnFocus={setIsSearchOnFocus}
            isSearching={isSearching}
            onSearch={onSearch}
          />

          <ul ref={animationParent} className={S.list}>
            {searchResults.map((u: UserData) => (
              <UserItem
                key={u._id}
                user={u}
                handleFunction={() => handleAddUser(u._id)}
              />
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className={S.leave_group}
        >
          <button onClick={handleLeaveGroup} className={`btn ${S.btn}`}>
            Leave Group
          </button>
        </motion.div>
      </div>

      {isLoading ? (
        <LocalOverLay>
          <img src={spinner} style={{ width: "3rem" }} alt="Loading..." />
        </LocalOverLay>
      ) : null}
    </>
  );
};

export default GroupInfo;
