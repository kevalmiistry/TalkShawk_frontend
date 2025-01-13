import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "./Context/ChatContext";
import { FC } from "react";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import SignUpComplete from "./Pages/SignUpComplete/SignUpComplete";
import ToastProvider from "./Context/ToastContext";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import ChatPage from "./Pages/Chat/ChatPage";
import HomePage from "./Pages/Home/HomePage";
import Toast from "./Components/Toast/Toast";
import Login from "./Pages/Home/Login/Login";
import SignUp from "./Pages/Home/SignUp/SignUp";
import "./global.scss";

const App: FC = () => {
  return (
    <>
      <ToastProvider>
        <BrowserRouter>
          <ChatProvider>
            <Toast />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/chat" element={<ChatPage />} />
              <Route path="/signupcomplete" element={<SignUpComplete />} />
              <Route path="/verifyemail/:token" element={<VerifyEmail />} />
              <Route
                path="/forgetpassword/:token"
                element={<ForgetPassword />}
              />
            </Routes>
          </ChatProvider>
        </BrowserRouter>
      </ToastProvider>
    </>
  );
};

export default App;
