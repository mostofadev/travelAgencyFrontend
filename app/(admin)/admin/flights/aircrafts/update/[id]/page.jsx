"use client"
import AircraftsUpdateForm from '@/components/forms/Admin/Flights/Aircrafts/AircraftsUpdateForm';
import { useParams } from 'next/navigation';
import React from 'react'

function Page() {
   const { id } = useParams();
   console.log(id);
   
  return (
    <div>
      <AircraftsUpdateForm Id={id} />
    </div>
  )
}

export default Page