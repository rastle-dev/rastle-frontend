export default function calculateDiscountPercentAndPrice(
  normalPrice: number,
  discountPrice: number,
) {
  // 할인 퍼센트 계산 (소수점 없이 반올림)
  const discountPercent = Math.round(
    ((normalPrice - discountPrice) / normalPrice) * 100,
  );

  // 할인된 가격 계산
  const discountedPrice = normalPrice - discountPrice;

  return {
    discountPercent,
    discountedPrice,
  };
}
