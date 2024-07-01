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
  color: dodgerblue;
  font-size: 1.3rem;
`;

export const CommunityText = styled.div`
  font-weight: 400;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 400;
    padding-bottom: 0.4rem;
    font-size: 1.5rem;
  }
`;

export const CommunityTextIntro = styled.div`
  font-weight: 400;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 400;
    padding-bottom: 0.4rem;
    font-size: 1.6rem;
  }
`;

export const CommunityTextOthers = styled.div`
  font-weight: 400;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 400;
    padding-bottom: 0.2rem;
    font-size: 1.5rem;
  }
`;

export const CommunityTextInformation = styled.div`
  font-weight: 400;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 400;
    padding-bottom: 0.5rem;
    font-size: 1.4rem;
  }
`;
export const CommunityTextInformationBold = styled.span`
  font-weight: 500;
  padding-bottom: 0.2rem;
  font-size: 1.2rem;
  ${media.mobile} {
    font-weight: 500;
    padding-bottom: 0.5rem;
    font-size: 1.4rem;
  }
  color: red;
`;

export const CommunityMargin = styled.div`
  margin-bottom: 1.5rem;
`;

export const CommunityMarginSmall = styled.div`
  margin-bottom: 1rem;
`;

export const CommunityMarginLarge = styled.div`
  margin-bottom: 4rem;
`;

export const Title = styled.div`
  font-size: 1.8rem;
  margin-top: 4rem;
  margin-bottom: 2rem;
  font-weight: 400;
`;

export const AboutDiv = styled.div`
  background-color: #f1f4f6;
  padding: 1.3rem;
`;

export const Border = styled.div`
  border-bottom: 0.2px solid;
`;

export const CommunityTextLast = styled.div`
  font-size: 1.5rem;
`;

export const CommunityTextLastIntro = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

export default function Community() {
  return (
    <Container>
      <ItemContainer>
        <Title>안녕하세요 레슬입니다!</Title>
        <CommunityTextOthers>
          {" "}
          직접 개발한 자사몰에 와주셔서 감사합니다.
        </CommunityTextOthers>
        <CommunityMargin></CommunityMargin>
        <CommunityTextOthers>
          진로를 패션쪽으로 전향하기 전에
        </CommunityTextOthers>
        <CommunityTextOthers>
          공부했던 개발지식을 남김없이 발휘하고,
        </CommunityTextOthers>
        <CommunityMarginSmall></CommunityMarginSmall>
        <CommunityTextOthers>
          {" "}
          인플루언서로 활동하며 브랜드에서 제공받은 제품들을
        </CommunityTextOthers>
        <CommunityTextOthers>
          나눠드리기 위해 본 프로젝트를 기획했습니다.
        </CommunityTextOthers>
        <h4>‼️ 중요 ‼️</h4>
        <AboutDiv>
          <CommunityTextInformation>
            ✅ 이벤트 참여와 상품 주문은 7/4일 23:59분에 종료됩니다.
          </CommunityTextInformation>
          <CommunityTextInformationBold>
            ✅ 모든 이벤트 상품과 주문 상품은 7/5일부터 순차배송됩니다.
          </CommunityTextInformationBold>
          <CommunityTextInformation>
            🙋‍♂️ 최대한 빠른 배송 도와드릴게요 !
          </CommunityTextInformation>
          <CommunityTextInformation>
            {" "}
            해당 홈페이지는 2주 안에 종료될 이벤트성 자사몰입니다 !
          </CommunityTextInformation>
          <CommunityTextInformation>
            모든 문의는{" "}
            <Link href="https://pf.kakao.com/_jIZxlG">카카오톡 채널</Link> 로
            메세지를 보내주세요☺️
          </CommunityTextInformation>
        </AboutDiv>
        <CommunityMargin></CommunityMargin>
        <h4>‼️ 이벤트 공지</h4>
        <CommunityTextOthers>이벤트를 진행하는 상품들은</CommunityTextOthers>
        <CommunityTextOthers>
          {" "}
          브랜드에서 협찬으로 제공받았던 상품들로,
        </CommunityTextOthers>
        <CommunityTextOthers>
          전부 사진만 촬영하고 여러분들에게 드리기 위해
        </CommunityTextOthers>
        <CommunityTextOthers>
          잘 보관하고 있었던 새 제품들입니다!!
        </CommunityTextOthers>
        <CommunityMargin></CommunityMargin>
        <CommunityTextOthers>
          본인 사이즈에 맞는지 확인하시고
        </CommunityTextOthers>
        <CommunityTextOthers>
          {" "}
          제품을 응모하시면 좋을 것 같습니다.
        </CommunityTextOthers>
        <CommunityMargin></CommunityMargin>
        <CommunityTextOthers>
          모든 상품들은 제가 이쁘게 포장해서 배송비 직접 부담하여
        </CommunityTextOthers>
        <CommunityTextOthers>
          기분 좋게 받고 입으실 수 있도록 도와드리겠습니다 😄
        </CommunityTextOthers>
        <CommunityMargin></CommunityMargin>
        <AboutDiv>
          <CommunityTextInformation>
            ✅ 7/1일부터 7/4일까지 매일 6개 이상의 상품이 오픈돼요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 00시부터 23:59분까지 응모가 가능해요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 25개 제품 모두 응모가 가능하나, 중복 당첨은 되지 않아요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 이벤트 제품들의 추첨은 다음날 23시 인스타 스토리로 진행돼요.
          </CommunityTextInformation>
          <Link href="https://www.instagram.com/rastle__fashion/">
            @rastle__fashion
          </Link>
          <CommunityTextInformation>
            ✅ 24시간동안 연락이 닿질 않으면 다른 분에게 기회가 넘어가요 !
          </CommunityTextInformation>
        </AboutDiv>
        <h4>‼️ 상품 공지</h4>
        <AboutDiv>
          <CommunityTextInformation>
            ✅ 레코디 슬로우의 상품들은 배송비 무료 쿠폰과 5% 할인이 적용돼요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 준비된 재고들이 소진되면 개별 상품마다 품절 처리가 돼요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 배송은 7/5일에 시작되고, 최대한 빠르게 받으실 수 있게 노력할게요.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 혹시나 배송이 지연되면 개별 연락을 드릴게요 !
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 해당 홈페이지에선 스마트스토어와 다르게
          </CommunityTextInformation>
          <CommunityTextInformation>
            ‼️ 반품비 3000원, 교환비 6000원이 부가됩니다.
          </CommunityTextInformation>
          <CommunityTextInformation>
            ✅ 제품 수령 후 일주일 뒤엔 구매확정이 되고, 반품과 교환이 어려워요.
          </CommunityTextInformation>

          <CommunityTextInformation></CommunityTextInformation>
        </AboutDiv>
        <CommunityMargin />
        <CommunityMarginLarge />
        <CommunityTextOthers>
          긴 시간 준비했던 개발자의 꿈이
        </CommunityTextOthers>
        <CommunityTextOthers>
          이번 프로젝트로 마무리가 되겠네요.
        </CommunityTextOthers>
        <CommunityMarginSmall />
        <CommunityTextOthers>
          이용하시는 분들이 불편함 없이 홈페이지를 사용하고
        </CommunityTextOthers>
        <CommunityTextOthers>
          별 탈 없이 프로젝트가 잘 마무리 되었으면 좋겠습니다.
        </CommunityTextOthers>
        <CommunityMargin />
        <CommunityTextOthers>
          많은 분들에게 제 긍정적인 영향이 닿길 바라며
        </CommunityTextOthers>
        <CommunityTextOthers>
          항상 진심으로 언제나 감사드립니다 !
        </CommunityTextOthers>
        <CommunityMarginLarge />
        <CommunityMarginLarge />
        <Border />
        <CommunityMarginLarge />
        <CommunityMarginLarge />
        <CommunityTextLast>
          본 프로젝트는 3명의 학과 동기들과 함께한 프로젝트입니다.
        </CommunityTextLast>
        <CommunityMargin />
        <CommunityMargin />
        <CommunityTextLastIntro>프론트엔드 개발자</CommunityTextLastIntro>
        <AboutDiv>
          <CommunityTextInformation>
            홍의성(레슬){" "}
            <Link href="https://github.com/twoone17">
              https://github.com/twoone17
            </Link>
          </CommunityTextInformation>
          <CommunityTextInformation>
            함민혁{" "}
            <Link href="https://github.com/miin-hyukkk">
              https://github.com/miin-hyukkk
            </Link>
          </CommunityTextInformation>
        </AboutDiv>
        <CommunityMargin />
        <CommunityTextLastIntro>백엔드 개발자</CommunityTextLastIntro>
        <AboutDiv>
          <CommunityTextInformation>
            김동준{" "}
            <Link href="https://github.com/Kim-Dong-Jun99">
              https://github.com/Kim-Dong-Jun99
            </Link>
          </CommunityTextInformation>

          <CommunityTextInformation>
            임윤수{" "}
            <Link href="https://github.com/limyounsoo">
              https://github.com/limyounsoo
            </Link>
          </CommunityTextInformation>
        </AboutDiv>
      </ItemContainer>
    </Container>
  );
}
