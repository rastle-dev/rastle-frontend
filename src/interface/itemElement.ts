// shop에서 각 제품의 뷰(썸네일 사진, 가격, 할인된 가격 등)를 나타냅니다.
export default interface ItemElementProps {
  bundleId?: number;
  categoryId?: number;
  discountPrice?: number;
  displayOrder?: 100;
  id?: number;
  productId?: number;
  productName: string;
  mainThumbnail: string;
  subThumbnail?: string;
  name: string;
  price: number;
  isEvent?: boolean;
  eventId?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
}
