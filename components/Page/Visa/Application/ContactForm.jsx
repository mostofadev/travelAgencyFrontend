"use client";

import Input from "@/components/ui/Input";

export default function ContactForm({ register, errors }) {
  return (
    <div className="border border-gray-100 p-5 rounded-xl shadow-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="Email"
            {...register("contact.email")}
          />
          {errors?.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Phone Number
          </label>
          <Input
            type="text"
            placeholder="Phone Number (Optional)"
            {...register("contact.phone_number")}
          />
        </div>
      </div>
    </div>
  );
}
