// separate /comments
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, SORT_COMMENTS, REQUEST_COMMENT_VOTE, RECEIVE_COMMENT_VOTE, } from '../actions'
import { RECEIVE_COMMENT_CREATE, REQUEST_COMMENT_CREATE, RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_EDIT, REQUEST_COMMENT_DELETE, RECEIVE_COMMENT_DELETE } from '../actions'
import { TOGGLE_COMMENT_FORM_ACTIVE, UPDATE_COMMENT_FORM_FIELD, SET_COMMENT_FORM_TYPE, CLEAR_COMMENT_FORM_FIELD, UPDATE_COMMENT_FORM_FIELD_MULTIPLE, SET_CURRENT_COMMENT_ID } from '../actions'

// COMMENTS

export function comments(state = [], action) {

  switch(action.type) {
    case REQUEST_COMMENTS:
      return {
        ...state,

      }
    case RECEIVE_COMMENTS:
      return {
        ...state,
        comments: action.comments
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

export function commentCreate(state = {}, action) {
  switch(action.type) {
    case RECEIVE_COMMENT_CREATE:
      return {
        ...state,
        comment: action.comment
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
