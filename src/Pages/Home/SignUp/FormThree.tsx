import React, { FC, useState } from "react";
import style from "./SignUp.module.scss";
import { motion } from "framer-motion";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TProp = {
  updateFormData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  cpassword: string;
  isPassValid: boolean;
  setIsPassValid: React.Dispatch<React.SetStateAction<boolean>>;
  isPassSame: boolean;
  setIsPassSame: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
};

const FormThree: FC<TProp> = ({
  updateFormData,
  password,
  cpassword,
  isPassValid,
  setIsPassValid,
  isPassSame,
  setIsPassSame,
  isSubmitting,
}) => {
  const [passShow, setPassShow] = useState(false);
  const [cPassShow, setCPassShow] = useState(false);

  const isValidPassword = (query: string) => {
    const RegEx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (RegEx.test(query)) {
      setIsPassValid(true);
    } else {
      setIsPassValid(false);
    }
    isPasswordSame(cpassword);
  };

  const isPasswordSame = (query: string) => {
    setIsPassSame(false);
    if (password === query) {
      setIsPassSame(true);
    } else {
      setIsPassSame(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={style.single_form}
      >
        <div>
          <div className={`${style.pass_wrapper}`}>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              disabled={isSubmitting}
              type={passShow ? "text" : "password"}
              placeholder="Enter Password"
              name="password"
              onChange={(e) => {
                updateFormData(e);
                isValidPassword(e.target.value);
              }}
              value={password}
            />
            <button
              onClick={() => setPassShow((p) => !p)}
              className={style.show_btn}
              type="button"
            >
              {passShow ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className={style.small_msg}>
            <p style={{ color: isPassValid ? "green" : "red" }}>
              {isPassValid ? "Looks Good" : "alphas+nums & min 8 chars"}
            </p>
          </div>
        </div>
        {/*  */}
        <div>
          <div className={`${style.pass_wrapper}`}>
            <motion.input
              whileFocus={{ scale: 1.05 }}
              disabled={!isPassValid || isSubmitting}
              type={cPassShow ? "text" : "password"}
              placeholder="Re-Enter Password"
              name="cpassword"
              onChange={(e) => {
                updateFormData(e);
                isPasswordSame(e.target.value);
              }}
              value={cpassword}
            />
            <button
              onClick={() => setCPassShow((p) => !p)}
              className={`${style.show_btn} ${style.showbtn2}`}
              type="button"
            >
              {cPassShow ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
          <div className={style.small_msg}>
            <p style={{ color: isPassSame ? "green" : "red" }}>
              {isPassSame
                ? "Good! same as password"
                : "Must be same as Password"}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FormThree;
