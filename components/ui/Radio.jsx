"use client";
import { forwardRef } from "react";

const Radio = forwardRef(
  (
    {
      label,
      error,
      helpText,
      options = [],
      orientation = "horizontal", 
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`
          flex gap-4
          ${orientation === "vertical" ? "flex-col" : "flex-wrap"}
          ${className}
        `}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={`
                relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer
                transition-all duration-200
                ${
                  error
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200 bg-white hover:border-primary hover:bg-gray-100"
                }
                has-[:checked]:border-gray-100 has-[:checked]:bg-gray-100 has-[:checked]:shadow-sm
                has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed
              `}
            >
              <input
                ref={ref}
                type="radio"
                value={option.value}
                disabled={option.disabled}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-2 focus:ring-primary"
                {...props}
              />

              <div className="flex-1">
                <span className="text-sm font-medium text-gray-900">
                  {option.label}
                </span>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helpText && !error && (
          <p className="mt-2 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;