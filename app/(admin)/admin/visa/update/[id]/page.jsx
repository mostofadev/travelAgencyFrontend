"use client";
import VisaUpdateForm from '@/components/forms/Admin/Visa/VisaUpdateForm'
import { useParams } from 'next/navigation';
import React from 'react'

 function Page() {
  
  const { id } = useParams();
  
  return (
    <div>
      <VisaUpdateForm visaId={id} />
    </div>
  )
}

export default Page