import styled from "styled-components";
import Image from "next/image";
import Button from "@/components/common/Button";
import COLORS from "@/constants/color";

export const StyledHome = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

/** TopLayer 컴포넌트 스타일링*/
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
  font-size: 1.5rem;
  font-weight: 200;
`;

export const TextInstagram = styled.span`
  font-size: 1.375rem;
  font-weight: 600;
  padding: 0.5rem 0rem 0rem 0rem;
`;

export const StyledButton = styled(Button)`
  margin-top: 3.25rem;
  font-size: 1.5rem;
  font-weight: 200;
  background-color: rgba(0, 0, 0, 0.15);
  height: 3.125rem;
  color: white;
  border-radius: 3px;
  border: none;
`;

/** ShopLayer 컴포넌트 스타일링 */
export const ProductWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //padding: 0rem 4.3rem 0 4.3rem;
  padding: 0rem 4.3rem 0 4.3rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const ProductTitle = styled.div`
  font-size: 2.5rem;
  padding: 9.63rem 0 7.75rem 0;
  font-weight: 200;

  span {
    color: ${COLORS.RED};
    font-weight: 700;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2%;
  padding-bottom: 6rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1%;
    width: 100%;
  }
`;
export const ViewMore = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;

  span {
    font-size: 1.875rem;
    font-weight: 200;
    cursor: pointer;

    &:hover {
      font-weight: 500;
    }
  }
`;
export const StyledBorderLine = styled.div`
  margin-top: 2rem;
  border: 0.3px solid ${COLORS.GREY["300"]};
  width: 100%;
`;
