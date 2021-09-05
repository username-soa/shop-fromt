import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/CustomInput";
import Button from "../elements/Button";
import { ReactComponent as PlusIcone } from "../../assets/down-arrow.svg";
import { ReactComponent as CloseIcone } from "../../assets/cancel.svg";

const ContactForm = ({ login, feedback, handleClick }) => {
  const history = useHistory();

  return (
    <Container>
      <div className="popup-top">
        <h2 className="contact-form-h2">Contact Form</h2>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fname: "",
          lname: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={Yup.object({
          fname: Yup.string().required("Champ obligatoire"),
          lname: Yup.string().required("Champ obligatoire"),
          email: Yup.string()
            .email("doit être une adresse e-mail")
            .required("Champ obligatoire"),
          phone: Yup.string().required("Champ obligatoire"),
          message: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          await handleClick(data);
          if (feedback?.status === 1 || feedback?.status === null) {
            console.log("inside resete");
            resetForm();
          }
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, values }) => (
          <Form className="form first-form">
            <div className="input-row-contact">
              <CustomInput
                label="Prénom"
                name="fname"
                placeholder="Prénom"
                id="fname"
                type="text"
              />
            </div>
            <div className="input-row-contact">
              <CustomInput
                label="Nom"
                name="lname"
                placeholder="Nom"
                id="lname"
                type="text"
              />
            </div>
            <div className="input-row-contact">
              <CustomInput
                label="Email"
                name="email"
                placeholder="Email"
                id="email"
                type="text"
              />
            </div>
            <div className="input-row-contact">
              <CustomInput
                label="Téléphone"
                name="phone"
                placeholder="Phone"
                id="phone"
                type="text"
              />
            </div>
            <div className="form-contact-middle"></div>
            <div className="input-row-contact extra-margin">
              <CustomInput
                label="Votre message"
                name="message"
                placeholder="Your message"
                id="message"
                type="text"
                textarea
              />
            </div>

            <div className="form-contact-bottom">
              <Button
                handleClick={handleSubmit}
                title={isSubmitting ? "Envoyer..." : "Envoyer"}
                type="button"
                bg="#1e212d"
                color="#fff"
                margin="0.5em"
              />
              <Button
                handleClick={(e) => {
                  e.preventDefault();
                  history.push("/");
                }}
                title="Home"
                type="button"
                color="#1e212d"
                bg="#fff"
                border="#1e212d"
                hover="#1e212d"
                margin="0.5em"
              />
              {/* <div className="back-btn">
                <PlusIcone />
                <button
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Go Home
                </button>
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ContactForm;

const Container = styled.div`
  padding: 1em;
  background: #fff;
  border-radius: 10px;
  width: calc(100vw - 400px - 3em);
  height: 100%;
  margin: 0 0 0 1em;
  box-shadow: rgb(237 239 247 / 47%) 0px 10px 20px,
    rgb(237 239 247 / 47%) 0px 6px 6px;
  .contact-form-h2 {
    font-size: 1.5rem;
    font-weight: 500 !important;
    letter-spacing: 7px;
    margin: 1em 0 0 0;
    color: #222;
  }
  form {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
    height: fit-content;
    margin: 6em 0;
  }
  input,
  textarea {
    width: 95%;
  }
  .extra-margin {
    margin: 0 0.5em;
    grid-column: 1/3;
  }
  /* .form-contact-middle {
    grid-column: 1/3;
  } */
  .input-row-contact {
    margin: 0.5em 0;
  }
  .popup-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    svg {
      cursor: pointer;
      g {
        path {
          fill: #000 !important;
        }
      }
    }
  }
  .back-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 14px;
      height: 14px;
      margin: 0 0.1em;
      transform: rotate(90deg);
    }
    button {
      padding: 1em;
      background: transparent;
    }
  }
  .form-contact-bottom {
    grid-column: 1/3;
    > div {
      width: fit-content;
      margin: 1em auto;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: calc(100vw - 3em);
    margin: 0;
    box-shadow: none;
    .input-row-contact,
    form {
      margin: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    form {
      grid-template-columns: 100% !important;
      grid-template-rows: auto;
    }
    .form-contact-bottom,
    .extra-margin {
      grid-column: 1/2;
    }
  }
`;
