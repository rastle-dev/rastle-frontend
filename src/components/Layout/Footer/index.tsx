import styled from "styled-components";
import React from "react";
import LazyLink from "@/components/LazyLink";
import PATH from "@/constants/path";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: transparent;
  bottom: 0;
  z-index: 1;
  margin-top: 5rem;
  border-top: 1px solid;
  padding-top: 2rem;
  padding-left: 5rem;
  padding-right: 5rem;
  margin-bottom: 2rem;
`;

const CompanyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 0;
  font-weight: 500;
`;

const CompanyTitle = styled.div`
  font-size: 1.3rem;
  padding: 1rem 1rem 1rem 0;
  font-weight: 500;
`;

const InformationDetail = styled.div`
  font-size: 1rem;
  padding: 0.2rem 0.2rem 0.2rem 0;
  font-weight: 300;

  a {
    font-size: 1rem;
    padding: 0.2rem 0.2rem 0.2rem 0;
    font-weight: 400;
  }
`;

const ReturnInformationWrapper = styled.div`
  font-size: 1.5rem;
  padding: 1rem 1rem 1rem 0;
  font-weight: 500;
`;

function DefaultHeader() {
  return (
    <Container>
      <CompanyWrapper>
        <CompanyTitle>Recordy Slow</CompanyTitle>
        <InformationDetail>상호명 : 레슬</InformationDetail>
        <InformationDetail>대표자명 : 홍의성</InformationDetail>
        <InformationDetail>TEL/ 0507-1347-7140</InformationDetail>
        <InformationDetail>사업자등록번호 : 4911602184</InformationDetail>
        <InformationDetail>
          16977 경기도 용인시 기흥구 강남서로 9 (아카데미프라호자) 7층 703호
        </InformationDetail>
        <InformationDetail>
          통신판매업번호 : 2023-용인기흥-4432
        </InformationDetail>
        <InformationDetail>
          개인정보보호 책임자 홍의성/ ghddmltjd17@gmail.com
        </InformationDetail>
        <InformationDetail>
          COPYRIGHT © RASTLE. ALL RIGHTS RESERVED.
        </InformationDetail>
      </CompanyWrapper>
      <ReturnInformationWrapper>
        <CompanyTitle>BANK ACCOUNT</CompanyTitle>
        <InformationDetail>카카오뱅크 3333-28-1864224</InformationDetail>
        <InformationDetail>예금주명 : 홍정성(레슬)</InformationDetail>
      </ReturnInformationWrapper>
      <ReturnInformationWrapper>
        <CompanyTitle>FOLLOW</CompanyTitle>
        <InformationDetail>
          <a href="https://www.instagram.com/recordy.slow/">@recordy.slow</a>
        </InformationDetail>
        <InformationDetail>
          <a href="https://www.instagram.com/rastle__fashion/">
            @rastle__fasihon
          </a>
        </InformationDetail>
      </ReturnInformationWrapper>

      <ReturnInformationWrapper>
        <CompanyTitle>Links</CompanyTitle>
        <LazyLink href={PATH.GUIDE}>
          <InformationDetail>이용안내</InformationDetail>
        </LazyLink>
        <LazyLink href={PATH.AGREEMENT}>
          <InformationDetail>이용약관</InformationDetail>
        </LazyLink>
        <LazyLink href={PATH.PRIVACY}>
          <InformationDetail>개인정보처리방침</InformationDetail>
        </LazyLink>
      </ReturnInformationWrapper>
      <ReturnInformationWrapper>
        <CompanyTitle>C/S CENTER</CompanyTitle>
        <InformationDetail>MON-FRI AM 10:00 ~ PM 06:00</InformationDetail>
        <InformationDetail>SAT, SUN, HOLIDAY OFF</InformationDetail>
      </ReturnInformationWrapper>
    </Container>
  );
}

export default DefaultHeader;
