export const orderModalConfig = {
  title: "RELIANCE",
  exchange: {
    nse: 1415.94,
    bse: 1413.63,
  },

  quantity: {
    step: 1,
    default: 501,
    min: 1,
  },

  price: {
    default: 50,
  },

  dropdowns: [
    {
      label: "Order type",
      key: "orderType",
      options: ["Market", "Limit", "SL"],
      default: "Market",
    },
    {
      label: "Product type",
      key: "productType",
      options: ["NRML", "CNC", "MIS"],
      default: "NRML",
    },
  ],

  margins: {
    required: 6430.5,
    available: 34.7,
    currency: "₹",
  },
};
