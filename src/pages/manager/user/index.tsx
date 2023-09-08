import React from "react";
import styled from "styled-components";
import media from "@/styles/media";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  overflow: hidden;
  //border: 1px solid red;

  ${media.mobile} {
    width: 92%;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 2rem;
`;

export default function Manager() {
  return (
    <Wrapper>
      <HeaderTitle>회원관리</HeaderTitle>
      <div></div>
    </Wrapper>
  );
}
