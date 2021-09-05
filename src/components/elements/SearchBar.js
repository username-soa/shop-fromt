import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchIscone } from "../../assets/search.svg";

const SearchBar = ({ handlSearchInput }) => {
  return (
    <Container>
      <div className="search-wrp">
        <input
          type="text"
          id="sms"
          name="methode"
          onChange={(e) => handlSearchInput(e)}
          placeholder="Rechercher"
          className="searchinput"
        />
        <SearchIscone />
      </div>
    </Container>
  );
};
export default SearchBar;

const Container = styled.div`
  .search-wrp {
    display: flex;
    background-color: #f2f4f8;
    height: fit-content;
    padding: 0.5em;
    border-radius: 10px;
    input {
      width: 100%;
      margin-right: 0.25em;
      background-color: #f2f4f8;
    }
    svg {
      position: relative;
      right: 0;
    }
  }
`;
