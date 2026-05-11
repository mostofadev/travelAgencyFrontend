// ============================================
// TypingIndicator.jsx — AI is thinking...
// ============================================

export default function TypingIndicator() {
  return (
    <div className="flex gap-2 justify-start">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-primary flex items-center
                      justify-center text-white text-sm flex-shrink-0
                      shadow-md shadow-primary/30">
        ✈️
      </div>

      {/* Dots */}
      <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none
                      px-4 py-3 shadow-sm flex items-center gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}