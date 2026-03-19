import { motion } from 'framer-motion'
function FeatureCard({ icon: Icon, title, description }) {
  return (
     <motion.div
      className="relative bg-[#0F172A] border border-gray-800 rounded-2xl p-6 cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden"
      whileHover={{ scale: 1.07, y: -8 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

      <motion.div
        className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-purple-600 mb-4"
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        <Icon className="text-white" size={26} />
      </motion.div>

      <h3 className="text-lg font-bold text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-blue-400 to-purple-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
      />
    </motion.div>
  );
}

export default FeatureCard;
