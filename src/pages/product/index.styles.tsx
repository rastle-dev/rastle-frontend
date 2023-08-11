import styled from "styled-components";
import COLORS from "@/constants/color";
import Button from "@/components/common/Button";
import media from "@/styles/media";

export const Wrapper = styled.div`
  padding-top: 9rem; /* header때문에 추가 */
  width: 88%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //border: 1px solid red;

  ${media.mobile} {
    width: 92%;
  }
`;

export const TopLayer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;

  ${media.mobile} {
    flex-direction: column;
  }
`;

export const ImageLayer = styled.div`
  width: 50%;
  height: auto;
  padding-right: 3.72rem;
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

export const Title = styled.div`
  font-size: 2.27rem;
  font-weight: 200;
  padding-bottom: 0.82rem;
`;

export const Price = styled.div`
  font-size: 2.27273rem;
  font-weight: 500;
  padding-bottom: 2.27rem;
`;

export const ColorText = styled.div`
  font-size: 1.45455rem;
  padding-bottom: 0.64rem;
`;

export const ColorList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.19rem;
  padding-bottom: 2.55rem;
`;

export const SizeText = styled.div`
  font-size: 1.45455rem;
  padding-bottom: 0.64rem;
`;
export const SizeButtonList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.19rem;
  padding-bottom: 2.55rem;
`;

export const SizeButton = styled(Button)`
  font-size: 1.18182rem;
  font-weight: 200;
  width: 7.90909rem;
  height: 2.54545rem;
  border: 0.5px solid ${COLORS.GREY.상세페이지};

  /* 버튼이 클릭된 상태일 때의 스타일 */
  ${({ isActive }) =>
    isActive &&
    `
    border: 1px solid ${COLORS.BLACK}; /* 클릭된 상태의 border 스타일 */
  `}
`;

export const ProductCountText = styled.div`
  font-size: 1.45rem;
  font-weight: 200;
  padding-bottom: 1.18rem;
  border-bottom: 1px solid ${COLORS.BLACK};
`;

export const ProductCountInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.BLACK};
  padding-bottom: 1rem;
  padding-top: 1rem;
`;
export const ProductCountLeftInfo = styled.div``;
export const ProductCountTitle = styled.div`
  color: ${COLORS.GREY.상세페이지};
  font-size: 1.45rem;
  font-weight: 200;
  padding-bottom: 0.64rem;
`;
export const ProductCountColor = styled.span`
  font-size: 1.45455rem;
  font-weight: 300;
`;
export const ProudctCountSize = styled.span`
  font-size: 1.45455rem;
  font-weight: 300;
`;
export const ProductCountRightInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ProductCountButton = styled.input`
  width: 4.18rem;
  height: 2rem;
  margin-right: 0.5rem;

  /* 기본적으로 화살표 버튼 보이도록 설정 */
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Safari and Chrome */

  /* 화살표 버튼 스타일링 */

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1; /* 항상 표시되도록 설정 */
  }

\` ;
`;
export const ProductCountDelete = styled.div``;
export const TotalPrice = styled.div`
  font-size: 1.45rem;
  font-weight: 200;
  padding-bottom: 1.73rem;
  padding-top: 3.36rem;
`;
export const Pay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.73rem;
`;

export const StyledPayButton = styled(Button)`
  font-size: 1.45rem;
  font-weight: 200;
  flex-grow: 1;
  width: 14rem;
  height: 4.8rem;
  color: ${COLORS.GREY.상세페이지};
`;

export const ProductDetailList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  gap: 3rem;
`;

export const ProductDetail = styled.img`
  width: 100%;
`;
