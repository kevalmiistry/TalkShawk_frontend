import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import whiteSpinner from "../../Assets/white_spinner.gif";
import React from "react";
import S from "./SearchBox.module.scss";

type TProp = {
  isSearchOnFocus: boolean;
  setIsSearchOnFocus: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (q: string) => void;
  isSearching: boolean;
};

const SearchBox: React.FC<TProp> = ({
  isSearchOnFocus,
  setIsSearchOnFocus,
  search,
  setSearch,
  onSearch,
  isSearching,
}) => (
  <div className={S.search}>
    {isSearchOnFocus ? (
      <FontAwesomeIcon
        onClick={() => {
          setSearch("");
        }}
        className={S.close_icons}
        icon={faArrowLeft}
      />
    ) : null}

    {isSearching ? (
      <img className={S.spinner} src={whiteSpinner} alt="loading spinner" />
    ) : null}

    <input
      type="text"
      value={search}
      placeholder={
        isSearchOnFocus ? "Search with name, username..." : "Search..."
      }
      onChange={(e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
      }}
      onFocus={() => setIsSearchOnFocus(true)}
      onBlur={() => {
        setIsSearchOnFocus(false);
        setSearch("");
      }}
    />
  </div>
);

export default SearchBox;
