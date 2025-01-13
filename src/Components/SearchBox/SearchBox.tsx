import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import S from "./SearchBox.module.scss";
import whiteSpinner from "../../Assets/white_spinner.gif";

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
}) => {
  return (
    <div className={S.search}>
      {isSearchOnFocus && (
        <FontAwesomeIcon
          onClick={() => {
            setSearch("");
          }}
          className={S.close_icons}
          icon={faArrowLeft}
        />
      )}
      {isSearching && (
        <img className={S.spinner} src={whiteSpinner} alt="loading spinner" />
      )}
      <input
        type="text"
        placeholder={
          isSearchOnFocus ? "Search with name, username..." : "Search..."
        }
        value={search}
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
};

export default SearchBox;
