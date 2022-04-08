import React, { useState } from "react";
import styled from "styled-components";

import { getWords } from "../utils/utils";

function Form(props) {
  const [words, setWords] = useState([]);
  const [textareaValue, setTextareaValue] = useState("");

  /** */
  const handleButton = () => {
    setTextareaValue("");
    setWords(getWords());
  };

  /** */
  const handleText = (e) => {
    setTextareaValue(e.target.value);
  };

  /** */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (words.length === 5) {
      const usedWords = words.join(" / ");
      const newText = {
        id: Date.now(),
        text: textareaValue.split('\n'),
        date: new Date(),
        usedWords: usedWords,
      };
      props.getNewText(newText);
      clearForm();
    }
  };

  /** Очистка формы */
  function clearForm() {
    setTextareaValue("");
    setWords([]);
  }

  /** */
  return (
    <>
      <FormButton onClick={handleButton}>Сгенерировать слова</FormButton>
      <FormResult>
        {words.map((word) => {
          return <FormWord key={word}>{word}</FormWord>;
        })}
      </FormResult>
      <FormWrapper onSubmit={handleSubmit}>
        <FormTextarea type="text" onChange={handleText} value={textareaValue} minLength='200' maxLength='2000' />
        <FormButton disabled={textareaValue.length < 200}>Запушить</FormButton>
      </FormWrapper>
    </>
  );
}

export default Form;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormTextarea = styled.textarea`
  width: 80%;
  min-height: 200px;
  font-size: 1em;
  margin: 1rem;
  padding: 1em;
  border: 1px solid #c484b2;
`;

const FormButton = styled.button`
  margin: 1em;
  padding: 1em;
  background-color: #c484b2;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-radius: 2px;
  cursor: pointer;
  transition-duration: .35s;
  transition-timing-function: 'easy';

  &:hover {
    background-color: #ca6fb0;
  }

  &:disabled {
    background-color: #a693a1;
    cursor: default;
  }
`;

const FormResult = styled.div`
  max-width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const FormWord = styled.p`
  padding: 0.5em 1em;
  margin: 1em;
  border-radius: 2px;
  background-color: #e7cadf;
  font-style: italic;
`;
