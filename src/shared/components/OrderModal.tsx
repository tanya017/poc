import { useRef, useState } from "react";
import { orderModalConfig as config } from "./modalConfig";
import { useOnClickOutside } from "../hooks/useOnClick";


type OrderSide = "Buy" | "Sell";

// export default function OrderModal({ onClose }: { onClose: () => void }) {
export default function OrderModal({ onClose }: { onClose: () => void }) {
  const [side, setSide] = useState<OrderSide>("Buy");

  const [qty, setQty] = useState<number>(config.quantity.default);
  const [price, setPrice] = useState<number>(config.price.default);

  const initialForm = Object.fromEntries(
    config.dropdowns.map((d) => [d.key, d.default]),
  );

  const [form, setForm] = useState<Record<string, string>>(initialForm);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onClose);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div ref={modalRef} className="w-[440px] bg-white rounded-sm shadow-xl border border-gray-200 overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#eaf2ff] px-4 py-3 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[16px] font-semibold text-gray-900">
                {config.title}
              </div>

              <div className="flex items-center gap-6 mt-2 text-[13px]">
                <div className="flex items-center gap-2">
                  <input type="radio" className="accent-blue-600"/>
                  <span className="text-gray-500">NSE:</span>
                  <span className="text-[#198055] font-medium">
                    {config.exchange.nse}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input type="radio" className="accent-blue-600"/>
                  <span className="text-gray-500">BSE:</span>
                  <span className="text-[#198055] font-medium">
                    {config.exchange.bse}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setSide("Buy")}
                className={`px-4 py-2 text-sm font-medium ${
                  side === "Buy"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Buy
              </button>

              <button
                onClick={() => setSide("Sell")}
                className={`px-4 py-2 text-sm font-medium ${
                  side === "Sell"
                    ? "bg-gray-100 text-gray-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Sell
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[12px] text-gray-500">Quantity</label>

              <div className="flex mt-1 bg-white border border-gray-300 rounded-sm overflow-hidden">
                <button
                  className="px-3 text-gray-500 hover:bg-gray-100 p-2"
                  onClick={() =>
                    setQty((q) =>
                      Math.max(config.quantity.min, q - config.quantity.step),
                    )
                  }
                >
                  -
                </button>

                <input
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full text-center text-[13px] outline-none"
                />

                <button
                  className="px-3 text-gray-500 hover:bg-gray-100"
                  onClick={() => setQty((q) => q + config.quantity.step)}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] text-gray-500">Price</label>

              <input
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full mt-1 bg-white border border-gray-300 rounded-sm p-2 text-[13px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {config.dropdowns.map((dd) => (
              <div key={dd.key}>
                <label className="text-[12px] text-gray-500">{dd.label}</label>

                <select
                  className="w-full mt-1 bg-white border border-gray-300 rounded-sm p-2 text-[13px]"
                  value={form[dd.key]}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [dd.key]: e.target.value,
                    }))
                  }
                >
                  {dd.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white">
          <div className="flex gap-10 text-sm">
            <div>
              <div className="text-gray-500">Required</div>
              <div className="text-gray-900">
                {config.margins.currency} {config.margins.required}
              </div>
            </div>

            <div>
              <div className="text-gray-500">Avai. Margin</div>
              <div className="text-gray-900">
                {config.margins.currency} {config.margins.available}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Cancel
            </button>

            <button
              className={`px-6 py-4 rounded-sm text-white text-sm font-medium ${
                // side === "Buy" ? "bg-green-600" : "bg-green-700"
                side === "Buy" ? "bg-[#198055]" : "bg-red-700"
              }`}
            >
              {side}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
