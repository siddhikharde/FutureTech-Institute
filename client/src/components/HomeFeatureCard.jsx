function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-2xl p-6
                 hover:bg-[#F9FAFB] hover:shadow-2xl
                 transition-all duration-300 shadow-xl cursor-pointer flex flex-col items-center justify-center" 
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                      bg-gradient-to-br from-[#40bef9] to-[#3351e7] mb-4">
        <Icon className="text-white" size={24} />
      </div>

      <h3 className="text-xl text-center font-bold text-[#111827] mb-2">
        {title}
      </h3>

      <p className="text-[#4B5563] text-center text-md">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
