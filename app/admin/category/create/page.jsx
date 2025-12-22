import CategoryCreateForm from '@/app/components/admin/page/category/CategoryCreateForm'
import AdminBack from '@/app/components/ui/section/AdminBack'
import React from 'react'

function page() {
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/category"} />
        <h1 className="text-2xl font-bold">Create Category</h1>
      </div>

      <div className="">
        <CategoryCreateForm />
      </div>
    </div>
  )
}

export default page