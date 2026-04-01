import type { Order } from "../types/order.types";

const STOCKS = [
  { symbol: "RELIANCE-EQ", name: "RELIANCE INDUSTRIES LTD", token: "2885" },
  { symbol: "TCS-EQ", name: "TATA CONSULTANCY SERV", token: "11536" },
  { symbol: "HDFCBANK-EQ", name: "HDFC BANK LTD", token: "1333" },
  { symbol: "INFY-EQ", name: "INFOSYS LTD", token: "1594" },
  { symbol: "ICICIBANK-EQ", name: "ICICI BANK LTD", token: "4963" },
  { symbol: "HINDUNILVR-EQ", name: "HINDUSTAN UNILEVER LTD", token: "1394" },
  { symbol: "ITC-EQ", name: "ITC LTD", token: "1660" },
  { symbol: "SBIN-EQ", name: "STATE BANK OF INDIA", token: "3045" },
  { symbol: "BHARTIARTL-EQ", name: "BHARTI AIRTEL LIMITED", token: "10604" },
  { symbol: "LTIM-EQ", name: "LTIMINDTREE LIMITED", token: "17818" },
  { symbol: "KOTAKBANK-EQ", name: "KOTAK MAHINDRA BANK LTD", token: "1922" },
  { symbol: "LT-EQ", name: "LARSEN & TOUBRO LTD", token: "11483" },
  { symbol: "AXISBANK-EQ", name: "AXIS BANK LIMITED", token: "5900" },
  { symbol: "ASIANPAINT-EQ", name: "ASIAN PAINTS LIMITED", token: "236" },
  { symbol: "MARUTI-EQ", name: "MARUTI SUZUKI INDIA LTD", token: "10999" },
  { symbol: "SUNPHARMA-EQ", name: "SUN PHARMACEUTICAL IND L", token: "3351" },
  { symbol: "TITAN-EQ", name: "TITAN COMPANY LIMITED", token: "3506" },
  { symbol: "BAJFINANCE-EQ", name: "BAJAJ FINANCE LIMITED", token: "317" },
  { symbol: "WIPRO-EQ", name: "WIPRO LTD", token: "3787" },
  { symbol: "ULTRACEMCO-EQ", name: "ULTRATECH CEMENT LIMITED", token: "11532" },
];

export const generateMockOrders = (count: number): Order[] => {
  return Array.from({ length: count }).map((_, index) => {
    const stock = STOCKS[Math.floor(Math.random() * STOCKS.length)];
    const isBuy = Math.random() > 0.5;
    const qty = Math.floor(Math.random() * 500) + 1;
    const price = parseFloat((Math.random() * 2500 + 100).toFixed(2));

    const baseTime = new Date();
    const orderTime = new Date(
      baseTime.getTime() - index * (Math.floor(Math.random() * 8) + 2) * 60000,
    );

    const datePart = orderTime.toLocaleDateString("en-GB");

    const timePart = orderTime.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const timestamp = `${datePart} ${timePart}`;

    return {
      scripId: `NSE_${stock.token}`,
      transactionType: isBuy ? "Buy" : "Sell",
      exchangeSegment: "nse_cm",
      exchange: ["NSE", "BSE", "CDS", "MCX", "NCDEX", "NFO", "BFO"][
        Math.floor(Math.random() * 7)
      ],
      tradingSymbol: stock.symbol,
      nestOrderNumber: 260401000000000 + index,
      gtcGtdTriggerId: "",
      sipSequenceNumber: "",
      sipIndicator: "",
      gtcGtdIndicator: "AMO",
      advOrderIndicator: "AMO",
      price: price,
      triggerPrice: 0,
      totalQuantity: qty,
      scripName: stock.name,
      orderStatus: "after market order req received",
      bffOrderStatus: ["AmoReqRecd", "Open", "Complete", "Rejected"][
        Math.floor(Math.random() * 4)
      ],
      rejectionReason: "",
      scripToken: stock.token,
      filledQuantity: 0,
      pendingQuantity: qty,
      productCode: ["NRML", "CNC", "MIS"][Math.floor(Math.random() * 3)],
      averagePrice: 0,
      decimalPrecision: 2,
      exchangeOrderNumber: 0,
      orderedTime: timestamp,
      orderPriceType: "Limit",
      orderAuthStatus: "after market order req received",
      warningText: "",
      childOrders: [],
      lotSize: 1,
      remarks: "",
      afterMarketOrderFlag: true,
      segmentIndicator: "EQUITY",
      isModifiableOrCancellable: true,
      companyName: stock.name,
      assetCode: "",
    };
  });
};
