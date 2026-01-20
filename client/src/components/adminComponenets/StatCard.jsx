export default function StatCard({ title, value, valueColor }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full md:w-1/3">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold text-${valueColor}`}>{value}</p>
    </div>
  );
}
