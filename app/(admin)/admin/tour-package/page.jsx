import TourPackageList from "@/components/forms/Admin/TourPackage/TourPackageTable";

export const metadata = {
  title: "Tour Packages | Admin Dashboard",
  description: "Manage all tour packages",
};

export default function TourPackagesPage() {
  return <TourPackageList />;
}