import FeatureCreateForm from '@/app/components/admin/page/Feature/FeatureCreateForm'
import AdminBack from '@/app/components/ui/section/AdminBack'
import React from 'react'

function page() {
  return (
    <div>
      <div className="flex items-center gap-4 p-6 justify-between">
        <AdminBack To={"/admin/feature"} />
        <h1 className="text-2xl font-bold">Create Feature</h1>
      </div>

      <div className="">
        <FeatureCreateForm />
      </div>
    </div>
  )
}

export default page