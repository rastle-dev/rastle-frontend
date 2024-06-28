interface ProductReturnRequest {
  productOrderNumber: number;
  returnAmount: number;
}
export interface ReturnInfo {
  orderNumber: number;
  productReturnRequests: ProductReturnRequest[];
  reason: string;
}
