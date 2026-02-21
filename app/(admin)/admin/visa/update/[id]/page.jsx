"use client";
import VisaUpdateForm from '@/components/forms/Admin/Visa/VisaUpdateForm'
import { useParams } from 'next/navigation';
import React from 'react'

// Next.js 13+ App Router page component
 function Page() {
  
  const { id } = useParams();
  
  return (
    <div>
      <VisaUpdateForm visaId={id} />
    </div>
  )
}

export default Page