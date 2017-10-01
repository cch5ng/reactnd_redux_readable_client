import { combineReducers } from 'redux'
import { posts, categories, postsFilter, postsSort, postDetail,
  postVote} from '../posts/PostReducers'
import { comments, commentsSort, commentVote } from '../comments/CommentReducers'

export default combineReducers({
    posts,
    categories,
    postsFilter,
    postsSort,
    postDetail,
    postVote,
    comments,
    commentsSort,
    commentVote
  })
