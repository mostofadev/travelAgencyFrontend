"use client";
import { forwardRef } from "react";

const Checkbox = forwardRef(
  ({ label, error, helpText, description, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              className={`
                w-5 h-5 rounded border-gray-300 
                text-blue-600 
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                cursor-pointer
                ${error ? "border-red-500" : ""}
                ${className}
              `}
              {...props}
            />
          </div>

          <div className="flex-1">
            {label && (
              <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        </label>

        {error && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1 ml-8">
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
          <p className="mt-2 text-sm text-gray-500 ml-8">{helpText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;