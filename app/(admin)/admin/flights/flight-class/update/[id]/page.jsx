"use client";
import FlightClassUpdateForm from "@/components/forms/Admin/Flights/FlightClass/FlightClassUpdateForm";
import { useParams } from "next/navigation";

export default function FlightClassUpdatePage() {
  const { id } = useParams();
  return <FlightClassUpdateForm id={id} />;
}
