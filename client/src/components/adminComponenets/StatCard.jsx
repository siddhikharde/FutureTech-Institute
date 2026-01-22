import { Users, IndianRupee } from "lucide-react";

export default function StatCard({ title, value, type, valueColor }) {
  const Icon = type === "students" ? Users : IndianRupee;

  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-md hover:-translate-y-1 duration-100 hover:shadow-lg">
      <p className="text-sm text-gray-500 mb-2">{title}</p>

      <h2 className={`text-3xl font-bold  ${valueColor || "text-slate-900"} `}>
        {value}
      </h2>

      <div className="absolute right-4 top-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        <Icon className="text-blue-600" size={22} />
      </div>
    </div>
  );
}
