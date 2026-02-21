"use client";
import { forwardRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const FileUpload = forwardRef(
  (
    {
      label,
      error,
      helpText,
      accept = "image/*",
      maxSize = 2048, // KB
      preview = true,
      className = "",
      onChange,
      ...props
    },
    ref
  ) => {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
      const file = e.target.files?.[0];

      if (file) {
        // Validate file size
        const fileSizeKB = file.size / 1024;
        if (fileSizeKB > maxSize) {
          alert(`File size must be less than ${maxSize}KB`);
          e.target.value = "";
          return;
        }

        setFileName(file.name);

        // Create preview for images
        if (file.type.startsWith("image/") && preview) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }

        // Call parent onChange
        if (onChange) {
          onChange(e);
        }
      }
    };

    const clearFile = () => {
      setPreviewUrl(null);
      setFileName("");
      if (ref?.current) {
        ref.current.value = "";
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={`
          relative border-2 border-dashed rounded-xl p-6
          transition-all duration-200
          ${
            error
              ? "border-red-500 bg-red-50/50"
              : "border-gray-300 bg-gray-50 hover:border-primary hover:bg-gray-100"
          }
          ${className}
        `}
        >
          {!previewUrl ? (
            <label className="cursor-pointer block">
              <input
                ref={ref}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="hidden"
                {...props}
              />

              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>

                <p className="text-sm font-medium text-gray-700 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  {accept.includes("image")
                    ? "PNG, JPG, WEBP up to"
                    : "Files up to"}{" "}
                  {maxSize}KB
                </p>
              </div>
            </label>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={clearFile}
                className="absolute -top-2 -right-2 z-10 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border-2 border-gray-200 flex-shrink-0">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click the X button to remove
                  </p>
                </div>
              </div>
            </div>
          )}
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

FileUpload.displayName = "FileUpload";

export default FileUpload;