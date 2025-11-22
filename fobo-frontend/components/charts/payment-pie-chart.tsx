"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { pieChartData } from "@/lib/dummy/analytics-data";

export function PaymentPieChart({ range }) {
  const data = pieChartData[range];

  const COLORS = [
    "url(#upiG)",
    "url(#cardG)",
    "url(#walletG)",
    "url(#nbG)",
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        {/* Premium Gradients */}
        <defs>
          <linearGradient id="upiG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4F8CF7" />
            <stop offset="100%" stopColor="#1C5DE7" />
          </linearGradient>

          <linearGradient id="cardG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C4DFF" />
            <stop offset="100%" stopColor="#5B2EFF" />
          </linearGradient>

          <linearGradient id="walletG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="nbG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        <Pie
          data={data}
          dataKey="value"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={4}
          stroke="#fff"
          strokeWidth={2}
          labelLine={true}
          label={({ name, value }) => `${name} (${value}%)`}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>

        {/* Solid Tooltip */}
        <Tooltip
          wrapperStyle={{ outline: "none" }}
          contentStyle={{
            background: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
