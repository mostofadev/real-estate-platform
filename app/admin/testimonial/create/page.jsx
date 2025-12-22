"use client";
import AdminTestimonialCreateForm from '@/app/components/admin/page/Testimonail/AdminTestimonialCreateForm'
import AdminBack from '@/app/components/ui/section/AdminBack'
import React from 'react'

function page() {
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/blog"} />
        <h1 className="text-2xl font-bold">Create Testimonial</h1>
      </div>

      <div className="">
        <AdminTestimonialCreateForm />
      </div>
    </div>
  )
}

export default page