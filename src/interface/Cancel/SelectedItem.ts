export interface SelectedItem {
  color: string | undefined;
  count: number;
  prevCount: number;
  name: string;
  price: number;
  productId: number;
  productOrderNumber: number;
  size: string;
  thumbnailUrl: string;
  totalPrice: number;
  status: string;
  cancelAmount?: number | undefined;
  cancelRequestAmount?: number | undefined;
}
