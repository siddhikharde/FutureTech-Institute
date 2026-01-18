import { icons } from "lucide-react";

function StatCard({ title, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <h3 className="text-2xl font-bold text-[#0EA5E9]">{title}</h3>
      <p className="text-[#4B5563] text-sm">{subtitle}</p>
    </div>
  );
}
function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 hover:shadow-md transition">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#111827] mb-2">
        {title}
      </h3>
      <p className="text-[#4B5563]">{text}</p>
    </div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center hover:shadow-md transition">
      <p className="flex items-center justify-center text-center w-full mb-3 text-[#0EA5E9]">{icon}</p>
      <h4 className="font-semibold text-[#111827] mb-2">{title}</h4>
      <p className="text-[#4B5563] text-sm">{text}</p>
    </div>
  );
}



export {StatCard, InfoCard, ValueCard};