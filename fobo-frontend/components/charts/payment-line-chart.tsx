"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { lineChartData } from "@/lib/dummy/analytics-data"; 

export function PaymentLineChart({ range }) {
  const data = lineChartData[range]; 

  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        
        <XAxis
          dataKey="day"
          tick={{ fill: '#64748B', fontSize: 12 }}
          axisLine={{ stroke: '#E2E8F0' }}
          tickLine={false}
        />
        
        <YAxis
          tick={{ fill: '#64748B', fontSize: 12 }}
          axisLine={{ stroke: '#E2E8F0' }}
          tickLine={false}
        />
        
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            fontSize: '12px'
          }}
          formatter={(value) => [`₹${value}`, 'Revenue']}
        />
        
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#059669"
          strokeWidth={3}
          dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#047857' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}