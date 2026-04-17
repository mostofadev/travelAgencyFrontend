export default function CounterRow({
  label,
  subtitle,
  count = 0,
  price,
  showPrice = false,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10">
      {/* Left */}
      <div>
        <p className="text-lg font-semibold text-primary">{label}</p>

        {subtitle && <p className="text-xs text-primary">{subtitle}</p>}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {showPrice && (
          <p className="text-sm text-primary">
            ৳{(price * count).toLocaleString()}
          </p>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={onDecrement}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-primary hover:bg-gray-50 hover:text-black transition"
          >
            -
          </button>

          <span className="text-lg text-primary min-w-[20px] text-center">
            {count}
          </span>

          <button
            onClick={onIncrement}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
