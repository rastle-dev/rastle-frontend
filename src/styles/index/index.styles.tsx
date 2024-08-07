import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/Common/Button";
import COLORS from "@/constants/color";
import media from "@/styles/media";

export const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/** TopLayer 컴포넌트 스타일링 */
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; /* 변경된 부분 */
`;

export const DesktopImage = styled(Image)`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileImage = styled(Image)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 50rem;
    object-fit: cover;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

export const Text2 = styled.span`
  padding-top: 0.5rem;
  font-size: 2rem;
  font-weight: 400;
  padding-bottom: 1rem;
`;

export const Text3 = styled.span`
  padding-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 500;

  a {
    color: #02c75a;
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const TextInstagram = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
  padding: 0.5rem 0 0 0;
`;

export const StyledButton = styled(Button)`
  margin-top: 3.25rem;
  font-size: 1.5rem;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.15);
  height: 3.125rem;
  color: white;
  border-radius: 3px;
  border: none;
  &:focus {
    border: none;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &:hover {
    border: none;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

/** ShopLayer 컴포넌트 스타일링 */
export const ProductWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductTitle = styled.div`
  font-size: 2.5rem;
  padding: 9.63rem 0 5.75rem 0;
  font-weight: 400;

  span {
    color: ${COLORS.레드};
    font-weight: 700;
  }

  h4 {
    font-size: 1.4rem;
  }
`;

export const Link = styled.a`
  color: dodgerblue;
  padding: 2rem;
  font-size: 1.5rem;
`;
export const BestProductTitle = styled.div`
  font-size: 2.5rem;
  padding: 9.63rem 0 0.75rem 0;
  font-weight: 400;

  span {
    color: ${COLORS.레드};
    font-weight: 700;
  }
`;
export const ProductDesc = styled.div`
  font-size: 1.2rem;
  padding: 0 0 6.75rem 0;
  font-weight: 300;

  span {
    color: ${COLORS.레드};
    font-weight: 700;
  }
`;
export const ItemContainer = styled.div`
  display: grid;
  //flex-direction: row;
  width: 88%;
  grid-template-columns: repeat(4, 1fr);
  ${media.small} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }

  ${media.xsmall} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }

  padding-bottom: 4.8rem;
  column-gap: 1%;
  row-gap: 8rem;
`;
export const BestItemContainer = styled.div`
  display: grid;
  width: 98%;
  grid-template-columns: repeat(5, 1fr);
  ${media.small} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }

  ${media.xsmall} {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 2.5rem;
    width: 95%;
  }

  padding-bottom: 4.8rem;
  column-gap: 1%;
  row-gap: 8rem;
`;
export const ViewMore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 88%;

  span {
    font-size: 1.875rem;
    font-weight: 400;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }
`;
// export const StyledBorderLine = styled.div`
//   margin-top: 2rem;
//   border: 0.3px solid ${COLORS.GREY["300"]};
//   width: 100%;
// `;
