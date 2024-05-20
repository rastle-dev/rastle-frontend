import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/Common/Button";
import media from "@/styles/media";
import Image from "next/image";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  ${media.mobile} {
    width: 92%;
  }
`;

export const TopLayer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 85%;

  ${media.mobile} {
    width: 100%;
    flex-direction: column;
  }
`;

export const ImageLayer = styled.div`
  width: 50%;
  height: auto;
  padding-right: 5.3rem;
  //padding-left: 5.3rem;
  border-right: 1px solid ${COLORS.GREY["300"]};

  ${media.mobile} {
    padding-right: 0;
    width: 100%;
    height: auto;
    padding-bottom: 3.72rem;
    border: none;
  }
`;

export const ProductContent = styled.div`
  width: 50%;
  padding-left: 3.78rem;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    width: 100%;
    padding: 0;
  }
`;

export const Title = styled.h1`
  font-size: 2.18rem;
  font-weight: 400;
  padding-bottom: 1.8rem;
  margin-top: 0;
  ${media.mobile} {
    padding-bottom: 1.5rem;
  }
`;

export const Price = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  padding-bottom: 0.5rem;

  ${media.mobile} {
    border-bottom: 0.5px ${COLORS.GREY.상세페이지} solid;
    width: 100%;
    padding: 0;
    margin-bottom: 2rem;
  }

  h4 {
    padding: 0;
    margin-top: 0;
  }
`;

export const DiscountPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  padding-bottom: 2.82rem;

  h4 {
    padding: 0;
    margin-top: 0;
    margin-bottom: 0.91rem;
    color: ${COLORS.GREY.상세페이지};
    text-decoration: line-through;
    font-size: 1.6rem;
  }

  span {
    color: ${COLORS.레드};
    font-size: 1.8rem;
    margin-right: 0.5rem;
  }

  ${media.mobile} {
    border-bottom: 0.5px ${COLORS.GREY.상세페이지} solid;
    width: 100%;
    padding: 0;
    padding-bottom: 1.91rem;
    margin-bottom: 1.45rem;
  }
`;

export const TextDetail = styled.div`
  margin-bottom: 1rem;
  div {
    font-size: 1.2rem;
    padding: 0.3rem;
    font-weight: 400;
  }
`;

export const ColorText = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 0.64rem;
`;

export const ColorList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.36rem;
  padding-bottom: 2.55rem;
`;

export const SizeText = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 1.18rem;
`;
export const SizeButtonList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.91rem;
  padding-bottom: 2.27rem;
`;

export const SizeButton = styled(Button)<{ isActive?: boolean }>`
  width: 8rem;
  height: 2.5rem;

  font-size: 1.18182rem;
  font-weight: 400;
  border: 0.5px solid ${COLORS.GREY.상세페이지};
  /* isActive가 true일 때의 스타일 */
  ${({ isActive }) =>
    isActive &&
    `
    border: 1.5px solid ${COLORS.블랙}; /* 클릭된 상태의 border 스타일 */
  `}

  ${media.mobile} {
    width: 8rem;
    height: 4rem;
    font-size: 1.5rem;
  }
`;

export const ProductCountText = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 1.18rem;
  border-bottom: 1px solid ${COLORS.블랙};
`;

export const ProductCountInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.블랙};
  padding-bottom: 0.82rem;
  padding-top: 0.82rem;
`;
export const ProductCountLeftInfo = styled.div``;
export const ProductCountTitle = styled.div`
  color: ${COLORS.GREY.상세페이지};
  font-size: 1.18rem;
  font-weight: 400;
  padding-bottom: 0.18rem;
`;
export const ProductCountColor = styled.span`
  font-size: 1.18rem;
  font-weight: 300;
`;
export const ProudctCountSize = styled.span`
  font-size: 1.18rem;
  font-weight: 300;
`;
export const ProductCountRightInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ProductCountButton = styled.input.attrs({
  type: "number",
})`
  width: 4.18rem;
  height: auto;

  /* 기본적으로 화살표 버튼 보이도록 설정 */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Safari and Chrome */

  /* 화살표 버튼 스타일링 */

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none; /* 시도해보세요 */
  }
  
  
  

\` ;
`;

export const NumberInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  margin-right: 1rem;
`;

export const CountUpButton = styled.img`
  border: none;
  background: none;
  cursor: pointer;
`;

export const CountDownButton = styled.img`
  border: none;
  background: none;
  cursor: pointer;
`;

export const Count = styled.span`
  font-size: 1.5rem;
  margin: 0 0.5rem;
`;

export const ProductCountDelete = styled.div``;
export const TotalPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  padding-bottom: 1.73rem;
  padding-top: 2rem;
`;
export const Pay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.18rem;
`;

export const StyledPayButton = styled(Button)`
  font-size: 1.35rem;
  font-weight: 400;
  flex-grow: 1;
  width: 22rem;
  height: 4.8rem;
  color: ${COLORS.블랙};
  border: 0.5px solid #000;
  border-radius: 0.45455rem;

  ${media.mobile} {
    flex-grow: 1;
    width: 40%;
  }
`;
export const StyledBuyButton = styled(Button)`
  font-size: 1.35rem;
  font-weight: 400;
  flex-grow: 1;
  width: 22rem;
  height: 4.8rem;
  color: ${COLORS.화이트};
  background-color: ${COLORS.블랙};
  border-radius: 0.45455rem;

  ${media.mobile} {
    flex-grow: 1;
    width: 40%;
  }
`;

export const ProductDetailList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 3rem;
  width: 60%;
  ${media.mobile} {
    width: 100%;
  }
`;

export const ProductDetail = styled(Image)`
  width: 100%;
`;

export const ScrollWrapper = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &.show {
    display: flex;
    flex-direction: column;
  }
`;

export const Script = styled.div`
  h3 {
    font-size: 1.6rem;
    font-weight: 500;
    margin-top: 0;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0 0 1rem 0;
  }
  div {
    font-size: 1.5rem;
    font-weight: 400;
  }
  p {
    font-size: 1.25rem;
    font-weight: 300;
  }
`;

export const TimerProductPage = styled.div`
  margin-top: 1rem;
  font-size: 1.35rem;
  font-weight: 400;
  height: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
  color: ${COLORS.WHITE};
  background-color: ${COLORS.BLACK};
  border-radius: 0.45455rem;
  ${media.mobile} {
    width: 100%;
  }
`;
export const StyledEventButton = styled(Button)`
  font-size: 1.35rem;
  font-weight: 400;
  height: 4.6rem;
  border-radius: 0.45455rem;
  ${media.mobile} {
    width: 100%;
  }
`;
