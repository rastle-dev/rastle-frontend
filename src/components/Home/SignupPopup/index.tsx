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
        <S.Intro>직접 개발한 자사몰에 와주셔서 감사합니다.</S.Intro>
        <S.IntroMargin />
        <S.Intro>개발자가 꿈이었던 저의 마지막 개발 프로젝트입니다.</S.Intro>
        <S.Intro>진로를 패션쪽으로 전향하기 전에</S.Intro>
        <S.Intro>공부했던 개발지식을 남김없이 발휘하고,</S.Intro>
        <S.IntroMargin />
        <S.Intro>인플루언서로 활동하며 브랜드에서 제공받은 제품들을</S.Intro>
        <S.Intro>나눠드리기 위해 본 프로젝트를 기획했습니다.</S.Intro>
        <S.IntroMargin />
        <S.Intro>
          해당 홈페이지는 단 4일간(7/1~7/4) 이벤트성으로 운영됩니다.
        </S.Intro>
        <S.Intro>
          이 기간동안 하루마다 5개, 총 20개의 의류를 응모를 통해 나눠드리고,{" "}
        </S.Intro>
        <S.Intro>매일 11시에 인스타 스토리로 당첨자가 공지됩니다. </S.Intro>
        <S.IntroMargin />
        <S.Intro>추가적으로,</S.Intro>
        <S.Intro>해당 홈페이지에 업로드된 RECORDY SLOW의 인기 상품들은</S.Intro>
        <S.Intro>무료배송쿠폰과 5% 할인이 제공됩니다.</S.Intro>
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
