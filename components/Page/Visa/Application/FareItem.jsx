// FareItem.jsx
function FareItem({ label, count, visaFee, serviceFee }) {
  const subTotal = count * (visaFee + serviceFee);

  return (
    <div className="space-y-2">
      <p className="font-medium">
        {label} x {count}
      </p>

      <div className="grid grid-cols-3 text-sm">
        <p>Service Charge</p>
        <div className="flex gap-1">
          <span>{count} x</span>
          <span>BDT</span>
        </div>
        <p>{Number(serviceFee).toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-3 text-sm">
        <p>Visa Fee</p>
        <div className="flex gap-1">
          <span>{count} x</span>
          <span>BDT</span>
        </div>
        <p>{Number(visaFee).toLocaleString()}</p>
      </div>

      <div className="border-t border-gray-300"></div>

      <div className="grid grid-cols-3 font-medium">
        <p>Sub-total</p>
        <p>BDT</p>
        <p>{Number(subTotal).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default FareItem;
