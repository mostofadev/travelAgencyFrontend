"use client";
import TourPackageUpdateForm from '@/components/forms/Admin/TourPackage/TourPackageUpdateForm';
import { useParams } from 'next/navigation';
import React from 'react'

// Next.js 13+ App Router page component
 function Page() {
  
  const { id } = useParams();
  console.log(id);
  
  return (
    <div>
      <TourPackageUpdateForm packageId={id} />
    </div>
  )
}

export default Page