"use client"
import AirportsUpdateForm from '@/components/forms/Admin/Flights/Airports/AirportsUpdateForm';
import { useParams } from 'next/navigation';
import React from 'react'

function Page() {
   const { id } = useParams();
   console.log(id);
   
  return (
    <div>
      <AirportsUpdateForm id={id} />
    </div>
  )
}

export default Page