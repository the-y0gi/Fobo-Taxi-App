"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { hour: "6 AM", rides: 0 },
  { hour: "8 AM", rides: 12 },
  { hour: "10 AM", rides: 18 },
  { hour: "12 PM", rides: 22 },
  { hour: "2 PM", rides: 16 },
  { hour: "4 PM", rides: 26 },
  { hour: "6 PM", rides: 30 },
];

export function RidesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="hour"
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
        />
        <Line
          type="monotone"
          dataKey="rides"
          stroke="#059669"
          strokeWidth={3}
          dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: '#047857' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}


// //api integrate code

// "use client";

// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// export function RidesLineChart({ data = [] }) {
//   return (
//     <ResponsiveContainer width="100%" height={270}>
//       <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//         <XAxis
//           dataKey="hour"
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
//         />
//         <Line
//           type="monotone"
//           dataKey="rides"
//           stroke="#059669"
//           strokeWidth={3}
//           dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
//           activeDot={{ r: 6, fill: '#047857' }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

