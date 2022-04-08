import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Header from './Header';
import Form from './Form';
import Section from './Section';

function App() {
  const [texts, setTexts] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesOnPage = 1;

  /** */
  useEffect(() => {
    if(localStorage.getItem('texts')) {
      setTexts(JSON.parse(localStorage.getItem('texts')));
    }
  }, []);

  /** */
  useEffect(() => {
    const pages = Math.ceil(texts.length / articlesOnPage);
    const arr = [];
    for (let i = 1; i <= pages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [texts]);

  /** */
  const handleGetNewText = (newText) => {
    setTexts([newText, ...texts]);
    localStorage.setItem('texts', JSON.stringify([newText, ...texts]));
  }

  /** */
  const handleGetPage = (page) => {
    setTimeout(() => {
      setCurrentPage(page);
    }, 200);
  }

  /** */
  return (
    <>
      <Page>
        <PageWrapper>
          <Header />
          <Form getNewText={handleGetNewText}/>
          <div>
            <Button 
              onClick={() => {handleGetPage(currentPage - 1)}}
              disabled={currentPage <= 1}
            >
              &lt;
            </Button>
            {
              texts && pages.map((page) => {
                return (
                  <PageButton 
                    key={page} 
                    currentPage = {currentPage}
                    value={page}
                    onClick={() => handleGetPage(page)}
                  >
                    {page}
                  </PageButton>
                )
              })
            }
            <Button 
              onClick={() => {handleGetPage(currentPage + 1)}}
              disabled={currentPage >= pages.length}
            >
              &gt;
            </Button>
          </div>
          <Section setTexts={texts.slice((currentPage - 1) * articlesOnPage, currentPage * articlesOnPage)}/>
          <div>
            <Button 
              onClick={() => {handleGetPage(currentPage - 1)}}
              disabled={currentPage <= 1}
            >
              &lt;
            </Button>
            {
              texts && pages.map((page) => {
                return (
                  <PageButton 
                    key={page} 
                    currentPage = {currentPage}
                    value={page}
                    onClick={() => handleGetPage(page)}
                  >
                    {page}
                  </PageButton>
                )
              })
            }
            <Button 
              onClick={() => {handleGetPage(currentPage + 1)}}
              disabled={currentPage >= pages.length}
            >
              &gt;
            </Button>
          </div>
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

const Button = styled.button`
  margin: 1em;
  padding: .5em;
  background-color: ${props => props.disabled ? '#a693a1' : '#c484b2'};
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border-radius: 2px;
`;

const PageButton = styled.button`
  margin: .2em;
  padding: .5em;
  background-color: ${props => props.value === props.currentPage ? '#c484b2' : '#fff'};
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.value === props.currentPage ? '#fff' : '#a693a1'};
`;
