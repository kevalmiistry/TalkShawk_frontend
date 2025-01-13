import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { ToastState } from "../../Context/ToastContext";
import S from "./Toast.module.scss";
import ReactDOM from "react-dom";

const Toast: React.FC = () => {
  const { toast } = ToastState();
  return ReactDOM.createPortal(
    <>
      <AnimatePresence mode="wait">
        {toast.show && (
          <motion.div
            initial={{ translateY: "-100%", translateX: "-50%" }}
            animate={{ translateY: "0%", translateX: "-50%" }}
            transition={{ duration: 0.1 }}
            exit={{ translateY: "-120%", translateX: "-50%" }}
            className={`${S.toast_main} ${S[toast.status]}`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.getElementById("portal")!
  );
};

export default Toast;
