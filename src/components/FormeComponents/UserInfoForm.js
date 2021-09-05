import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/CustomInput";
import Button from "../elements/Button";

const UserInfoForm = ({ updateInfo, user }) => {
  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fname: user?.firstName || "",
          lname: user?.lastName || "",
          email: user?.email || "",
          phone: user?.phone || "",
          pwd: "",
        }}
        validationSchema={Yup.object({
          fname: Yup.string().required("Champ obligatoire"),
          lname: Yup.string().required("Champ obligatoire"),
          email: Yup.string()
            .required("Champ obligatoire")
            .email("doit être une adresse e-mail"),
          phone: Yup.string().required("Champ obligatoire"),
          pwd: Yup.string(),
        })}
        onSubmit={async (data) => {
          await updateInfo(data, user.shopifyID);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form className="form first-form">
            <h2>Login & security</h2>
            <div className="input-wrp">
              <CustomInput placeholder="Prénom" name="fname" id="fname" />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Nom" name="lname" id="lname" />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Email" name="email" id="email" />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Téléphone" name="phone" id="phone" />
            </div>
            <div className="input-wrp">
              <CustomInput
                placeholder="Password"
                name="pwd"
                id="pwd"
                type="password"
              />
            </div>
            <div className="btn-wrp-form">
              <Button
                bg="#fff"
                color="#393d46"
                border="#393d46"
                hover="#393d46"
                radius="0"
                title={isSubmitting ? "Enregistrer..." : "Enregistrer"}
                handleClick={handleSubmit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default UserInfoForm;

const Container = styled.div`
  padding: 2em;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  form {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
  }
  h2 {
    color: #393d46;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 2em;
    letter-spacing: 2px;
    grid-column: 1/3;
  }
  .input-wrp {
    margin: 0.25em;
  }
  .btn-wrp-form {
    grid-column: 1/3;
    > div {
      width: fit-content;
      margin: 0.5em auto;
    }
  }
  input {
    width: 100%;
  }
  @media only screen and (max-width: 1200px) {
    margin-top: 1em;
    form {
      grid-template-columns: 100%;
    }
    h2,
    .btn-wrp-form {
      grid-column: 1/2;
    }
  }
`;
