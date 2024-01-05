import React from "react";
import styled from "styled-components";
import Image from "next/image";
import COLORS from "@/constants/color";
import IconButton from "@/components/Common/IconButton";
import * as S from "@/components/Home/SignupPopup/index.styles";
interface SignupPopupProps {
  onClose: () => void;
}

function Index({ onClose }: SignupPopupProps): React.ReactNode {
  return (
    <S.ModalBackground>
      <S.PopupContainer>
        <S.DeleteIconWrapper>
          <IconButton
            iconSize="2rem"
            border={1.3}
            iconName="deleteSmall"
            color={COLORS.BLACK}
            onClick={onClose}
          />
        </S.DeleteIconWrapper>
        <S.LOGOBOX>
          <S.LOGOWrapper>
            <S.LOGOImage
              src="/image/LOGO_WHITE.png"
              alt="/image/LOGO_WHITE.png"
              layout="fill"
              objectFit="cover"
            />
          </S.LOGOWrapper>
          <h2>R E C O D Y S L O W</h2>
        </S.LOGOBOX>
        <S.CouponWrapper>
          <S.CouponImage
            src="/image/coupon.png"
            alt="/image/coupon.png"
            layout="fill"
            objectFit="cover"
          />
        </S.CouponWrapper>
        {/* 팝업 내용 및 회원가입 폼 */}
        <p>회원가입 시 3,000원 할인 쿠폰을 드려요.</p>
        {/* 여기에 회원가입 폼 및 버튼 등을 추가하세요 */}
        <S.CloseButton onClick={onClose}>x 일주일동안 보지 않기</S.CloseButton>
      </S.PopupContainer>
    </S.ModalBackground>
  );
}

export default Index;
