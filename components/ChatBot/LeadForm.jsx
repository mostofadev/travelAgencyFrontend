"use client";
// ============================================
// LeadForm.jsx — Contact Info Collection
// ============================================

import { useState } from "react";

export default function LeadForm({ onSubmit, onDismiss, isLoading }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    onSubmit(form);
  };

  return (
    <div
      className="rounded-2xl border border-primary/20 bg-white
                    overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div
        className="bg-gradient-to-r from-primary/5 to-primary/10
                      px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span>📞</span>
          <p className="text-xs font-semibold text-gray-700">
            Get Expert Assistance
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ✕
        </button>
      </div>

      <p className="text-[11px] text-gray-500 px-4 pt-3 pb-1">
        Leave your details and our travel expert will contact you within 24
        hours.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-4 pb-4 pt-2 space-y-2.5">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name *"
          required
          className="w-full text-xs bg-gray-50 border border-gray-200
                     rounded-xl px-3 py-2.5 outline-none
                     focus:ring-2 focus:ring-primary/30 focus:border-primary/40
                     placeholder:text-gray-400 transition-all"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number *"
          required
          type="tel"
          className="w-full text-xs bg-gray-50 border border-gray-200
                     rounded-xl px-3 py-2.5 outline-none
                     focus:ring-2 focus:ring-primary/30 focus:border-primary/40
                     placeholder:text-gray-400 transition-all"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email (optional)"
          type="email"
          className="w-full text-xs bg-gray-50 border border-gray-200
                     rounded-xl px-3 py-2.5 outline-none
                     focus:ring-2 focus:ring-primary/30 focus:border-primary/40
                     placeholder:text-gray-400 transition-all"
        />

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onDismiss}
            className="flex-1 text-xs text-gray-500 border border-gray-200
                       py-2.5 rounded-xl hover:bg-gray-50 transition-all"
          >
            Later
          </button>
          <button
            type="submit"
            disabled={isLoading || !form.name.trim() || !form.phone.trim()}
            className="flex-2 flex-grow text-xs bg-primary text-white
                       py-2.5 px-4 rounded-xl hover:bg-primary/90
                       active:scale-95 transition-all disabled:opacity-50
                       font-semibold"
          >
            {isLoading ? "Submitting..." : "Submit →"}
          </button>
        </div>
      </form>
    </div>
  );
}
