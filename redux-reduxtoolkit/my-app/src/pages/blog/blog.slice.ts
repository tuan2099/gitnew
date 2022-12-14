import { createReducer, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../../@type/blog.type'
import { initalPostList } from '../../constants/blog'
interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}

// export const addPost = createAction<Post>('blog/addPost')
// export const deletePost = createAction<string>('delete/ddeletePost')
// export const startEdittingPost = createAction<string>('/blog/startEdittingPost')
// export const cancelPost = createAction('/blog/cancelPost')
// export const finishUpdatePost = createAction<Post>('/blog/finishUpdatePost')

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload
      state.postList.push(post)
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const PostID = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === PostID)
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    },
    startEdittingPost: (state, action: PayloadAction<string>) => {
      const PostID = action.payload
      const foundPost = state.postList.find((post) => post.id === PostID) || null
      state.editingPost = foundPost
    },
    cancelPost: (state) => {
      state.editingPost = null
    },
    finishUpdatePost: (state, action: PayloadAction<Post>) => {
      const PostID = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === PostID) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    }
  }
})
// const blogReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(addPost, (state, action) => {
//       const post = action.payload
//       state.postList.push(post)
//     })
//     .addCase(deletePost, (state, action) => {
//       const PostID = action.payload
//       const foundPostIndex = state.postList.findIndex((post) => post.id === PostID)
//       if (foundPostIndex !== -1) {
//         state.postList.splice(foundPostIndex, 1)
//       }
//     })
//     .addCase(startEdittingPost, (state, action) => {
//       const PostID = action.payload
//       const foundPost = state.postList.find((post) => post.id === PostID) || null
//       state.editingPost = foundPost
//     })
//     .addCase(cancelPost, (state) => {
//       state.editingPost = null
//     })
//     .addCase(finishUpdatePost, (state, action) => {
//       const PostID = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id === PostID) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     })
// })
export const { cancelPost, deletePost, finishUpdatePost, startEdittingPost, addPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
