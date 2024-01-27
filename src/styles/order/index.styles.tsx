import styled from "styled-components";
import COLORS from "@/constants/color";
import Input from "@/components/Common/Input";
import Button from "@/components/Common/Button";
import media from "@/styles/media";

interface ClickBoxProps {
  isChecked: boolean;
}
export const Temp = styled.div`
  margin-top: 5.5rem;
  padding-top: 2rem;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  ${media.xsmall} {
    width: 100%;
  }
  margin-bottom: 15rem;
`;

export const Header = styled.div`
  width: 79%;
  background-color: ${COLORS.WHITE};
  ${media.small} {
    width: 92%;
  }
  ${media.xsmall} {
    width: 92%;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 200;
    padding: 4rem 0 4.27rem 0;
    margin: 0;
  }
`;
export const InfoWrapper = styled.div`
  width: 81%;
  ${media.small} {
    width: 92%;
  }
  ${media.xsmall} {
    width: 92%;
  }
  background-color: ${COLORS.WHITE};
  h2 {
    font-size: 1.666rem;
    margin: 0;
    padding-bottom: 1.65rem;
  }
`;
export const Product = styled.div`
  display: flex;
  gap: 3.27rem;
  padding-bottom: 2.65rem;
`;
export const Thumbnail = styled.img`
  width: 7.7rem;
  height: auto;
  aspect-ratio: 0.77;
  border-radius: 0.45455rem;
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1.2rem;
  width: 100%;
`;
export const ProductName = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
`;
export const NumPrice = styled.div`
  font-size: 1.333rem;
  font-weight: 200;
`;
export const SizeColor = styled.div`
  font-size: 1.333rem;
  font-weight: 400;
`;

export const OrdererInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding-bottom: 2.65rem;
`;
export const Box = styled.div`
  display: flex;
  gap: 6rem;
`;
export const Meta = styled.div`
  color: ${COLORS.GREY[400]};
  font-weight: 200;
  font-size: 1.1rem;
  width: 3.6rem;

  //width: 7rem;
  ${media.small} {
    width: 5rem;
  }
  ${media.xsmall} {
    width: 5rem;
  }
`;
export const Data = styled.div`
  font-weight: 400;
  font-size: 1.1rem;
`;
export const AddressSettingBox = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    padding-top: 0.03rem;
    font-size: 1.16rem;
  }
  gap: 1.27rem;
`;
export const AddressButton = styled.div`
  display: flex;
  gap: 0.82rem;
  cursor: pointer;
`;
export const StyledCheckbox = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 2px solid ${COLORS.GREY[300]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ClickBox = styled.div<ClickBoxProps>`
  width: 0.8rem;
  height: 0.8rem;
  background-color: ${(props) => (props.isChecked ? "black" : "white")};
  border-radius: 50%;
`;
export const DeliveryBox = styled.div`
  padding-top: 3rem;
  font-size: 1.333rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DeliveryInput = styled(Input)`
  font-size: 1.333rem;
  width: 100%;
`;
export const Postal = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;
export const PostalButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
export const PostalButton = styled(Button)`
  padding: 1rem 3rem 1rem 3rem;
  border-radius: 10px;
  font-size: 1rem;
  width: 11rem;
  ${media.small} {
    width: 10.5rem;
  }
  ${media.xsmall} {
    width: 10.5em;
  }
`;

export const SettingDefaultAddress = styled.div`
  display: flex;
  padding-top: 3rem;
  align-items: center;
  cursor: pointer;
  p {
    margin: 0;
    padding: 0;
    font-size: 1rem;
    font-weight: 200;
  }
  input {
    width: 1rem;
    margin: 0 0.5rem 0 0;
    cursor: pointer;
  }
`;

export const OrderCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.2rem 0 8.4rem 0;
  width: 100%;
  h3 {
    margin: 0;
    font-size: 1.4rem;
  }
  input {
    width: 100%;
  }
  p {
    margin: 0;
    padding-top: 0.8rem;
    font-size: 1rem;
    font-weight: 400;
    color: ${COLORS.GREY[400]};
  }
`;

export const PaymentInfoWrapper = styled.div`
  border-top: 2px solid;
  border-bottom: 2px solid;
  padding-top: 2.5rem;
  padding-bottom: 9.5rem;
  margin-bottom: 2.5rem;
`;

export const CouponTittleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CouponTittleInner1 = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding-bottom: 1rem;
`;

export const CouponTittleInner2 = styled.div`
  font-size: 1rem;
  font-weight: 300;
`;

export const CouponToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 6rem;
  width: 100%;
  align-items: center; /* 추가 */
  padding: 1rem;
  border-radius: 0.45455rem;
  border: 1px solid #000;
  cursor: pointer;
  margin-bottom: 2rem;
`;

export const CouponToggleInner1 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 추가 */
`;

export const CouponToggleText = styled.div`
  padding-left: 1rem;
  align-self: center; /* 추가 */
  font-size: 1.4rem;
`;

export const CouponListWrapper = styled.div`
  display: flex;
`;

export const PaymentInfoBox = styled.div`
  border-top: 1px solid;
  border-bottom: 1px solid;
  padding: 1.79rem 0 1.79rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  div {
    display: flex;
    justify-content: space-between;
  }
`;
export const PriceCategory = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;
export const Price = styled.div`
  font-size: 1rem;
  font-weight: 200;
`;
export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2.6rem;
`;
export const TotalInfo = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;
export const TotalPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${COLORS.BLUE};
`;

export const PaymentOptions = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;
  p {
    margin: 0;
    padding-top: 0.03rem;
    font-size: 1.16rem;
  }
  gap: 1.27rem;
  padding-bottom: 11rem;
`;
export const PaymentOptionsButton = styled.div`
  display: flex;
  gap: 0.82rem;
  cursor: pointer;
`;
export const PaymentOptionsCheckbox = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 2px solid ${COLORS.GREY[300]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PaymentOptionsClickBox = styled.div<ClickBoxProps>`
  width: 0.8rem;
  height: 0.8rem;
  background-color: ${(props) => (props.isChecked ? "black" : "white")};
  border-radius: 50%;
`;
export const PaymentButton = styled(Button)`
  background-color: ${COLORS.BLACK};
  color: ${COLORS.WHITE};
  border-radius: 5px;
  width: 100%;
  margin-bottom: 16rem;
`;

export const Wrap = styled.div<{ isLoading?: boolean }>`
  height: ${({ isLoading }) => (isLoading ? "auto" : "auto")};
`;
export const TabMenu = styled.div``;
export const Table = styled.div`
  width: 100%;
  border: none;
  margin-bottom: 1rem;
`;
export const TableHeader = styled.div`
  display: none;
  p {
    margin: 1rem 0 1rem 0;
    font-weight: 500;
  }
`;
export const TableContent = styled.div``;
export const NODATA = styled.div`
  margin-top: 3rem;
  font-weight: 400;
  color: ${COLORS.GREY[500]};
  font-size: 1.5rem;
  height: 30rem;
`;
export const ProductInfo = styled.div`
  p {
    margin: 0;

    font-weight: 200;
  }
`;
export const TextInfo = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 9rem;
`;
export const MobileTextInfo = styled.div`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.45455rem;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
  display: flex;
  width: 100%;
  padding: 0rem 1em 1rem 1rem;
  flex-direction: row;
  justify-content: space-between;
  p {
    font-weight: 400;
    font-size: 1rem;
    padding-bottom: 0.2rem;
    display: none;
  }
  p:nth-child(2):before {
    display: none;
  }
  p:nth-child(3):before {
    display: none;
  }
  p:nth-child(4):before {
    display: none;
  }
`;
export const MobileDescription = styled.div`
  display: none;
`;

export const CouponText = styled.h4`
  margin: 0;
`;
export const CouponImgWrapper = styled.div`
  width: 9.3rem;
  height: 6rem;
  position: relative;
  margin-left: 1rem;
`;
export const CouponImage = styled.image`
  width: 100%;
`;

export const CouponWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* 추가 */
`;

export const CouponTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5rem;
`;

export const CouponSubText = styled.div`
  margin-top: 0.4rem;

  font-size: 1.2rem;
  font-weight: 300;
`;
