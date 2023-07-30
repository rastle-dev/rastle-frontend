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
    font-size: 2rem;
  }
`;
const Home = styled.div`
  font-weight: 200;
  font-size: 1.5rem;
`;

function MainHeader() {
  return (
    <Container>
      <p>shop</p>
      <p>shop</p>
      <p>shop</p>
      <Home>Home</Home>
    </Container>
  );
}

export default MainHeader;
