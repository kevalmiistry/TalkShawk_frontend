import { motion } from "framer-motion";
import React, { FC } from "react";
import S from "./LocalOverLay.module.scss";

type TProp = {
  children: React.ReactNode;
  bgColor?: string;
  initial?: object;
  animate?: object;
  exit?: object;
};
const LocalOverLay: FC<TProp> = ({
  children,
  bgColor,
  initial,
  animate,
  exit,
}) => {
  const styles = {
    backgroundColor: bgColor ? bgColor : "rgba(34,34,34, 0.8)",
  };
  return (
    <>
      <motion.div
        initial={initial ? initial : { opacity: 0, scale: 0.9 }}
        animate={animate ? animate : { opacity: 1, scale: 1 }}
        exit={exit ? exit : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className={S.overlay_main}
        style={styles}
      >
        {children}
      </motion.div>
    </>
  );
};

export default LocalOverLay;
