// dùng extra reducer khi mmuốn - create-async-thunk , default case

import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { Post } from '../../@type/blog.type'
import { initalPostList } from '../../constants/blog'
import http from '../../utils/http'
interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}

export const getPostList = createAsyncThunk('blog/getPostList', async (_, thunkAPI) => {
  const res = await http.get<Post[]>('post', {
    signal: thunkAPI.signal
  })
  return res.data
})

export const addPost = createAsyncThunk('blog/addPost', async (body: Omit<Post, 'id'>, thunkAPI) => {
  const res = await http.post<Post>('post', body, {
    signal: thunkAPI.signal
  })
  return res.data
})

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
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
  },
  extraReducers(builder) {
    builder
      .addCase(getPostList.fulfilled, (state, action: any) => {
        state.postList = action.payload
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postList.push(action.payload)
      })
      .addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state))
      })
  }
})

export const { cancelPost, deletePost, finishUpdatePost, startEdittingPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
