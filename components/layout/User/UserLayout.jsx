import { Suspense } from "react";
import UserLayoutContent from "./UserLayoutContent";

export default function UserLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#10172a] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UserLayoutContent>{children}</UserLayoutContent>
    </Suspense>
  );
}
