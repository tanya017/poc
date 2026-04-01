export interface FilterCriterion {
  name: string;
  type: "string" | "array" | "number" | "boolean";
  values: string[] | number[] | boolean[];
}

export interface SortCriterion {
  name: string;
  values: "asc" | "desc";
}

export interface OrderListPayload {
  filterOn: FilterCriterion[];
  sortOn: SortCriterion[];
}

// orders type
export interface Order {
  scripId?: string;
  transactionType?: "Buy" | "Sell";
  exchangeSegment?: string;
  exchange?: string;
  tradingSymbol?: string;
  nestOrderNumber?: number;
  gtcGtdTriggerId?: string;
  sipSequenceNumber?: string;
  sipIndicator?: string;
  gtcGtdIndicator?: string;
  advOrderIndicator?: string;
  price?: number;
  triggerPrice?: number;
  totalQuantity?: number;
  scripName?: string;
  orderStatus?: "rejected" | "completed" | "pending" | string;
  bffOrderStatus?: string;
  rejectionReason?: string;
  scripToken?: string;
  filledQuantity?: number;
  pendingQuantity?: number;
  productCode?: string;
  averagePrice?: number;
  decimalPrecision?: number;
  exchangeOrderNumber?: number;
  orderedTime?: string;
  orderPriceType?: "Limit" | "Market" | string;
  orderAuthStatus?: string;
  warningText?: string;
  childOrders?: any[];
  lotSize?: number;
  remarks?: string;
  afterMarketOrderFlag?: boolean;
  retentionType?: string;
  segmentIndicator?: string;
  companyName?: string;
  assetCode?: string;
}

// api response type
export interface OrderListResponse {
  orders: Order[];
  totalOrderCount: number;
}
