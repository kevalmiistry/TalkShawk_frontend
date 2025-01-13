import { motion } from "framer-motion";
import React, { FC, useState } from "react";
import TSLogo from "../../Assets/talkshawk_logo.png";
import S from "./ForgetPassword.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastState } from "../../Context/ToastContext";
import axios from "axios";

type TProp = {};
const ForgetPassword: FC<TProp> = () => {
  const param = useParams();
  const token = param.token;

  const nev = useNavigate();

  const { showToast } = ToastState();

  const [isOTPOK, setIsOTPOK] = useState(false);
  const [isPasswordOk, setIsPasswordOk] = useState(false);
  const [isCPasswordOk, setIsCPasswordOk] = useState(false);

  const [OTP, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value);

    const RegEx = /^[0-9]{6,6}$/;
    if (RegEx.test(e.target.value)) {
      setIsOTPOK(true);
    } else {
      setIsOTPOK(false);
    }
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    const RegEx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (RegEx.test(e.target.value)) {
      setIsPasswordOk(true);
    } else {
      setIsPasswordOk(false);
    }
  };
  const handleCPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpassword(e.target.value);

    const RegEx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (RegEx.test(e.target.value) && password === e.target.value) {
      setIsCPasswordOk(true);
    } else {
      setIsCPasswordOk(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const url = import.meta.env.VITE_APP_API_URL + "/user/forgetpassword";
      const config = { headers: { "auth-token": token } };
      const dataToSend = {
        newPassword: password,
        OTP,
      };
      const { data } = await axios.patch(url, dataToSend, config);
      if (data?.success) {
        showToast({
          message: data?.message,
          show: true,
          status: "success",
        });
        nev("/");
      } else {
        showToast({
          message: data?.message,
          show: true,
          status: "error",
        });
      }

      setIsSubmitting(false);
    } catch (error) {
      showToast({
        message: "Something went wrong",
        show: true,
        status: "error",
      });
    }
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={S.main}
      >
        <div className={`${S.main_title}`}>
          <h1>TalkShawk</h1>
          <img src={TSLogo} alt="TalkShawk Main Logo" />
        </div>

        <div className={S.form_container}>
          <label className={S.instruct} htmlFor="otp">
            Enter OTP:
          </label>
          <motion.input
            disabled={isSubmitting}
            whileFocus={{ scale: 1.05 }}
            id="otp"
            className={S.input}
            type="number"
            name="otp"
            placeholder="OTP"
            value={OTP}
            onChange={handleOTPChange}
          />
          <p style={{ color: "red" }} className={S.msg}>
            {OTP ? (!isOTPOK ? "OTP must be of 6 digits" : "") : null}
          </p>

          <label className={S.instruct} htmlFor="newpassword">
            Enter New Password:
          </label>

          <div className={S.input_wrapper}>
            <motion.input
              disabled={isSubmitting}
              whileFocus={{ scale: 1.05 }}
              id="newpassword"
              className={S.input}
              type={showPassword ? "text" : "password"}
              name="otp"
              placeholder="New Pasword"
              value={password}
              onChange={handlePasswordChange}
            />
            {showPassword ? (
              <FontAwesomeIcon
                className={S.icon}
                icon={faEyeSlash}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FontAwesomeIcon
                className={S.icon}
                icon={faEye}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <p
            style={{ color: isPasswordOk ? "green" : "red" }}
            className={S.msg}
          >
            {password
              ? isPasswordOk
                ? "Looks good"
                : "alpha+numeric and atleast 8 chars"
              : null}
          </p>

          <label className={S.instruct} htmlFor="cnewpassword">
            Re-Enter New Password:
          </label>

          <div className={S.input_wrapper}>
            <motion.input
              disabled={isSubmitting}
              whileFocus={{ scale: 1.05 }}
              id="cnewpassword"
              className={S.input}
              type={showPassword ? "text" : "password"}
              name="otp"
              placeholder="Confirm New Password"
              value={cpassword}
              onChange={handleCPasswordChange}
            />
            {showPassword ? (
              <FontAwesomeIcon
                className={S.icon}
                icon={faEyeSlash}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FontAwesomeIcon
                className={S.icon}
                icon={faEye}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <p
            style={{ color: isCPasswordOk ? "green" : "red" }}
            className={S.msg}
          >
            {cpassword
              ? isCPasswordOk
                ? "Looks good"
                : "Must be same as password"
              : null}
          </p>

          <button
            disabled={
              !isOTPOK || !isPasswordOk || !isCPasswordOk || isSubmitting
            }
            className={`btn ${S.verify_btn} ${
              !isOTPOK || !isPasswordOk || !isCPasswordOk || isSubmitting
                ? " disable"
                : ""
            }`}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </div>
      </motion.section>
    </>
  );
};

export default ForgetPassword;
