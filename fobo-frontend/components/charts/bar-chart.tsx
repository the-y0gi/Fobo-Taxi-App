"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

const data = [
  { day: "Mon", revenue: 1800, refunds: 120 },
  { day: "Tue", revenue: 2200, refunds: 80 },
  { day: "Wed", revenue: 1950, refunds: 110 },
  { day: "Thu", revenue: 2500, refunds: 150 },
  { day: "Fri", revenue: 2700, refunds: 200 },
];

export function RevenueBarChart() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="day" 
          tick={{ fill: '#64748B', fontSize: 12 }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <YAxis 
          tick={{ fill: '#64748B', fontSize: 12 }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          formatter={(value) => [`$${value}`, '']}
        />
        <Legend 
          wrapperStyle={{ 
            paddingTop: '10px',
            fontSize: '12px'
          }}
        />
        <Bar 
          dataKey="revenue" 
          fill="#059669" 
          name="Revenue"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="refunds" 
          fill="#EF4444" 
          name="Refunds"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}


// //api integrate code...

// "use client";

// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

// export function RevenueBarChart({ data = [] }) {
//   return (
//     <ResponsiveContainer width="100%" height={270}>
//       <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//         <XAxis 
//           dataKey="day" 
//           tick={{ fill: '#64748B', fontSize: 12 }}
//           axisLine={{ stroke: '#E2E8F0' }}
//         />
//         <YAxis 
//           tick={{ fill: '#64748B', fontSize: 12 }}
//           axisLine={{ stroke: '#E2E8F0' }}
//         />
//         <Tooltip 
//           contentStyle={{ 
//             backgroundColor: 'white', 
//             border: '1px solid #E2E8F0',
//             borderRadius: '8px',
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//           }}
//           formatter={(value) => [`₹${value}`, '']}
//         />
//         <Legend 
//           wrapperStyle={{ 
//             paddingTop: '10px',
//             fontSize: '12px'
//           }}
//         />
//         <Bar 
//           dataKey="revenue" 
//           fill="#059669" 
//           name="Revenue"
//           radius={[4, 4, 0, 0]}
//         />
//         <Bar 
//           dataKey="refunds" 
//           fill="#EF4444" 
//           name="Refunds"
//           radius={[4, 4, 0, 0]}
//         />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }