import { useAutoAnimate } from "@formkit/auto-animate/react";
import { motion } from "framer-motion";
import { FC } from "react";
import ChatState from "../../Context/ChatContext";
import UserItem from "../UserItem/UserItem";
import axios from "axios";
import S from "./SearchUserList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { chatActions } from "../../store/chat/chatSlice";

type TProp = {
  searchResults: UserData[];
};

const SearchUserList: FC<TProp> = ({ searchResults }) => {
  const [animationParent] = useAutoAnimate<HTMLUListElement>();

  const dispatch = useDispatch<AppDispatch>();

  const u = useSelector((state: RootState) => state.user.value);

  const createOneOnOneChat = async (_id: string) => {
    try {
      const config = {
        headers: {
          "auth-token": u?.token,
        },
      };
      const url = import.meta.env.VITE_APP_API_URL + "/chat/create";
      const { data } = await axios.post(url, { userId: _id }, config);
      dispatch(chatActions.setFetchChatsAgain((p) => !p));
      dispatch(chatActions.setSelectedChat(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={S.search_result_list_main}
    >
      <ul ref={animationParent}>
        {searchResults?.map((u: UserData) => (
          <UserItem
            key={u._id}
            user={u}
            handleFunction={() => createOneOnOneChat(u._id)}
          />
        ))}
      </ul>
    </motion.div>
  );
};

export default SearchUserList;
