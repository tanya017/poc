export type OrderSide = "Buy" | "Sell";

export type DropdownOption = string;

export interface DropdownConfig {
  label: string;
  key: string;
  options: DropdownOption[];
  default: string;
}

export interface ExchangeConfig {
  nse: number;
  bse: number;
}

export interface QuantityConfig {
  step: number;
  default: number;
  min: number;
}

export interface PriceConfig {
  default: number;
}

export interface MarginConfig {
  required: number;
  available: number;
  currency: string;
}

export interface OrderModalConfig {
  title: string;
  exchange: ExchangeConfig;
  quantity: QuantityConfig;
  price: PriceConfig;
  dropdowns: DropdownConfig[];
  margins: MarginConfig;
}