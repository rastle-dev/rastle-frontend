export interface PRODUCT {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  event: boolean;
  mainThumbnail: string;
  subThumbnail: string;
  displayOrder: number;
  visible: boolean;
  soldOut: boolean;
  bundleId: string;
  categoryId: string;
  mainImage: {
    imageUrls: string[];
  };
}
