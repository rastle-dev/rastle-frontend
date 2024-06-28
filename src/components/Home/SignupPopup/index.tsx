import React, { useRef, useEffect } from "react";
import COLORS from "@/constants/color";
import IconButton from "@/components/Common/IconButton";
import * as S from "@/components/Home/SignupPopup/index.styles";
import CouponImage from "../../../../public/image/COUPON.png";
import LOGO_WHITE from "../../../../public/image/LOGO_WHITE.png";

interface SignupPopupProps {
  onClose: () => void;
}

function SignupPopup({ onClose }: SignupPopupProps): React.ReactNode {
  const popupRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <S.PopupContainer ref={popupRef}>
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
            src={LOGO_WHITE}
            alt="로고"
            layout="fill"
            objectFit="cover"
          />
        </S.LOGOWrapper>
        <h2>R E C O D Y S L O W</h2>
      </S.LOGOBOX>
      <S.CouponWrapper>
        <S.CouponImage
          src={CouponImage}
          alt="쿠폰 이미지"
          layout="fill"
          objectFit="cover"
        />
      </S.CouponWrapper>
      {/* <p>회원가입 시 3,000원 할인 쿠폰을 드려요.</p> */}
      <S.CloseButton onClick={handleWeekClose}>
        x 하루 동안 보지 않기
      </S.CloseButton>
    </S.PopupContainer>
  );
}

export default SignupPopup;
