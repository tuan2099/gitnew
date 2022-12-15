import React, { useEffect } from 'react'
import PostItem from '../postItem'
import { useSelector } from 'react-redux'
import { Roostate, useAppDispatch } from '../../../../store'
import { deletePost, getPostList, startEdittingPost } from '../../blog.slice'
import Selecketon from '../Seleketon'
export default function PostList() {
  const postList = useSelector((state: Roostate) => state.Blog.postList)
  const loading = useSelector((state: Roostate) => state.Blog.loading)
  const dispatch = useAppDispatch()
  const handleDelete = (postID: string) => dispatch(deletePost(postID))
  const handleStartEditing = (PostID: string) => {
    dispatch(startEdittingPost(PostID))
  }
  useEffect(() => {
    const promise = dispatch(getPostList())
    return () => {
      promise.abort()
    }
  }, [dispatch])
  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {loading && (
            <>
              <Selecketon />
            </>
          )}

          {!loading &&
            postList.map((post) => {
              return (
                <>
                  <PostItem
                    post={post}
                    key={post.id}
                    handleDelete={handleDelete}
                    handleStartEditing={handleStartEditing}
                  />
                </>
              )
            })}
        </div>
      </div>
    </div>
  )
}
