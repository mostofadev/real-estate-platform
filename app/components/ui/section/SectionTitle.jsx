import React from 'react'

function SectionTitle({ title, description }) {
  return (
    <div className="text-center lg:mb-12 mb-4">
      <h2 className="text-3xl font-bold mb-3 text-[var(--color-text-max)]">{title}</h2>
      <p className="text-[var(--color-text-min)] lg:text-sm text-[11px] leading-relaxed mx-auto max-w-2xl">{description}</p>
    </div>
  )
}

export default SectionTitle