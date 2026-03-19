import { motion } from 'framer-motion'

const Button = ({
  title,
  variant = "primary",
  size = "sm",
  onClick,
  type = "button",
}) => {
  const baseStyle =
    "rounded-xl font-semibold transition-all duration-300 focus:outline-none relative overflow-hidden";

 const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-blue-500/40",
    secondary:
      "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/40",
    outline:
      "border border-blue-500 text-blue-400 hover:bg-blue-500/10",
    danger:
      "bg-gradient-to-r from-red-500 to-pink-600 text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-7 py-3 text-lg",
  };


   return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} cursor-pointer`}
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition duration-500" />
      <span className="relative z-10">{title}</span>
    </motion.button>
  );
};

export default Button;
