import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { userSliceActions } from "../../store/user/userSlice";

const HomePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("talkshawk_user")!);
    dispatch(userSliceActions.setUser(userInfo));

    if (!userInfo) {
      navigation("/login");
    } else {
      navigation("/chat");
    }
  }, []);

  return <></>;
};

export default HomePage;
