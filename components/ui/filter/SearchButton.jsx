"use client";

import { Search } from "lucide-react";

export default function SearchButton({
  onClick,
  className = "",
  iconSize = "default",
  children,
}) {
  const iconSizes = {
    default: "w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10",
    small: "w-5 h-5",
    large: "w-10 h-10 lg:w-12 lg:h-12",
  };

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-full h-15 sm:w-19 sm:h-19 lg:w-24 lg:h-19
        bg-primary text-white
        shadow-lg
        hover:bg-primary/90
        active:scale-95
        transition-all duration-200
        ${className}
      `}
    >
      {children ? (
        children
      ) : (
        <Search className={iconSizes[iconSize]} />
      )}
    </button>
  );
}