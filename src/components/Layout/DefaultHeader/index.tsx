import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import PATH from "@/constants/path";

const Container = styled.div`
  width: 88%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 5.5rem;
  position: fixed;
  top: 0;
  z-index: 999;
`;
const Home = styled.div`
  font-weight: 200;
  font-size: 1.5rem;
  cursor: pointer;
`;

function DefaultHeader() {
  const router = useRouter();
  return (
    <Container>
      <Home
        onClick={() => {
          router.push(PATH.HOME);
        }}
      >
        Home
      </Home>
    </Container>
  );
}

export default DefaultHeader;
