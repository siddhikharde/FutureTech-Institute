const Button = ({
  title,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
}) => {
  const baseStyle =
    "rounded-lg font-medium transition duration-200 focus:outline-none";

  const variants = {
    primary: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
    secondary: "bg-[#06B6D4] text-white hover:bg-[#0891B2]",
    outline:
      "border border-[#2563EB] text-[#2563EB] hover:bg-[#DBEAFE]",
    danger: "bg-[#EF4444] text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };


  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} cursor-pointer`}  >
      {title}
    </button>
  );
};

export default Button;
