// ============================================
// QuickReplies.jsx — Suggestion Buttons
// ============================================

const QUICK_REPLIES = [
  { label: "🌍 সব প্যাকেজ দেখাও", value: "সব ট্যুর প্যাকেজ দেখাও" },
  { label: "🛂 সব ভিসা দেখাও", value: "সব ভিসা প্যাকেজ দাও" },
  { label: "🇹🇭 থাইল্যান্ড", value: "থাইল্যান্ড প্যাকেজ আছে?" },
  { label: "🇲🇻 মালদ্বীপ", value: "মালদ্বীপ ট্যুর প্যাকেজ কত?" },
  { label: "💰 বাজেট ট্যুর", value: "৫০ হাজারের মধ্যে ট্যুর আছে?" },
  { label: "✈️ ফ্লাইট তথ্য", value: "ফ্লাইট সম্পর্কে জানতে চাই" },
];

export default function QuickReplies({ onSelect, visible }) {
  if (!visible) return null;

  return (
    <div className="px-3 pb-2">
      <p className="text-[10px] text-gray-400 mb-2">💡 দ্রুত জিজ্ঞেস করুন:</p>
      <div className="flex flex-wrap gap-1.5">
        {QUICK_REPLIES.map((reply, i) => (
          <button
            key={i}
            onClick={() => onSelect(reply.value)}
            className="text-[11px] bg-white border border-primary/20 text-primary
                       px-3 py-1.5 rounded-full hover:bg-primary hover:text-white
                       hover:border-primary transition-all duration-200
                       active:scale-95 shadow-sm"
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
