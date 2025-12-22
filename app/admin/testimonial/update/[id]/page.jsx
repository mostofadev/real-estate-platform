"use client";
import AdminTestimonialUpdateForm from '@/app/components/admin/page/Testimonail/AdminTestimonialUpdateForm';
import AdminBack from '@/app/components/ui/section/AdminBack'
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
     const {id} = useParams();
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/testimonial"} />
        <h1 className="text-2xl font-bold">Update Testimonial</h1>
      </div>

      <div className="">
        <AdminTestimonialUpdateForm  id={id}/>
      </div>
    </div>
  )
}

export default page