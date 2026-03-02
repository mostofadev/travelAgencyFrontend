"use client"
import FlightsUpdateForm from '@/components/forms/Admin/Flights/Flights/FlightUpdateForm'
import { useParams } from 'next/navigation';
import React from 'react'

function Page() {
     const { id } = useParams();
       console.log(id);
       
  return (
    <div>
        <FlightsUpdateForm id={id}/>
    </div>
  )
}

export default Page