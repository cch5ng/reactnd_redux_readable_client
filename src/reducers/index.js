import { combineReducers } from 'redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'
import { FILTER_POSTS } from '../actions'
import { SORT_POSTS } from '../actions'
import { REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from '../actions'

function categories(state = [], action) {

  switch(action.type) {
    case REQUEST_CATEGORIES:
      return {
        ...state,

      }
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      }
    default:
      return state
  }
}

function posts(state = [], action) {

  switch(action.type) {
    case REQUEST_POSTS:
      return {
        ...state,

      }
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state
  }
}

function postsFilter(state = { filter: 'all' }, action) {

  switch(action.type) {
    case FILTER_POSTS:
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}

function postsSort(state = { sortKey: 'voteScore', sortOrderDesc: true }, action) {

  switch(action.type) {
    case SORT_POSTS:
      return {
        ...state,
        sortKey: action.sortKey,
        sortOrderDesc: action.sortKey === state.sortKey ? !state.sortOrderDesc : true 
      }
    default:
      return state
  }
}

function postDetail(state = {}, action) {

  switch(action.type) {
    case REQUEST_POST_DETAIL:
      return {
        ...state,
      }
    case RECEIVE_POST_DETAIL:
      return {
        ...state,
        postDetail: action.postDetail
      }
    default:
      return state
  }
}

function comments(state = [], action) {

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

export default combineReducers({
  posts,
  categories,
  postsFilter,
  postsSort,
  postDetail,
  comments
})

// note that format of combined reducer will be like
/*
  {
    posts: {
      posts: []
    },
    categories: {
      categories: [ß]
    }
  }
*/
