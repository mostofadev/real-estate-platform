import Layout from '@/app/components/layout/Layout'
import About from '@/app/components/page/about/About'
import MarginSection from '@/app/components/sections/MarginSection'
import React from 'react'

function page() {
  return (
    <Layout>
        <MarginSection>
            <About />
        </MarginSection>
    </Layout>
  )
}

export default page