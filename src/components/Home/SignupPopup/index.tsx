import React, { useRef, useEffect } from "react";
import COLORS from "@/constants/color";
import IconButton from "@/components/Common/IconButton";
import * as S from "@/components/Home/SignupPopup/index.styles";
import CouponImage from "../../../../public/image/coupon.png";
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

  const messages = [
    ["직접 개발한 자사몰에 와주셔서 감사합니다."],
    ["개발자가 꿈이었던 저의 마지막 개발 프로젝트입니다."],
    ["진로를 패션쪽으로 전향하기 전에"],
    ["공부했던 개발지식을 남김없이 발휘하고,"],
    ["브랜드에서 제공받은 제품들을 "],
    ["나눠드리기 위해 본 프로젝트를 기획했습니다."],
    ["본 홈페이지는 단 일주일간만 운영이 됩니다."],
    ["해당 기간동안 20벌의 옷을 여러분들에게 나눠드리고,"],
    ["200명 한정 10%할인 + 배송비 무료쿠폰을 제공합니다."],
  ];

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
        {messages.map((message) => (
          <div>
            {message.map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </div>
        ))}
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
