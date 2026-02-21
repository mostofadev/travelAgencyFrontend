import React from "react";
import toast from "react-hot-toast";
import {
  CheckCircle,
  AlertCircle,
  Info,
  X,
  ShoppingBag,
} from "lucide-react";

const CustomToast = ({
  t,
  title,
  message,
  type = "success",
}) => {
  const colorMap = {
    success: {
      bg: "bg-green-50",
      border: "border-green-400",
      text: "text-green-700",
      icon: (
        <CheckCircle
          className="text-green-500"
          size={20}
          strokeWidth={2.2}
        />
      ),
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-400",
      text: "text-red-700",
      icon: (
        <AlertCircle
          className="text-red-500"
          size={20}
          strokeWidth={2.2}
        />
      ),
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-400",
      text: "text-blue-700",
      icon: (
        <Info
          className="text-blue-500"
          size={20}
          strokeWidth={2.2}
        />
      ),
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-400",
      text: "text-yellow-700",
      icon: (
        <AlertCircle
          className="text-yellow-500"
          size={20}
          strokeWidth={2.2}
        />
      ),
    },
    cart: {
      bg: "bg-purple-50",
      border: "border-purple-400",
      text: "text-purple-700",
      icon: (
        <ShoppingBag
          className="text-purple-500"
          size={20}
          strokeWidth={2.2}
        />
      ),
    },
  };

  const currentStyle =
    colorMap[type] || colorMap.success;

  return (
    <div
      className={`max-w-md w-full shadow-lg rounded-lg overflow-hidden ${
        currentStyle.bg
      } border-l-4 ${currentStyle.border} ${
        t.visible ? "animate-enter" : "animate-leave"
      } transition-all duration-300 transform`}
    >
      <div className="flex items-start p-4">
        <div className="flex-shrink-0 pt-0.5 mr-3">
          {currentStyle.icon}
        </div>

        <div className="flex-1">
          <div
            className={`font-semibold text-sm ${currentStyle.text}`}
          >
            {title}
          </div>

          <div className="text-gray-600 text-xs mt-1">
            {message}
          </div>

          {type === "cart" && (
            <button className="mt-2 px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors">
              View Cart
            </button>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-400 hover:text-gray-500 ml-2"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div
          className={`h-full ${currentStyle.border.replace(
            "border-",
            "bg-"
          )}`}
          style={{
            width: t.visible ? "100%" : "0%",
            transition: `width ${t.ttl || 1000}ms linear`,
          }}
        />
      </div>
    </div>
  );
};

export default CustomToast;
