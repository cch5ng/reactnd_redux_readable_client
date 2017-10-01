// separate /comments
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, SORT_COMMENTS, REQUEST_COMMENT_VOTE, 
  RECEIVE_COMMENT_VOTE, RECEIVE_COMMENT_CREATE, REQUEST_COMMENT_CREATE,
  RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_EDIT, REQUEST_COMMENT_DELETE,
  RECEIVE_COMMENT_DELETE, TOGGLE_COMMENT_FORM_ACTIVE, UPDATE_COMMENT_FORM_FIELD
} from '../comments/CommentActions'

// COMMENTS

export function comments(state = {comments: {}, allIds: []}, action) {

  switch(action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,
        retrievingComments: action.retrievingComments
      }
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

      return {
        ...state,
        comments: {
          ...state.comments,
          ...commentsObj
        },
        allIds: state.allIds.concat(allIds),
        retrievingComments: action.retrievingComments
      }
    case REQUEST_COMMENT_CREATE:
      return {
        ...state,
        retrievingCreateComment: action.retrievingCreateComment
      }
    case RECEIVE_COMMENT_CREATE:
      let commentId = action.comment.id
      return {
        ...state,
        comments: {
          ...state.comments,
          [commentId]: action.comment
        },
        allIds: state.allIds.concat([commentId]),
        retrievingCreateComment: action.retrievingCreateComment
      }
    case REQUEST_COMMENT_EDIT:
      return {
        ...state,
        retrievingEditComment: action.retrievingEditComment
      }
    case RECEIVE_COMMENT_EDIT:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: action.comment
        },
        retrievingEditComment: action.retrievingEditComment
      }
    case REQUEST_COMMENT_DELETE:
      return {
        ...state,
        retrievingDeleteComment: action.retrievingDeleteComment
      }

    case RECEIVE_COMMENT_DELETE:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.id]: {
            ...state.comments[action.comment.id],
            deleted: true
          }
        },
        allIds: state.allIds.filter(commentId => (commentId !== action.comment.id)),
        retrievingDeleteComment: action.retrievingDeleteComment
      }


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

export function commentVote(state = {}, action) {
  switch(action.type) {
    case REQUEST_COMMENT_VOTE:
    case RECEIVE_COMMENT_VOTE:
    default:
      return state
  }
}
