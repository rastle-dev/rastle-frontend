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
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

export const ItemContainer = styled.div`
  //flex-direction: row;
  line-height: 1.5; /* 각 줄 사이의 간격을 넓게 설정 */
  width: 88%;
  ${media.small} {
    width: 95%;
  }

  ${media.xsmall} {
    width: 95%;
  }

  padding-bottom: 4.8rem;

  h3 {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1em; /* 각 문단 사이의 간격 조정을 위해 추가 */
  font-size: 1.5rem;
`;
const Link = styled.a`
  color: blue;
`;
export default function Community() {
  return (
    <Container>
      <ItemContainer>
        <h3>Yo, Hey, Dude</h3>
        <Paragraph>
          안녕하세요. 레슬입니다.
          <br />
          직접 개발한 자사몰에 와주셔서 감사합니다.
          <br />
          개발자가 꿈이었던 저의 마지막 개발 프로젝트입니다.
          <br />
          진로를 패션쪽으로 전향하기 전에
          <br />
          공부했던 개발지식을 남김없이 발휘하고,
          <br />
          인플루언서로 활동하며 브랜드에서 제공받은 제품들을
          <br />
          나눠드리기 위해 본 프로젝트를 기획했습니다.
        </Paragraph>

        <Paragraph>
          이벤트를 진행하는 상품들은 전부 사진만 촬영하고
          <br />
          여러분들에게 드리기 위해 잘 보관하고 있었던 새 제품들입니다!!
          <br />
          브랜드에서 제공받은 제품들을 나눠드리는 거라 사이즈가 하나밖에 없기
          때문에
          <br />
          본인 사이즈에 맞는지 확인하시고 제품을 응모하시면 너무 좋을 것
          같습니다 ㅎㅎ
          <br />
          낭만 넘치는 레슬답게 이벤트의 모든 상품들은 제가 이쁘게 포장하고
          배송비까지 직접 부담하여
          <br />
          기분 좋게 받고 입으실 수 있도록 도와드리겠습니다 😄
          <br />
          (당근하면 너무 슬플 것 같긴 해요 😭 받으면 제 생각하면서 이쁘게 본인이
          입어주기!)
        </Paragraph>

        <Paragraph>
          레코디 슬로우의 상품들 또한 배송비 무료 쿠폰과 5% 할인이 적용되며,
          <br />
          준비된 재고들이 소진되면 개별 상품마다 품절 처리가 됩니다.
          <br />
          홈페이지 유지 기간이 짧은 만큼 입고 지연이 없는 재고들로 준비했으나,
          <br />
          준비한 재고들이 선착순으로 빠르게 종료될 수도 있다는 점 양해 말씀
          드립니다 ㅠㅠ
        </Paragraph>

        <Paragraph>
          배송은 이벤트 상품과 주문하신 상품들 모두 7/5(금)에 전부 발송됩니다.
          <br />
          모든 문의 사항은 아래 카카오톡 채널로 문의 주시면 답변 드리겠습니다.
          <br />→{" "}
          <Link href="https://pf.kakao.com/_jIZxlG">
            https://pf.kakao.com/_jIZxlG
          </Link>
        </Paragraph>

        <Paragraph>
          긴 시간 준비했던 개발자의 꿈이 이번 프로젝트로 마무리가 되겠네요.
          <br />
          이용하시는 분들이 불편함 없이 홈페이지를 이용하고 별 탈 없이
          프로젝트가 잘 마무리 되었으면 좋겠습니다.
          <br />
          많은 분들에게 제 긍정적인 영향이 닿길 바라며 항상 감사합니다 !
        </Paragraph>

        <Paragraph>
          프론트엔드 개발자
          <br />
          - 홍의성(레슬)
          <br />- 함민혁
        </Paragraph>

        <Paragraph>
          백엔드 개발자
          <br />
          - 김동준
          <br />- 임윤수
        </Paragraph>
      </ItemContainer>
    </Container>
  );
}
