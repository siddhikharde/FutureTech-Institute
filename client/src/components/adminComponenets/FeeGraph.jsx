import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
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
      <h2 className="font-semibold mb-4">Fee Overview</h2>
      <ResponsiveContainer width="50%" height={250}>
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

export default FeeGraph
