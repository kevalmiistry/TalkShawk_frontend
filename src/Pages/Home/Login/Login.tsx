import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, FC } from "react";
import { ToastState } from "../../../Context/ToastContext";
import ForgetPassModal from "../ForgetPassModal/ForgetPassModal";
import ModalOverlay from "../../../Components/ModalOverlay/ModalOverlay";
import TSLogo from "../../../Assets/talkshawk_logo.png";
import style from "./Login.module.scss";
import axios from "axios";

type FormData = {
  email: string;
  password: string;
  username: string;
};

const Login: FC = () => {
  document.title = "TalkShawk | Login";
  const [type, setType] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgetPassModalOpen, setForgetPassModalOpen] = useState(false);
  const nev = useNavigate();
  const { showToast } = ToastState();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const url = import.meta.env.VITE_APP_API_URL + "/user/login";
    const dataToSend = {
      type: type,
      email_username: type === "email" ? formData.email : formData.username,
      password: formData.password,
    };
    setIsSubmitting(true);
    const { data } = await axios.post(url, dataToSend);
    setIsSubmitting(false);
    if (data.success) {
      localStorage.setItem("talkshawk_user", JSON.stringify(data.user));
      showToast({
        message: data.message,
        status: data.success ? "success" : "error",
        show: true,
      });
      nev("/chat");
    } else {
      showToast({
        message: data.message,
        status: data.success ? "success" : "error",
        show: true,
      });
    }
  };

  const emailStyle = {
    border: type === "email" ? "1px solid teal" : "1px solid #000",
  };
  const usernameStyle = {
    border: type === "username" ? "1px solid teal" : "1px solid #000",
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${style.login_main}`}
      >
        <div className={`${style.main_title}`}>
          <h1>TalkShawk</h1>
          <img src={TSLogo} alt="TalkShawk Main Logo" />
        </div>
        <form className={style.form}>
          <div className="flex around">
            <span
              style={emailStyle}
              className="pointer"
              onClick={() => setType("email")}
            >
              Email
            </span>
            <span
              className="pointer"
              style={usernameStyle}
              onClick={() => setType("username")}
            >
              Username
            </span>
          </div>
          {type === "email" ? (
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
            />
          ) : (
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              placeholder="Enter Username"
              name="username"
              value={formData.username}
              onChange={onChangeHandler}
            />
          )}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
          />
          <motion.button
            disabled={isSubmitting}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileFocus={{ scale: 1.05 }}
            type="button"
            className={`btn ${style.login_btn}`}
            onClick={handleLogin}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {!isSubmitting ? (
          <>
            <Link className={style.link} to={"/signup"}>
              Signup
            </Link>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setForgetPassModalOpen(true)}
              className={style.link}
            >
              Forget Password?
            </motion.button>
          </>
        ) : null}
      </motion.div>

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        {forgetPassModalOpen && (
          <ModalOverlay>
            <ForgetPassModal setForgetPassModalOpen={setForgetPassModalOpen} />
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
