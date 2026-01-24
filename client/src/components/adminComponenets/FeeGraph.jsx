import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Line, LineChart, Tooltip, ResponsiveContainer, Cell,
  Legend} from "recharts";

function FeeGraph({data}) {
    const graphData=[
        {
            name:"Fees",
            paid:data.paid,
            pending:data.pending,
        },
    ]
  return (
    <div className="bg-white my-5 md:m-10 p-5 rounded-xl shadow">
      <h2 className="font-semibold ">Fee Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={graphData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="paid" fill="#22c55e" radius={[8, 8, 0, 0]}/>
            <Bar dataKey="pending" fill="#ef4444" radius={[8,8,0,0]}/>
               
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


function StudentGraph({ data }) {
  return (
    <div className="bg-white my-5 md:m-10 p-5 rounded-xl shadow">
      <h2 className="font-semibold ">Student Growth</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="students" stroke="#143a8a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


export {FeeGraph, StudentGraph}
