import React from 'react'
import { Post } from '../../../../@type/blog.type'
interface PostItemType {
  post: Post
  handleDelete: (postID: string) => void
  handleStartEditing: (PostID: string) => void
}
function PostItem({ post, handleDelete, handleStartEditing }: PostItemType) {
  return (
    <div className='flex flex-col gap-2 p-4 lg:p-6'>
      <span className='text-sm text-gray-400'>{post.publishDate}</span>
      <h2 className='text-xl font-bold text-gray-800'>{post.title}</h2>
      <p className='text-gray-500'>{post.description}</p>
      <div>
        <div className='inline-flex rounded-md shadow-sm' role='group'>
          <button
            type='button'
            className='rounded-l-lg border border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
            onClick={() => handleStartEditing(post.id)}
          >
            Edit
          </button>
          <button
            type='button'
            className='rounded-r-lg border-t border-b border-r border-gray-200 bg-white py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700'
            onClick={() => handleDelete(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostItem
