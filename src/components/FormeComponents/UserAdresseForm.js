import React from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../elements/Button";
import CustomInput from "../elements/CustomInput";

const UserAdresseForm = ({ updateAdresse, user }) => {
  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={{
          address1: user?.address1 || "",
          address2: user?.address2 || "",
          city: user?.city || "",
          company: user?.company || "",
          country: user?.country || "",
          province: user?.province || "",
          zip: user?.zip || "",
        }}
        validationSchema={Yup.object({
          address1: Yup.string().required("Champ obligatoire"),
          address2: Yup.string(),
          city: Yup.string().required("Champ obligatoire"),
          company: Yup.string().required("Champ obligatoire"),
          country: Yup.string(),
          province: Yup.string().required("Champ obligatoire"),
          zip: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (data) => {
          await updateAdresse(data);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form className="form first-form">
            <h2>Adresse de livraison</h2>
            <div className="input-wrp">
              <CustomInput
                placeholder="l'adresse postale ou le numéro de boîte postale."
                name="address1"
                id="address1"
              />
            </div>
            <div className="input-wrp">
              <CustomInput
                placeholder="Apparetement (facultatif)"
                name="address2"
                id="address2"
              />
            </div>
            <div className="input-wrp">
              <CustomInput
                placeholder="Entreprise"
                name="company"
                id="company"
              />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Pays" name="country" id="country" />
            </div>
            <div className="input-wrp">
              <CustomInput
                placeholder="Province"
                name="province"
                id="province"
              />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Ville" name="city" id="city" />
            </div>
            <div className="input-wrp">
              <CustomInput placeholder="Code Postale" name="zip" id="zip" />
            </div>
            <div className="btn-wrp-form">
              <Button
                bg="#fff"
                color="#393d46"
                title="Voir plus"
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

export default UserAdresseForm;

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
