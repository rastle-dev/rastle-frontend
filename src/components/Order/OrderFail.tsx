import React, { useEffect, useState } from "react";
import * as S from "@/styles/orderconfirm/index.styles";
import PATH from "@/constants/path";
import { useRouter } from "next/router";
import styled from "styled-components";
import COLORS from "@/constants/color";

const Info = styled.div`
  font-size: 2rem;
  font-weight: 400;
`;
const ErrorMsg = styled.div`
  padding: 2rem 2rem 2rem 2rem;
  font-size: 1.5rem;
  font-weight: 300;
  background-color: ${COLORS.GREY[100]};
  margin-top: 3rem;
  border-radius: 3px;
`;

export default function OrderFail() {
  const router = useRouter();
  const [message, setMessage] = useState<string>();
  const [orderId, setOrderId] = useState<string>();
  useEffect(() => {
    const extractErrorMsg = () => {
      const currentUrl = window.location.href;
      const urlParams = new URLSearchParams(new URL(currentUrl).search);
      const errorMsg = urlParams.get("errorMsg");
      const merchantUid = urlParams.get("merchantUid");
      if (errorMsg && merchantUid) {
        const decodedErrorMsg = decodeURIComponent(errorMsg);
        const decodedOrderId = decodeURIComponent(merchantUid);

        const regex = /\(message: ([^,]+), code:/;
        const match = decodedErrorMsg.match(regex);

        if (match) {
          const extractedMessage = match[1];
          setMessage(extractedMessage);
          setOrderId(decodedOrderId);
        }
      }
    };

    extractErrorMsg();
  }, []);
  return (
    <S.Container>
      <S.Header>
        <h1>주문 실패 ☹️</h1>
      </S.Header>
      <S.InfoWrapper>
        <Info>결제 승인 과정에서 문제가 발생하였습니다.</Info>
        <ErrorMsg>
          {message}, 주문번호: {orderId}
        </ErrorMsg>
        <S.ButtonDiv>
          <S.StyledBuyButton
            title="메인화면으로 돌아가기"
            type="shop"
            onClick={() => {
              router.push(PATH.HOME);
            }}
          />
        </S.ButtonDiv>
      </S.InfoWrapper>
    </S.Container>
  );
}
