// dùng extra reducer khi mmuốn - create-async-thunk , default case

import { createAsyncThunk, createSlice, PayloadAction, current, AsyncThunk } from '@reduxjs/toolkit'
import { Post } from '../../@type/blog.type'
import { initalPostList } from '../../constants/blog'
import http from '../../utils/http'

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

interface BlogState {
  postList: Post[]
  editingPost: Post | null
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null,
  loading: false,
  currentRequestId: undefined
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

export const deletePost = createAsyncThunk('blog/deletePost', async (postID: string, thunkAPI) => {
  const res = await http.delete<Post>(`post/${postID}`, {
    signal: thunkAPI.signal
  })
  return res.data
})

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ body, postID }: { postID: string; body: Post }, thunkAPI) => {
    const res = await http.put<Post>(`post/${postID}`, body, {
      signal: thunkAPI.signal
    })
    return res.data
  }
)
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEdittingPost: (state, action: PayloadAction<string>) => {
      const PostID = action.payload
      const foundPost = state.postList.find((post) => post.id === PostID) || null
      state.editingPost = foundPost
    },
    cancelPost: (state) => {
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
      .addCase(deletePost.fulfilled, (state, action) => {
        const postID = action.meta.arg // tham số đầu tiên truyền vào
        const deletePostIndex = state.postList.findIndex((post) => post.id === postID)
        if (deletePostIndex !== -1) {
          state.postList.splice(deletePostIndex, 1)
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postList.find((post, index) => {
          if (post.id === action.payload.id) {
            state.postList[index] = action.payload
            return true
          }
          return false
        })
        state.editingPost = null
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
      .addDefaultCase((state, action) => {
        console.log(`action type ${action.type}`, current(state))
      })
  }
})

export const { cancelPost, startEdittingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer
