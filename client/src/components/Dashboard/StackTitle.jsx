const StackTitle = ({ title, count = 0, color = "gray" }) => {
  const colorClasses = {
    blue: "bg-blue-200 text-blue-700",
    gray: "bg-gray-200 text-gray-700",
    green: "bg-green-200 text-green-700",
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]}`}
      >
        {count}
      </span>
    </div>
  );
};

export default StackTitle;
