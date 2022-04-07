import React from "react";
import styled from 'styled-components';
import { formatDate } from "../utils/utils";


function Section(props) {
  /** */
  const formateDateStyle = (date) => {
    const data = formatDate(new Date(date));
    const arr = data.split(',');
    return `${arr[0].toUpperCase()},${arr[1]}`;
  }

  /** */
  return (
    <SectionWrapper>
      {props.setTexts &&
        props.setTexts.map((item) => {
          return (
            <SectionItem key={item.id}>
              <ItemInfoBlock>
                <ItemInfo>{formateDateStyle(new Date(item.date))}</ItemInfo>
                <ItemInfo>Слова: {item.usedWords}</ItemInfo>
              </ItemInfoBlock>
              {item.text.map((text, index) => {
                return (
                  <ItemText key={index}>{text}</ItemText>
                )
              })}
            </SectionItem>
          );
        })}
    </SectionWrapper>
  );
};

export default Section;

const SectionWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SectionItem = styled.li`
  margin: .5em 1em;
  padding-bottom: 1em;
  border-bottom: 1px solid #c484b2;
`;

const ItemInfoBlock = styled.div`
  margin-bottom: 1em;
`;

const ItemInfo = styled.p`
  font-size: .9em;
  text-indent: 1em;
  color: #c484b2;
  /* margin: 0; */
`;

const ItemText = styled.p`
  text-indent: 1em;
  line-height: 1.2em;
  margin: 0;
`;
