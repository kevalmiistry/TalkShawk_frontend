import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatState from "../../Context/ChatContext";

const HomePage: FC = () => {
  const { setUser } = ChatState();
  const navigation = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("talkshawk_user")!);
    setUser(userInfo);

    if (!userInfo) {
      navigation("/login");
    } else {
      navigation("/chat");
    }
  }, []);

  return <></>;
};

export default HomePage;
