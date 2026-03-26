import { motion } from "framer-motion";

/* 🔥 STAT CARD */
function StatCard({ title, subtitle }) {
  return (
    <motion.div
      className="bg-[#0F172A] border border-gray-700 rounded-xl p-6 text-center shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
      <p className="text-gray-400 text-sm">{subtitle}</p>
    </motion.div>
  );
}
function InfoCard({ icon, title, text }) {
  return (
    <motion.div
      className="bg-[#0F172A] border border-gray-700 rounded-2xl p-8 cursor-pointer shadow-lg"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="text-blue-400 mb-4">{icon}</div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-400">{text}</p>
    </motion.div>
  );
}

function ValueCard({ icon, title, text }) {
  return (
    <motion.div
      className="bg-[#0F172A] border border-gray-700 rounded-xl p-6 text-center shadow-lg cursor-pointer"
      whileHover={{
        y: -8,
        scale: 1.05,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.5)",
      }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="flex justify-center mb-3 text-blue-400">
        {icon}
      </div>

      <h4 className="font-semibold text-white mb-2">
        {title}
      </h4>

      <p className="text-gray-400 text-sm">{text}</p>
    </motion.div>
  );
}

export { StatCard, InfoCard, ValueCard };