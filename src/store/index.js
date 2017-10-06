import { combineReducers } from 'redux'
import { posts, categories, postsFilter, postsSort, postDetail } from '../posts/PostReducers'
import { comments, commentsSort } from '../comments/CommentReducers'

export default combineReducers({
    posts,
    categories,
    postsFilter,
    postsSort,
    postDetail,
    comments,
    commentsSort
  })
