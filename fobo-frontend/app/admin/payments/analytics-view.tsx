"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PaymentLineChart } from "@/components/charts/payment-line-chart";
import { PaymentPieChart } from "@/components/charts/payment-pie-chart";

export default function AnalyticsView() {
  const [range, setRange] = useState("week"); 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Revenue */}
      <Card
        className="
          p-6 
          rounded-2xl 
          bg-white/30 
          backdrop-blur-xl 
          border border-white/40 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
          transition-all
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)]
        "
      >
        {/* Header + Filters */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-900">
            Revenue Overview
          </h3>

          {/* Glass segmented filter */}
          <div className="
            flex items-center gap-1
            bg-white/30 backdrop-blur-xl
            border border-white/40
            rounded-xl p-1
          ">
            {["week", "month", "year"].map((item) => (
              <button
                key={item}
                onClick={() => setRange(item)}
                className={`
                  px-3 py-1.5 text-sm capitalize rounded-lg transition 
                  ${range === item 
                    ? "bg-primary/80 text-white" 
                    : "text-gray-700 hover:bg-white/40"}
                `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div
          className="
            rounded-xl p-3
            bg-white/20 backdrop-blur-md 
            border border-white/30
          "
        >
          <PaymentLineChart range={range} />
        </div>
      </Card>

      {/* Payment Modes */}
      <Card
        className="
          p-6 
          rounded-2xl 
          bg-white/30 
          backdrop-blur-xl 
          border border-white/40 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          transition-all
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)]
        "
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-900">
            Payment Modes Breakdown
          </h3>
        </div>

        <div
          className="
            rounded-xl p-3
            bg-white/20 backdrop-blur-md 
            border border-white/30
          "
        >
          <PaymentPieChart range={range} />
        </div>
      </Card>
    </div>
  );
}
