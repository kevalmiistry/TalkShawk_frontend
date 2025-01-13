import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import useMultistepForm from "../../../Hooks/useMultistepForm";
import whiteSpinner from "../../../Assets/white_spinner.gif";
import FormThree from "./FormThree";
import FormTwo from "./FormTwo";
import FormOne from "./FormOne";
import TSLogo from "../../../Assets/talkshawk_logo.png";
import style from "./SignUp.module.scss";
import axios from "axios";

type AccountData = {
  email: string;
  username: string;
  name: string;
  password: string;
  cpassword: string;
};

const INITIAL_DATA: AccountData = {
  email: "",
  username: "",
  name: "",
  password: "",
  cpassword: "",
};

const SignUp: FC = () => {
  document.title = "TalkShawk | Signup";
  const navigate = useNavigate();
  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [currentStepState, setCurrentStepState] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<AccountData>(INITIAL_DATA);

  /*** States for Form One ***/
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  /*** States for Form Two ***/
  const [pic, setPic] = useState<string | null>(null);

  /*** States for Form Three ***/
  const [isPassValid, setIsPassValid] = useState(false);
  const [isPassSame, setIsPassSame] = useState(false);

  // useMultistepForm Hook Start
  const {
    theStep,
    next,
    back,
    currentStepIndex,
    isFirstPage,
    isLastPage,
    stepsLength,
  } = useMultistepForm([
    <FormOne
      updateFormData={updateFormData}
      {...formData}
      isEmailAvailable={isEmailAvailable}
      setIsEmailAvailable={setIsEmailAvailable}
      isUsernameAvailable={isUsernameAvailable}
      setIsUsernameAvailable={setIsUsernameAvailable}
    />,
    <FormTwo
      updateFormData={updateFormData}
      {...formData}
      pic={pic}
      setPic={setPic}
    />,
    <FormThree
      updateFormData={updateFormData}
      {...formData}
      isPassValid={isPassValid}
      setIsPassValid={setIsPassValid}
      isPassSame={isPassSame}
      setIsPassSame={setIsPassSame}
      isSubmitting={isSubmitting}
    />,
  ]);
  // useMultistepForm Hook End

  const nextStyle = {
    cursor: isEmailAvailable && isUsernameAvailable ? "pointer" : "not-allowed",
  };

  // Fetch createuser API Function
  const handleCreateUser = async () => {
    setIsSubmitting(true);

    const url = import.meta.env.VITE_APP_API_URL + "/user/createuser";

    const { data } = await axios.post(url, {
      name: formData.name === "" ? formData.username : formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      pic: pic,
    });

    if (data.success) {
      navigate("/signupcomplete");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${style.signup_main}`}
    >
      <div className={`${style.main_title}`}>
        <h1>TalkShawk</h1>
        <img src={TSLogo} alt="TalkShawk Main Logo" />
      </div>

      <div className={style.progress_wrapper}>
        <div className={style.progress}>
          {currentStepIndex + 1 + "/" + stepsLength}
        </div>
      </div>

      <form>
        <AnimatePresence mode="wait">{theStep}</AnimatePresence>
      </form>

      <div className={`flex between ${style.bottom_btns}`}>
        {/* Back Starts */}
        {!isFirstPage ? (
          <button
            disabled={isSubmitting}
            className={`${style.back_btn} ${isSubmitting && "disable"}`}
            onClick={() => {
              back();
              setCurrentStepState(currentStepIndex);
            }}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {/* Next & Finish Starts */}
        {isLastPage ? (
          <button
            disabled={isSubmitting || !isPassSame}
            className={`${style.next_btn} ${
              isSubmitting || !isPassSame ? "disable" : ""
            }`}
            style={nextStyle}
            onClick={() => {
              next();
              handleCreateUser();
            }}
          >
            {isSubmitting ? (
              <>
                <span>Submiting&nbsp;</span>
                <img
                  src={whiteSpinner}
                  alt="spinning gif"
                  style={{ width: "1rem" }}
                />
              </>
            ) : (
              "Finish"
            )}
          </button>
        ) : (
          <button
            disabled={!isEmailAvailable || !isUsernameAvailable}
            className={`${style.next_btn} ${
              !isEmailAvailable || !isUsernameAvailable ? "disable" : ""
            }`}
            style={nextStyle}
            onClick={() => {
              next();
              setCurrentStepState(currentStepIndex);
            }}
          >
            Next
          </button>
        )}
      </div>

      {!isSubmitting ? (
        <Link className={style.link} to={"/login"}>
          Login
        </Link>
      ) : null}
    </motion.div>
  );
};

export default SignUp;
