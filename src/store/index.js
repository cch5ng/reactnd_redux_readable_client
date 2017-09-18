import { combineReducers } from 'redux'
import { posts, categories, postsFilter, postsSort, postDetail, postCreate, postEdit,
  postDelete, postVote} from '../posts/PostReducers'
import { comments, commentsSort, commentCreate, commentEdit, commentDelete,
  commentVote } from '../comments/CommentReducers'

export default combineReducers({
    posts,
    categories,
    postsFilter,
    postsSort,
    postDetail,
    postCreate,
    postEdit,
    postDelete,
    postVote,
    comments,
    commentsSort,
    commentCreate,
    commentEdit,
    commentDelete,
    commentVote
  })