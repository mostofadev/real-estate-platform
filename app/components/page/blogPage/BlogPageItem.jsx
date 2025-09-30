import React from 'react'
import BlogCard from '../../ui/card/BlogCard'

function BlogPageItem({blogs}) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
        ))}
    </div>
  )
}

export default BlogPageItem