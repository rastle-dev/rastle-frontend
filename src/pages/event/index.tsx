import React, { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import COLORS from "@/constants/color";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";
import useProduct from "@/hooks/useProduct";
import PATH from "@/constants/path";
import toastMsg from "@/components/Toast";
import IconButton from "@/components/Common/IconButton";
import useScroll from "@/hooks/useScroll";
import Modal from "@/components/Common/Modal";
import EnterEventModal from "@/components/Event/EnterEventModal";
import Dialog from "@/components/Common/Dialog";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import CountDownTimer from "@/components/Event/CountDownTimer";
import dayjs from "dayjs";
import useEventHistory from "@/hooks/mypage/orderList/useEventHistory";

export default function Event() {
  const router = useRouter();
  const [isEventModalOpen, setIsEventModalOpen] =
    useRecoilState(eventModalState);
  const [isEventDialogOpen, setIsEventDialogOpen] =
    useRecoilState(eventDialogState);

  const { scrollToTop, scrollToBottom, showScrollButton, handleScroll } =
    useScroll();
  const { detailData } = useProduct();
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const { eventHistoryData } = useEventHistory();
  return (
    <S.Wrapper>
      {isEventModalOpen && (
        <Modal
          closeModal={() => {
            setIsEventModalOpen(false);
            // openDialog();
          }}
        >
          <EnterEventModal eventProductId={detailData?.data.id} />
        </Modal>
      )}
      {isEventDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            // localStorage.clear();
            setIsEventDialogOpen(false);
            // router.push(PATH.LOGIN);
          }}
          visible
          title="응모가 완료되었어요! 🥳"
          refuse="응모내역 확인하기"
          confirm="쇼핑 계속하기"
          size={43}
        />
      )}
      <S.TopLayer>
        <S.ImageLayer>
          <ImageSliderPage
            images={detailData?.data.mainImage.imageUrls}
            alt={detailData?.data.name}
          />
        </S.ImageLayer>
        <S.ProductContent>
          <S.Title>{detailData?.data.name}</S.Title>
          <S.DiscountPrice>
            <h4>{detailData?.data.price.toLocaleString()}원</h4>
            <span>10% </span>
            {detailData?.data.discountPrice.toLocaleString()}원
          </S.DiscountPrice>
          <S.Script>
            <h3>
              지금까지 총 {detailData?.data.eventApplyCount}명 참여했어요!
            </h3>
            <h4>* 주의사항</h4>
            <div>
              응모하기전, 마이페이지에 등록된 전화번호를 확인해주세요!
              해당번호로 당첨 메시지가 전송될 예정이에요.
            </div>
            <p>
              (소셜로그인시, 마이페이지에서 전화번호를 새로 등록할 수 있어요!)
            </p>
          </S.Script>
          {localStorage.getItem("accessToken") ? (
            <S.StyledEventButton
              onClick={() => {
                setIsEventModalOpen(true);
              }}
              title={
                eventHistoryData?.data.content.filter(
                  (v: any) => v.id === detailData?.data.id,
                ).length !== 0
                  ? "응모하기"
                  : "이미 응모하신 상품이에요."
              }
              type="shop"
              disabled={
                dayjs().isBefore(detailData?.data.eventStartDate) ||
                dayjs().isAfter(detailData?.data.eventEndDate) ||
                eventHistoryData?.data.content.filter(
                  (v: any) => v.id === detailData?.data.id,
                ).length
              }
            />
          ) : (
            <S.StyledEventButton
              onClick={() => {
                toastMsg("로그인페이지로 이동합니다.");
                router.push(PATH.LOGIN);
              }}
              title="응모하기"
              type="shop"
              disabled={
                dayjs().isBefore(detailData?.data.eventStartDate) ||
                dayjs().isAfter(detailData?.data.eventEndDate) ||
                eventHistoryData?.data.content.filter(
                  (v: any) => v.id === detailData?.data.id,
                ).length
              }
            />
          )}
          <CountDownTimer
            endDate={detailData?.data.eventEndDate}
            startDate={detailData?.data.eventStartDate}
          />
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        {detailData?.data.detailImage.imageUrls?.map((img: string) => (
          <S.ProductDetail
            src={img}
            alt={detailData?.data.name}
            layout="responsive"
            width={100}
            height={100}
          />
        ))}
      </S.ProductDetailList>
      <S.ScrollWrapper className={showScrollButton ? "show" : ""}>
        <IconButton
          onClick={scrollToTop}
          iconName="arrowUp"
          color={COLORS.블랙}
        />
        <IconButton
          onClick={scrollToBottom}
          iconName="arrowDown"
          color={COLORS.블랙}
        />
      </S.ScrollWrapper>
    </S.Wrapper>
  );
}
