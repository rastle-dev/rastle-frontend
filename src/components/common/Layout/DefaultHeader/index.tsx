import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  p {
    font-weight: 200;
    font-size: 3.125rem;
  }
`;
const Home = styled.div`
  font-weight: 200;
  font-size: 1.5rem;
`;

function DefaultHeader() {
  return (
    <Container>
      <p>rastle_</p>
      <Home>Home</Home>
    </Container>
  );
}

export default DefaultHeader;
