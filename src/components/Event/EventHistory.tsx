import React, { useState } from "react";
import * as S from "@/styles/mypage/orderList/index.styles";
import Pagination from "react-js-pagination";
import useEventHistory from "@/hooks/mypage/orderList/useEventHistory";

import Modal from "@/components/Common/Modal";
import EnterUpdateEventModal from "@/components/Event/EnterUpdateEventModal";
import { useRecoilState } from "recoil";
import { eventModalState } from "@/stores/atom/recoilState";

export default function EventHistory() {
  const {
    eventMenuList,
    eventCurPage,
    eventHistoryData,
    onChangeEventPage,
    EVENT_ITEM_SIZE,
  } = useEventHistory();

  interface EventData {
    eventProductId?: number;
    eventProductName?: string;
    eventPhoneNumber?: number;
    instagramId?: string;
  }
  const [isEventModalOpen, setIsEventModalOpen] =
    useRecoilState(eventModalState);
  const [eventData, setEventData] = useState<EventData>();

  const openEventDetailModal = (item: EventData) => {
    setEventData(item);
    setIsEventModalOpen(true);
  };

  console.log(eventHistoryData);

  return (
    <S.Wrap>
      {isEventModalOpen && (
        <Modal
          closeModal={() => {
            setIsEventModalOpen(false);
            // openDialog();
          }}
          width={60}
        >
          <EnterUpdateEventModal
            eventProductId={eventData?.eventProductId}
            productName={eventData?.eventProductName}
            eventPhoneNumber={eventData?.eventPhoneNumber}
            eventInstagramId={eventData?.instagramId}
          />
        </Modal>
      )}

      <h2>응모내역</h2>
      {eventHistoryData?.data.content.length === 0 ? (
        <S.NODATA>아직 응모하신 상품이 없어요! 😋</S.NODATA>
      ) : (
        <S.CartBox>
          <S.Table>
            <S.TableHeader>
              {eventMenuList.map((menu) => (
                <p>{menu}</p>
              ))}
            </S.TableHeader>
            <S.TableContent>
              {eventHistoryData?.data.content.map((item: any) => {
                return (
                  <S.ProductInfo>
                    <S.OrderDateNum>
                      <div>{item.eventApplyDate.split("T")[0]}</div>
                      <S.OrderDetail
                        onClick={() => {
                          openEventDetailModal(item);
                        }}
                      >
                        <div>응모상세조회</div>
                        <span>{">"}</span>
                      </S.OrderDetail>
                      <S.OrderNum
                        onClick={() => {
                          openEventDetailModal(item);
                        }}
                      >
                        [응모상세조회]
                      </S.OrderNum>
                    </S.OrderDateNum>
                    <S.Box>
                      <S.ProductBox>
                        <S.UpperBox>
                          <S.Img src={item.eventProductMainThumbnailImage} />
                          <S.MobileTextInfo>
                            <S.TextInfo>
                              <h4>{item.eventProductName}</h4>
                              <h4>L/인디고</h4>
                            </S.TextInfo>
                            <S.Count>1개</S.Count>
                            <S.Price>
                              <S.DiscountedPrice>0원</S.DiscountedPrice>
                            </S.Price>
                          </S.MobileTextInfo>
                        </S.UpperBox>
                        <S.EventBottomBox>
                          <S.DeskTopDeliveryStatus>
                            <div>응모완료</div>
                          </S.DeskTopDeliveryStatus>
                        </S.EventBottomBox>
                      </S.ProductBox>
                    </S.Box>
                  </S.ProductInfo>
                );
              })}
            </S.TableContent>
          </S.Table>
        </S.CartBox>
      )}
      {eventHistoryData?.data.content.length !== 0 && (
        <S.PagingWrapper>
          <Pagination
            activePage={eventCurPage}
            itemsCountPerPage={EVENT_ITEM_SIZE}
            totalItemsCount={eventHistoryData?.data.totalElements || 1}
            pageRangeDisplayed={2}
            onChange={onChangeEventPage}
            prevPageText="<"
            nextPageText=">"
          />
        </S.PagingWrapper>
      )}
    </S.Wrap>
  );
}
