"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Charts({ data1, data2 }) {
  return (
    <div className=" flex justify-center items-center flex-wrap ">
      <div className="bg-white  rounded-2xl shadow-md md:w-[400px] w-[380px] md:mr-6 mt-1.5 ">
        <h2 className="text-lg font-semibold mb-3 text-center">📊 نمودار ستونی</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data1}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* --- Line Chart --- */}
      <div className="bg-white  rounded-2xl shadow-md md:w-[400px] w-[380px] md:mr-5 mt-1.5">
        <h2 className="text-lg font-semibold mb-3 text-center ">📈 نمودار خطی</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
