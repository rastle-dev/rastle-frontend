import React from "react";
import * as S from "@/styles/mypage/orderList/index.styles";
import Pagination from "react-js-pagination";
import useEventHistory from "@/hooks/mypage/orderList/useEventHistory";

export default function EventHistory() {
  const {
    eventMenuList,
    eventCurPage,
    eventHistoryData,
    onChangeEventPage,
    eventLoading,
    EVENT_ITEM_SIZE,
  } = useEventHistory();

  return (
    <S.Wrap>
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
                      <div>{item.startDate.split("T")[0]}</div>
                      <S.OrderDetail>응모상세조회 {">"}</S.OrderDetail>
                    </S.OrderDateNum>
                    <S.Box>
                      <S.ProductBox>
                        <S.UpperBox>
                          <S.Img src={item.imageUrls} />
                          <S.MobileTextInfo>
                            <S.TextInfo>
                              <h4>{item.name}</h4>
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
