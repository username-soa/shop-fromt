import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import firebase from "firebase/app";
import Button from "../elements/Button";
import CustomInput from "../elements/CustomInput";
import FeedBack from "../elements/FeedBack";
import { ReactComponent as Subscribe } from "../../assets/subscribe.svg";
import { ReactComponent as Abonner } from "../../assets/abonner.svg";

const NewsLetter = ({ handleEmail, feedback }) => {
  const [userAID, setuserAID] = useState();
  let mounted = true;

  return (
    <Container>
      <div className="newsletter-container">
        <div className="news-header">
          <h2 className="footer-h2">QUOI DE NEUF?</h2>
          <p>abonnez vous pour avoir les dernière nouvelles est soldes</p>
        </div>

        <div className="news-bottom">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("email adddress invalide")
                .required("Champ obligatoire"),
            })}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              await handleEmail(data);
              setSubmitting(false);
            }}
          >
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
              <Form>
                <CustomInput
                  //zindex="1"
                  margin="0"
                  bg="#f2f2f2"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Entrer votre adresse email"
                />
                <Button
                  handleClick={handleSubmit}
                  title={isSubmitting ? "Abonner..." : "Abonner"}
                  type="submit"
                  bg="#393d46"
                  color="#fff"
                  title="Voir plus"
                  border="#fff"
                  hover="#fff"
                  margin="0"
                  radius="0"
                />
              </Form>
            )}
          </Formik>
          {feedback?.status ? (
            <FeedBack message={feedback?.message} bg="#000" color="#fff" />
          ) : null}
        </div>
      </div>
    </Container>
  );
};
export default NewsLetter;

const Container = styled.div`
  padding: 1em;
  margin: 1em 150px;
  color: #fff;
  background: #393d46;
  .newsletter-container {
    border: 1px solid #fff;
    padding: 1em;
    display: grid;
    grid-template-columns: 50% 50%;
  }
  p {
    text-align: justify;
  }
  .news-header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .footer-h2 {
      margin-right: 1.5rem;
      max-width: 50rem;
      font-size: 3rem;
      margin-bottom: -0.1rem;
    }
  }
  .news-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    height: center;
    form {
      display: flex;
      justify-content: center;
      height: center;
      margin: 2em 0 1em;
    }
    .input {
      padding: 10px;
      font-size: 14px;
      border-radius: 0;
      max-width: 250px;
      background-color: ${(props) => (props.bg ? props.bg : "#fff")};
    }
    button {
      margin: 0 0.5em 0 0;
      padding: 10px 29px;
    }
  }
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    margin: 1em;
  }
  @media only screen and (max-width: 768px) {
    .news-middle {
      svg {
        width: 60%;
      }
    }
    .news-bottom {
      margin-top: 0.75em;
    }
    .newsletter-container {
      grid-template-columns: 100%;
    }
  }
  @media only screen and (max-width: 450px) {
    .news-bottom {
      form {
        flex-direction: column;
        align-items: center;
        .input {
          margin-bottom: 0.35em;
        }
        .input,
        button {
          border-radius: 7px !important;
          margin-top: 0.5em;
        }
      }
    }
  }
`;
