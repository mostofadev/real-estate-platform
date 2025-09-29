import Layout from '@/app/components/layout/Layout'
import FilterProperties from '@/app/components/page/find/FilterProperties'
import PropertiesItems from '@/app/components/page/find/PropertiesItems'
import MarginSection from '@/app/components/sections/MarginSection'
import React from 'react'

function page() {
  return (
    <div>
        <Layout>
            <MarginSection >
                <FilterProperties />
                
                <PropertiesItems />
            </MarginSection>
        </Layout>
    </div>
  )
}

export default page