import { Calendar, Plane, Home } from "lucide-react";

export default function VisaInfoCards() {
  const items = [
    {
      icon: <Calendar className="h-6 w-6" />,
      label: "Valid",
      value: "180 Days",
    },
    { icon: <Plane className="h-6 w-6" />, label: "Entry", value: "Single" },
    { icon: <Home className="h-6 w-6" />, label: "Max Stay", value: "30 Days" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex-1 text-center bg-gray-100 rounded-lg py-3"
        >
          <div className="text-lg flex justify-center">{item.icon}</div>

          <p className="text-[10px] text-primary uppercase tracking-widest">
            {item.label}
          </p>

          <p className="text-xs text-primary font-medium">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
