import React, { useState } from "react";
import ChatState from "../../Context/ChatContext";
import S from "./Nav.module.scss";
import talkshawk_logo from "../../Assets/talkshawk_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import Profile from "../Profile/Profile";
import CreateGroup from "../CreateGroup/CreateGroup";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover/Popover";

const Nav: React.FC = () => {
  const { user, setFetchChatsAgain } = ChatState();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);

  const nev = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("talkshawk_user");
    nev("/");
  };

  return (
    <div
      className={S.nav_main}
      onClick={() => {
        if (menuOpen) setMenuOpen(false);
      }}
    >
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger className="border-none">
          <div className={S.user_profile}>
            <img
              title="Profile"
              className={S.user_pic}
              src={user?.pic}
              alt="user profile pic"
              onClick={() => setMenuOpen((p) => !p)}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className={S.popover_content}>
          <div
            className={S.popover_item}
            onClick={() => {
              setPopoverOpen(false);
              setIsProfileModalOpen(true);
            }}
          >
            Profile
          </div>
          <div className={S.popover_item} onClick={handleLogOut}>
            Logout
          </div>
        </PopoverContent>
      </Popover>

      <img
        className={S.logo}
        src={talkshawk_logo}
        alt="TalkShawk Logo"
        onClick={() => setFetchChatsAgain((p) => !p)}
      />

      <div title="Create Group">
        <FontAwesomeIcon
          className={S.group_icon}
          icon={faUserGroup}
          onClick={() => setIsGroupModalOpen(true)}
        />
      </div>
      <AnimatePresence mode="wait">
        {isProfileModalOpen && (
          <ModalOverlay
            initial={{ translateY: "-100%" }}
            animate={{ translateY: "0%" }}
            exit={{ translateY: "-100%" }}
          >
            <Profile setIsProfileModalOpen={setIsProfileModalOpen} />
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/*  */}

      <AnimatePresence mode="wait">
        {isGroupModalOpen && (
          <ModalOverlay
            initial={{ scale: 0, transformOrigin: "top right" }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transformOrigin: "top right" }}
          >
            <CreateGroup setIsGroupModalOpen={setIsGroupModalOpen} />
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
