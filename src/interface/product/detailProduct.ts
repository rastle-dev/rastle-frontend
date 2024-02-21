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
