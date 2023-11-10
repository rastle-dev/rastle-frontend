import React from "react";
import styled from "styled-components";
import media from "@/styles/media";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5.5rem;
  padding-top: 2rem;
  p {
    font-size: 1rem;
  }
`;

export const ItemContainer = styled.div`
  //flex-direction: row;
  width: 88%;
  ${media.small} {
    width: 95%;
  }

  ${media.xsmall} {
    width: 95%;
  }

  padding-bottom: 4.8rem;

  section {
    font-size: 1rem;
    font-weight: 400;
  }

  h3 {
    font-size: 1.5rem;
  }
`;

export const GuideContainer = styled.div`
  p {
    margin: 0;
    padding: 0;
    padding-bottom: 3px;
    font-size: 1rem;
    font-weight: 400;
  }
`;

export default function Guide() {
  return (
    <Container>
      <ItemContainer>
        <GuideContainer>
          <h3>회원가입 안내</h3>
          <p>
            [회원가입] 메뉴를 통해 이용약관, 개인정보보호정책 동의 및 일정
            양식의 가입항목을 기입함으로써 회원에 가입되며, 가입 즉시 서비스를
            무료로 이용하실 수 있습니다. 회원가입 시 2,000원의 적립금이
            지급됩니다.
          </p>
        </GuideContainer>

        <GuideContainer>
          <h3>주문 안내</h3>
          <p> - Step1: 상품검색</p>
          <p> - Step2: 장바구니에 담기</p>
          <p> - Step3: 회원ID 로그인 또는 비회원 주문</p>
          <p> - Step4: 주문서 작성</p>
          <p>- Step5: 결제방법선택 및 결제</p>
          <p>- Step6: 주문 성공 화면 (주문번호)</p>
          <br />
          <p>
            비회원 주문인경우 6단계에서 주문번호와 승인번호(카드결제시)를 꼭
            메모해 두시기 바랍니다.(이는 작성하신 메일로 전송이 됩니다.) 단,
            회원인 경우 자동 저장되므로 따로 관리하실 필요가 없습니다.
          </p>
        </GuideContainer>

        <GuideContainer>
          <h3>결제 안내</h3>
          <p>
            고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도
            있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등
            정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할
            수 있습니다.
          </p>
          <p>
            무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은
            가까운 은행에서 직접 입금하시면 됩니다.
          </p>
          <p>
            주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며,
            1일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
          </p>
        </GuideContainer>

        <GuideContainer>
          <h3>배송안내</h3>
          <p>배송 방법 : 택배</p>
          <p>배송 지역 : 전국지역</p>
          <p>
            배송 비용 : 조건부 무료 : 주문 금액 KRW 80,000 미만일 때 배송비 KRW
            3,000을 추가합니다.
          </p>
          <p>배송 기간 : 3일 ~ 7일</p>
          <p>배송 안내 :</p>
          <p>
            - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가
            있습니다.
          </p>
          <p>
            고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만,
            상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
          </p>
        </GuideContainer>

        <GuideContainer>
          <h3>교환/반품안내</h3>
          <p>
            상품 수령 후 3일이내에 홈페이지 Q&A 게시판이나 카카오톡 채널
            "recordy slow" 를 통해 교환 및 반품 접수가 완료되어야 합니다. (반품
            접수 없이 자사로 배송된 상품은 통보 없이 반송됩니다.)
          </p>
          <p>- 상품 수령 후 7일 이내에 자사로 반품 상품이 도착하여야 합니다.</p>
          <p>
            - 자사 귀책 사유로 발생하는 모든 교환/반품 건에 대한 배송비는
            자사에서 부담합니다.
          </p>
          <p>
            ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
            고객님께서 부담하셔야 합니다.
          </p>
          <p>(색상 교환, 사이즈 교환 등 포함)</p>
          <p>
            ※ 제작 과정에서 생길 수 있는 초크 자국, 제거 가능한 실밥, 오차
            범위를 벗어나지 않는 실측차이, 새 상품 특유의 냄새, 먼지 등의 미세한
            부분들은 불량으로 간주하지 않습니다.
          </p>
          <p>교환 및 반품이 불가능한 경우</p>
          <p>
            - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단,
            상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외
          </p>
          <p>
            - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한
            경우
          </p>
          <p>
            - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히
            감소한 경우
          </p>
          <p>- 복제가 가능한 상품등의 포장을 훼손한 경우</p>
        </GuideContainer>

        <GuideContainer>
          <h3>배송안내</h3>
          <p>택배사는 cj 택배를 이용하고 있습니다.</p>
          <br />
          <p>배송비는 기본 3,000원, 제주도 및 도서산간 6,000원 입니다.</p>
          <br />
          <p>
            {" "}
            배송비용은 청구되지 않습니다. 총결제 금액이 100,000원 이상일 경우
          </p>
          <p>배송준비 기간은 평균 3~7일(주말, 공휴일 제외) 이내이며</p>
          <p>거래처 사정에 따라 최대 2주정도 배송지연이 될 수 있습니다.</p>
          <p>재고가 없거나 조기 품절 시 개별적인 연락을 드리고 있습니다.</p>
          <p>다품목 주문시 합배송을 원칙으로 개별상품의 지연기간이</p>
          <p>5일 이상일 경우 부분 발송합니다.</p>
          <br />
          <p>카카오 문의 운영시간 11:00 AM ~ 06:00 PM</p>
        </GuideContainer>
      </ItemContainer>
    </Container>
  );
}
