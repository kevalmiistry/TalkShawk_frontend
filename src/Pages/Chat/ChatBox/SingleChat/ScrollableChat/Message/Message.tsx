import { FC } from "react";
import { showAvatar } from "../../../../../../ChatLogics/ChatLogics";
import S from "./Message.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store";

type TProp = {
  messages: TMessage[];
  m: TMessage;
  i: number;
};
const Message: FC<TProp> = ({ messages, m, i }) => {
  const user = useSelector((state: RootState) => state.user.value);

  return user ? (
    <div className={S.content_wrapper}>
      {showAvatar(messages, m, i, user) ? (
        <img className={S.sender_pic} src={m.sender.pic} alt="sender pic" />
      ) : (
        <div className={S.sender_pic}></div>
      )}
      <div
        style={{
          marginLeft: m.sender._id === user?._id ? "auto" : "0px",
          backgroundColor: m.sender._id === user?._id ? "rgb(4,72,72)" : "teal",
          marginTop:
            messages[i - 1]?.sender?._id !== m?.sender?._id ? "0.75rem" : "1px",
        }}
        className={S.content}
      >
        {m.content}
      </div>
    </div>
  ) : null;
};

export default Message;
