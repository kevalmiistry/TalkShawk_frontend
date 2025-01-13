import React, { createContext, useContext, useState } from "react";

type TToast = {
  show: boolean | false;
  message: string;
  status: string;
  duration?: number | 3000;
};
type IToastContext = {
  toast: TToast;
  setToast: React.Dispatch<React.SetStateAction<TToast>>;
  showToast: (obj: TToast) => void;
};

export const ToastContext = createContext<IToastContext>({} as IToastContext);

type TProp = {
  children: React.ReactNode;
};

const ToastProvider: React.FC<TProp> = ({ children }) => {
  const [toast, setToast] = useState<TToast>({ show: false } as TToast);

  const showToast = (obj: TToast) => {
    const { message, status, duration } = obj;
    setToast({
      message,
      show: true,
      status,
    });
    setTimeout(() => {
      setToast({ message: "", show: false, status: "" });
    }, duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ toast, setToast, showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const ToastState = () => {
  return useContext(ToastContext);
};
