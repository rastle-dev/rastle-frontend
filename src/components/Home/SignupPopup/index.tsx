import React, { useEffect, useState } from "react";
import COLORS from "@/constants/color";
import IconButton from "@/components/Common/IconButton";
import * as S from "@/components/Home/SignupPopup/index.styles";

interface SignupPopupProps {
  onClose: () => void;
}

function SignupPopup({ onClose }: SignupPopupProps): React.ReactNode {
  const handleClose = () => {
    localStorage.setItem("popup", "true");
    onClose();
  };

  const handleWeekClose = () => {
    // '일주일 동안 보지 않기' 로직 추가
    localStorage.setItem(
      "hideSignupPopupUntil",
      String(Date.now() + 24 * 60 * 60 * 1000),
    );
    onClose();
  };
  return (
    <S.ModalBackground>
      <S.PopupContainer>
        <S.DeleteIconWrapper>
          <IconButton
            iconSize="2rem"
            border={1.3}
            iconName="deleteSmall"
            color={COLORS.BLACK}
            onClick={handleClose}
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
        <p>회원가입 시 3,000원 할인 쿠폰을 드려요.</p>
        <S.CloseButton onClick={handleWeekClose}>
          x 하루 동안 보지 않기
        </S.CloseButton>
      </S.PopupContainer>
    </S.ModalBackground>
  );
}

export default SignupPopup;
