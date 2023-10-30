'use client';
import styled from 'styled-components';
export default function Button() {
  return <ButtonWrapper>button</ButtonWrapper>;
}

const ButtonWrapper = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background: lightseagreen;
  color: lemonchiffon;
  border: none;
  font-weight: 700;
  flex-grow: 1;
  width: 0;
`;
