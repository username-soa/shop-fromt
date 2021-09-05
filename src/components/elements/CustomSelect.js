import React from "react";
import styled from "styled-components";

const CustomSelect = ({
  width,
  margin,
  radius,
  padding,
  options,
  bg,
  border,
  responsive,
  handleChange,
}) => {
  return (
    <Container
      width={width}
      margin={margin}
      radius={radius}
      padding={padding}
      bg={bg}
      responsive={responsive}
      border={border}
    >
      <select
        className="options"
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {options.map((item, index) => {
          return (
            <option value={item.value} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </Container>
  );
};

export default CustomSelect;

const Container = styled.div`
  width: ${(props) => (props.width === "large" ? "100%" : "auto")};
  font-family: inherit;
  margin: ${(props) => (props.margin ? props.margin : "0.25em 0")};
  .options {
    background: ${(props) => (props.bg ? props.bg : "null")};
    outline: none;
    border: none;
    font-size: 14px;
    width: 100%;
    color: #333;
    font-weight: 500;
    padding: ${(props) => (props.padding ? props.padding : "7px")};
    border-radius: 7px;
    border: ${(props) => (props.border ? "1px solid #333" : "none")};
  }
  @media only screen and (max-width: 500px) {
    width: ${(props) => (props.responsive === "true" ? "100%" : "auto")};
    select {
      width: ${(props) =>
        props.responsive === "true" ? "100% !important" : "auto"};
    }
  }
`;
