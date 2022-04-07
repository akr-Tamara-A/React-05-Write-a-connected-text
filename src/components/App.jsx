import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Form from './Form';
import Section from './Section';

function App() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('texts')) {
      setTexts(JSON.parse(localStorage.getItem('texts')));
    }
  }, []);

  const handleGetNewText = (newText) => {
    setTexts([newText, ...texts]);
    localStorage.setItem('texts', JSON.stringify([newText, ...texts]));
  }

  return (
    <>
      <Page>
        <PageWrapper>
          <Header />
          <Form getNewText={handleGetNewText}/>
          <Section setTexts={texts}/>
        </PageWrapper>
      </Page>
      <GlobalStyles />
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
  }
`;

const Page = styled.div`
  min-height: 100vh;
  background-color: white;
  margin: 0;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  `;

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
