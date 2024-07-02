import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import COLORS from "@/constants/color";
import ImageSliderPage from "@/components/Swiper/ImageSliderPage";
import * as S from "@/styles/product/index.styles";
import useProduct from "@/hooks/useProduct";
import PATH from "@/constants/path";
import IconButton from "@/components/Common/IconButton";
import useScroll from "@/hooks/useScroll";
import Modal from "@/components/Common/Modal";
import EnterEventModal from "@/components/Event/EnterEventModal";
import Dialog from "@/components/Common/Dialog";
import { useRecoilState } from "recoil";
import { eventDialogState, eventModalState } from "@/stores/atom/recoilState";
import CountDownTimer from "@/components/Event/CountDownTimer";
import dayjs from "dayjs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import QUERYKEYS from "@/constants/querykey";
import { loadEventHistory } from "@/api/cart";
import calculateDiscountPercentAndPrice from "@/utils/calculateDiscountedPrice";
import LoadingBar from "@/components/LoadingBar";

export default function Event() {
  const router = useRouter();
  const [isEventModalOpen, setIsEventModalOpen] =
    useRecoilState(eventModalState);
  const [isEventDialogOpen, setIsEventDialogOpen] =
    useRecoilState(eventDialogState);

  const { scrollToTop, scrollToBottom, showScrollButton, handleScroll } =
    useScroll();
  const { detailData, isLoading } = useProduct();
  const [token, setToken] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("accessToken")) {
        setToken(true);
      }
    }
  }, []);

  const { discountPercent } = calculateDiscountPercentAndPrice(
    detailData?.data.price,
    detailData?.data.discountPrice,
  );
  const { data: eventHistoryData, refetch } = useQuery(
    [QUERYKEYS.LOAD_EVENT_HISTORY],
    () => loadEventHistory({ page: 0, size: 24 }),
  );

  useEffect(() => {
    if (token) {
      refetch(); // Manually fetch event history data if user is logged in
    }
  }, [token, refetch]);

  if (isLoading) return <LoadingBar type={6} />;

  return (
    <S.Wrapper>
      {isLoginModalVisible && (
        <Dialog
          title="로그인 후에 이용 가능한 기능이에요!"
          confirm="쇼핑 계속하기"
          refuse="로그인 하기"
          size={44}
          onClickRefuseButton={() => {
            setLoginModalVisible(false); // 모달 창 닫기
            const returnUrl = `${router.pathname}?${router.asPath.split("?")[1]}`;
            localStorage.setItem("returnUrl", returnUrl);
            router.push({ pathname: PATH.LOGIN });
          }}
          onClickConfirmButton={() => {
            setLoginModalVisible(false); // 모달 창 닫기
          }}
          visible
        />
      )}
      {isEventModalOpen && (
        <Modal
          closeModal={() => {
            setIsEventModalOpen(false);
          }}
        >
          <EnterEventModal
            eventProductId={detailData?.data.id}
            productName={detailData?.data.name}
          />
        </Modal>
      )}
      {isEventDialogOpen && (
        <Dialog
          onClickRefuseButton={() => {
            const queryClient = new QueryClient();
            queryClient.invalidateQueries([QUERYKEYS.LOAD_EVENT_HISTORY]);
            router.push({
              pathname: PATH.MYPAGE,
              query: { tab: "주문 내역" },
            });
          }}
          onClickConfirmButton={() => {
            setIsEventDialogOpen(false);
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
            <span>{discountPercent}% </span>
            {detailData?.data.discountPrice.toLocaleString()}원
            <div>
              {" "}
              <S.Link>
                <a
                  href={`${detailData?.data.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton
                    iconName="link"
                    color={COLORS.블루}
                    iconSize="1.5rem"
                  />
                  무신사에서 확인하기
                </a>
              </S.Link>
            </div>
          </S.DiscountPrice>
          <S.Script>
            <h3>
              지금까지 총 {detailData?.data.eventApplyCount}명 참여했어요!
            </h3>
            <h4>* 주의사항</h4>
            <div>사이즈가 잘 맞으실지 확인후에 응모 해주세요!</div>
            <div>응모횟수에는 제한이 없지만 중복당첨은 불가능합니다.</div>
            <p>
              (당첨결과는 다음날 오후 11시 인스타 스토리를 통해 공지드려요 !)
            </p>
          </S.Script>
          {token ? (
            <S.StyledEventButton
              onClick={() => {
                setIsEventModalOpen(true);
              }}
              title={
                eventHistoryData?.data.content.filter(
                  (v: any) => v.eventProductId === detailData?.data.id,
                ).length === 0
                  ? "응모하기"
                  : "이미 응모하신 상품이에요."
              }
              type="shop"
              disabled={
                dayjs().isBefore(detailData?.data.eventStartDate) ||
                dayjs().isAfter(detailData?.data.eventEndDate) ||
                eventHistoryData?.data.content.filter(
                  (v: any) => v.eventProductId === detailData?.data.id,
                ).length === 1
              }
            />
          ) : (
            <S.StyledEventButton
              onClick={() => {
                setLoginModalVisible(true);
              }}
              title="응모하기"
              type="shop"
              disabled={
                dayjs().isBefore(detailData?.data.eventStartDate) ||
                dayjs().isAfter(detailData?.data.eventEndDate)
              }
            />
          )}
          <S.TimerProductPage>
            <CountDownTimer
              endDate={detailData?.data.eventEndDate}
              startDate={detailData?.data.eventStartDate}
            />
          </S.TimerProductPage>
        </S.ProductContent>
      </S.TopLayer>
      <S.ProductDetailList>
        {detailData?.data.detailImage.imageUrls?.map((img: string) => (
          <S.ProductDetail
            key={img}
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
