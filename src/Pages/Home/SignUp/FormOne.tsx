import React, { FC, useState } from "react";
import style from "./SignUp.module.scss";
import smallSpinner from "../../../Assets/small_spinner.gif";
import { motion } from "framer-motion";
import axios from "axios";

type TProp = {
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  username: string;
  isEmailAvailable: boolean;
  isUsernameAvailable: boolean;
  setIsEmailAvailable: any;
  setIsUsernameAvailable: any;
};
const FormOne: FC<TProp> = ({
  updateFormData,
  email,
  username,
  isEmailAvailable,
  isUsernameAvailable,
  setIsEmailAvailable,
  setIsUsernameAvailable,
}) => {
  const [isEmailOk, setIsEmailOk] = useState(false);
  const [isUsernameOk, setIsUsernameOk] = useState(false);

  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isUsernameLoading, setIsUsernameLoading] = useState(false);

  const isValidEmail = async (query: string) => {
    const RegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // eslint-disable-next-line
    setIsEmailAvailable(false);
    if (RegEx.test(query)) {
      setIsEmailOk(true);
      // fetch email check api
      setIsEmailLoading(true);
      const url = import.meta.env.VITE_APP_API_URL + "/user/isemail";

      const { data } = await axios.post(url, { email: query });
      setIsEmailLoading(false);
      setIsEmailAvailable(data.available);
    } else {
      setIsEmailOk(false);
    }
  };

  const isValidUsername = async (query: string) => {
    setIsUsernameAvailable(false);
    const RegEx = /^[a-zA-Z0-9_]+$/;
    if (RegEx.test(query)) {
      setIsUsernameOk(true);
      setIsUsernameLoading(true);
      // fetch username check api
      const url = import.meta.env.VITE_APP_API_URL + "/user/isusername";

      const { data } = await axios.post(url, { username: query });
      setIsUsernameLoading(false);
      setIsUsernameAvailable(data.available);
    } else {
      setIsUsernameOk(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ translateX: "-150%" }}
        animate={{ translateX: "0%" }}
        exit={{ translateX: "-150%" }}
        className={style.single_form}
      >
        <div>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => {
              updateFormData(e);
              isValidEmail(e.target.value);
            }}
            value={email}
          />
          <div className={style.small_msg}>
            {!isEmailLoading ? (
              <p
                style={{
                  color: isEmailAvailable ? "green" : "red",
                }}
              >
                {email === "" ? "" : !isEmailOk && "Email is not valid!"}
                {email === "" || !isEmailOk
                  ? ""
                  : !isEmailAvailable
                    ? "Email already used!"
                    : "Email is available!"}
              </p>
            ) : (
              <img
                className={style.small_spinner}
                src={smallSpinner}
                alt="small spinner"
              />
            )}
          </div>
        </div>
        <div>
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={(e) => {
              updateFormData(e);
              isValidUsername(e.target.value);
            }}
            value={username}
          />
          <div className={style.small_msg}>
            {!isUsernameLoading ? (
              <p
                style={{
                  color: isUsernameAvailable ? "green" : "red",
                }}
              >
                {username === ""
                  ? ""
                  : !isUsernameOk && "Username is not valid!"}
                {username === "" || !isUsernameOk
                  ? ""
                  : !isUsernameAvailable
                    ? "Username is already Taken!"
                    : "Username is available!"}
              </p>
            ) : (
              <img
                className={style.small_spinner}
                src={smallSpinner}
                alt="small spinner"
              />
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FormOne;
