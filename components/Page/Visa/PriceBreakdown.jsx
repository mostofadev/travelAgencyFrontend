export default function PriceBreakdown({
  adults,
  childCount,
  infants,
  prices,
  total,
}) {
  return (
    <div className="mt-6">
      {adults > 0 && (
        <div className="flex justify-between text-sm text-primary">
          <span>
            {adults} Adult × ৳{prices.adult}
          </span>
          <span className="text-primary">৳{adults * prices.adult}</span>
        </div>
      )}

      {childCount > 0 && (
        <div className="flex justify-between text-sm text-primary">
          <span>
            {childCount} Child × ৳{prices.child}
          </span>
          <span className="text-primary">৳{childCount * prices.child}</span>
        </div>
      )}

      {infants > 0 && (
        <div className="flex justify-between text-sm text-primary">
          <span>
            {infants} Infant × ৳{prices.infant}
          </span>
          <span className="text-primary">৳{infants * prices.infant}</span>
        </div>
      )}

      <div className="flex justify-between items-center border-t border-primary mt-3 pt-3">
        <span className="text-lg text-primary font-semibold">Total Cost</span>

        <span className="text-2xl font-bold text-primary">
          ৳{total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
