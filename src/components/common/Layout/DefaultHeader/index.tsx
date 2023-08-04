import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 5.5rem;
`;
const Home = styled.div`
  font-weight: 200;
  font-size: 1.5rem;
`;

function DefaultHeader() {
  return (
    <Container>
      <Home>Home</Home>
    </Container>
  );
}

export default DefaultHeader;
