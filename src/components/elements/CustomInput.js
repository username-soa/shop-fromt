import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const CustomInput = ({
  margin,
  label,
  required,
  textarea,
  id,
  bg,
  border,
  zindex,
  width,
  ...props
}) => {
  const [field, meta] = useField(props);

  const togglePassword = (id) => {
    const input = document.getElementById(id);
    if (input) {
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  };

  return (
    <Container
      margin={margin}
      bg={bg}
      zindex={zindex}
      border={border}
      width={width}
    >
      {label ? (
        <label htmlFor={props.id || props.name}>
          {label} {required ? <span className="red">*</span> : null}
        </label>
      ) : null}

      <div className="input-wrp">
        {!textarea ? (
          <input className="input" id={id} {...field} {...props} />
        ) : (
          <textarea className="input" {...field} {...props} rows="8" />
        )}

        {props.type === "password" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.875"
            height="14"
            viewBox="0 0 18.875 14"
            onClick={() => togglePassword(id)}
          >
            <g id="eye" transform="translate(-0.5 -3.5)">
              <path
                id="Path_17"
                data-name="Path 17"
                d="M1,10.5S4.25,4,9.938,4s8.937,6.5,8.937,6.5S15.625,17,9.938,17,1,10.5,1,10.5Z"
                fill="none"
                stroke="#393d46"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
              <circle
                id="Ellipse_18"
                data-name="Ellipse 18"
                cx="3"
                cy="3"
                r="3"
                transform="translate(7 7.5)"
                strokeWidth="1"
                stroke="#393d46"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>
        ) : null}
      </div>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Container>
  );
};

export default CustomInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "inherit")};
  margin: ${(props) => (props.margin ? props.margin : "0")};
  z-index: ${(props) => (props.zindex ? props.zindex : "0")};
  label {
    font-size: 15px;
    font-weight: 600;
    color: #4d4d4d;
    margin-bottom: 0.35em;
    margin-top: 1.5em;
  }
  input,
  textarea {
    padding: 10px;
    font-size: 14px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    margin-bottom: 0.35em;
    background-color: ${(props) => (props.bg ? props.bg : "#fff")};
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
        rgb(237 239 247 / 47%) 0px 6px 6px;
      border: 2px solid #393d46;
    }
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: 600;
  }
  .input-wrp {
    position: relative;
  }
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    cursor: pointer;
  }
  .red {
    color: red;
  }
  @media only screen and (max-width: 768px) {
    margin: 0 !important;
  }
`;
