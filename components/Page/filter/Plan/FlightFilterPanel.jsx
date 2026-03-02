"use client";

import { useState } from "react";
import LocationInput from "../LocationInput";
import DatePicker from "../DatePicker";
import ClassPicker from "../ClassPicker";
import { ClipboardList, Search } from "lucide-react";
import SearchButton from "../SearchButton";
import SelectField from "../SelectField";
const today = new Date();
today.setHours(0, 0, 0, 0);

export default function FlightFilterPanel() {
  const [tripType, setTripType] = useState("One Way");
  const [departure, setDeparture] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [flightClass, setClass] = useState("Economy");
  const [adults, setAdults] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infants, setInfants] = useState(0);
  const [from, setFrom] = useState({
    city: "Dhaka",
    country: "Bangladesh",
    name: "Hazrat Shahjalal International Airport",
    code: "DAC",
  });
  const [to, setTo] = useState({
    city: "Dubai",
    country: "UAE",
    name: "Dubai International Airport",
    code: "DXB",
  });

  const handleSearch = () => {
    console.log("Search:", {
      tripType,
      from,
      to,
      departure,
      returnDate,
      flightClass,
      adults,
      childCount,
      infants,
    });
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:flex-wrap lg:flex-nowrap gap-3 w-full">
        {/* From / To — */}
        <div className="w-full sm:flex-[2] lg:flex-[3] min-w-0">
          <LocationInput
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
          />
        </div>

        {/* Departure Date */}
        <div className="w-full sm:flex-1 min-w-0">
          <DatePicker
            label="Departure Date"
            value={departure}
            onChange={setDeparture}
            minDate={today}
            placeholder="Add date"
          />
        </div>

        {/* Return Date —*/}
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

        {/* Flight Class */}
        <div className="w-full sm:flex-1 min-w-0">
          <ClassPicker value={flightClass} onChange={setClass} />
          {/* <SelectField
            label="Flight Class"
            icon={<ClipboardList size={18} />}
            // options={FLIGHTCLASS}
            value={flightClass}
            onChange={setClass}
            accentColor="violet"
            showDesc
          /> */}
        </div>

        {/* Search Button */}
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          {/* <Button
            size="xl"
            className="w-full sm:w-auto px-8 whitespace-nowrap"
            onClick={handleSearch}
          >
            Search
          </Button> */}
          <SearchButton onClick={handleSearch}>
            <Search className="w-6 h-6" />
          </SearchButton>
        </div>
      </div>
    </div>
  );
}
