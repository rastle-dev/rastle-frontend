import styled from "styled-components";
import React from "react";

const Container = styled.div`
  width: 88%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  //position: fixed;
  bottom: 0;
  z-index: 999;
  padding: 1rem 0 3rem 0;
  p {
    font-size: 1rem;
    font-weight: 600;
  }
  div {
    font-size: 1rem;
    font-weight: 300;
  }
`;

function DefaultHeader() {
  return (
    <Container>
      <p>INSTAGRAM</p>
      <div>@rastle_fashion</div>
    </Container>
  );
}

export default DefaultHeader;
