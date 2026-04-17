
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LocationInput from "../LocationInput";
import DatePicker from "../DatePicker";
import ClassPicker from "../ClassPicker";
import { Search } from "lucide-react";
import SearchButton from "../SearchButton";
import { usePageAirport } from "@/hooks/Page/usePageFlight";

const today = new Date();
today.setHours(0, 0, 0, 0);

export default function FlightFilterPanel({ onSearch }) {
  const router = useRouter();
  const { data } = usePageAirport();

  const [tripType, setTripType] = useState("One Way");
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [flightClass, setClass] = useState("Economy");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    const airports = data?.data;
    if (airports?.length >= 2) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFrom({
        id: airports[0].id,
        city: airports[0].city,
        code: airports[0].code,
        name: airports[0].name,
        country: airports[0].country?.name ?? "",
      });
      setTo({
        id: airports[1].id,
        city: airports[1].city,
        code: airports[1].code,
        name: airports[1].name,
        country: airports[1].country?.name ?? "",
      });
    }
  }, [data]);

  const handleSearch = () => {
    const filters = {
      ...(from?.id != null ? { from_airport_id: from.id } : {}),
      ...(to?.id != null ? { to_airport_id: to.id } : {}),
      ...(departure
        ? { departure_date: departure.toISOString().split("T")[0] }
        : {}),
      ...(flightClass ? { class_name: flightClass } : {}),
      ...(tripType === "Round Trip" && returnDate
        ? { return_date: returnDate.toISOString().split("T")[0] }
        : {}),
    };

    if (onSearch) {
      onSearch(filters);
    } else {
      const params = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).map(([k, v]) => [k, String(v)]),
        ),
      );
      router.push(`/flight${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">
        <div className="w-full sm:flex-[2] lg:flex-[3] min-w-0">
          <LocationInput
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
        </div>

        <div className="w-full sm:flex-1 min-w-0">
          <DatePicker
            label="Departure Date"
            value={departure}
            onChange={setDeparture}
            minDate={today}
            placeholder="Add date"
          />
        </div>

        {tripType === "Round Trip" && (
          <div className="w-full sm:flex-1 min-w-0">
            <DatePicker
              label="Return"
              value={returnDate}
              onChange={setReturnDate}
              minDate={departure ?? today}
              placeholder="Add date"
            />
          </div>
        )}

        <div className="w-full sm:flex-1 min-w-0">
          <ClassPicker value={flightClass} onChange={setClass} />
        </div>

        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <SearchButton onClick={handleSearch}>
            <Search className="w-6 h-6" />
          </SearchButton>
        </div>
      </div>
    </div>
  );
}
