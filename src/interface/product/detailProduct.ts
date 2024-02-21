export interface ProductDetailData {
  bundleId?: number;
  categoryId?: number;
  detailImage: {
    imageUrls: string[];
  };
  discountPrice: number;
  displayOrder: number;
  eventApplyCount: number;
  eventId: number;
  id: number;
  mainImage: {
    imageUrls: string[];
  };
  mainThumbnailImage: string;
  name: string;
  price: number;
  productColor: {
    productColors: Color[];
  };
  subThumbnailImage: "string";
  visible: boolean;
}
export type Color = {
  color: string;
  sizes: Size[];
};
export type Size = {
  count: number;
  size: string;
};
export interface SelectedProduct {
  title?: string;
  price: number;
  color?: string | null;
  size?: string | null;
  count: number;
  key?: string;
  mainThumbnailImage: string;
  productId: number | undefined;
}
export interface CartProduct {
  productId: number | undefined;
  color?: string | null;
  count: number;
  size?: string | null;
}
