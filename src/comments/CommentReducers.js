// separate /comments
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, SORT_COMMENTS, REQUEST_COMMENT_VOTE, 
  RECEIVE_COMMENT_VOTE, RECEIVE_COMMENT_CREATE, REQUEST_COMMENT_CREATE,
  RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_EDIT, REQUEST_COMMENT_DELETE,
  RECEIVE_COMMENT_DELETE, TOGGLE_COMMENT_FORM_ACTIVE, UPDATE_COMMENT_FORM_FIELD
} from '../comments/CommentActions'

// COMMENTS

export function comments(state = {comments: {}, allIds: []}, action) {

  switch(action.type) {
    case RECEIVE_COMMENTS:
      let commentsObj = {}
      let allIds = []
      action.comments.forEach(comment => {
        if (!state.comments[comment.id]) {
          commentsObj[comment.id] = comment
        }
        if (state.allIds.indexOf(comment.id) === -1) {
          allIds.push(comment.id)
        }
      })
      console.log('commentsObj: ' + commentsObj)
      console.log('keys commentsObj: ' + Object.keys(commentsObj))
      console.log('allIds')

      return {
        ...state,
        comments: {
          ...state.comments,
          ...commentsObj
        },
        allIds: state.allIds.concat(allIds)
      }
    case REQUEST_COMMENTS:
    default:
      return state
  }
}

// TODO could this be refactored with postsSort? kind of want to keep them separate
// but basically the same logic, just a different reducer
export function commentsSort(state = { sortKey: 'voteScore', sortOrderDesc: true }, action) {

  switch(action.type) {
    case SORT_COMMENTS:
      return {
        ...state,
        sortKey: action.sortKey,
        sortOrderDesc: action.sortKey === state.sortKey ? !state.sortOrderDesc : true 
      }
    default:
      return state
  }
}

export function commentCreate(state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENT_CREATE:
      let commentId = action.comment.id
      return {
        ...state,
        comments: {
          ...state.comments,
          commentId: action.comment
        }
      }
    case REQUEST_COMMENT_CREATE:
    default:
      return state
  }
}

export function commentEdit(state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENT_EDIT:
      return {
        ...state,
        comment: action.comment
      }
    case REQUEST_COMMENT_EDIT:
    default:
      return state
  }
}

export function commentDelete(state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENT_DELETE:
      return {
        ...state,
        comment: action.comment
      }
    case REQUEST_COMMENT_DELETE:
    default:
      return state
  }
}

export function commentVote(state = {}, action) {
  switch(action.type) {
    case REQUEST_COMMENT_VOTE:
    case RECEIVE_COMMENT_VOTE:
    default:
      return state
  }
}
