import { combineReducers } from 'redux'
// separate /categories
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions'
// separate /posts
import { REQUEST_POSTS, RECEIVE_POSTS, FILTER_POSTS, SORT_POSTS, REQUEST_POST_VOTE, RECEIVE_POST_VOTE, REQUEST_POST_DELETE, RECEIVE_POST_DELETE } from '../actions'
import { REQUEST_POST_CREATE, RECEIVE_POST_CREATE, REQUEST_POST_EDIT, RECEIVE_POST_EDIT, REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL } from '../actions'
import { SET_POST_FORM_TYPE, UPDATE_POST_FORM_FIELD, CLEAR_POST_FORM_FIELD, UPDATE_POST_FORM_FIELD_MULTIPLE } from '../actions'
// separate /comments
import { REQUEST_COMMENTS, RECEIVE_COMMENTS, SORT_COMMENTS, REQUEST_COMMENT_VOTE, RECEIVE_COMMENT_VOTE, } from '../actions'
import { RECEIVE_COMMENT_CREATE, REQUEST_COMMENT_CREATE, RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_EDIT, REQUEST_COMMENT_DELETE, RECEIVE_COMMENT_DELETE } from '../actions'
import { TOGGLE_COMMENT_FORM_ACTIVE, UPDATE_COMMENT_FORM_FIELD, SET_COMMENT_FORM_TYPE, CLEAR_COMMENT_FORM_FIELD, UPDATE_COMMENT_FORM_FIELD_MULTIPLE, SET_CURRENT_COMMENT_ID } from '../actions'

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

function postCreate(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POST_CREATE:
      return {
        ...state,
        post: action.post
      }
    case REQUEST_POST_CREATE:
    default:
      return state
  }
}

function postEdit(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POST_EDIT:
      return {
        ...state,
        post: action.post
      }
    case REQUEST_POST_EDIT:
    default:
      return state
  }
}

function postDelete(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POST_DELETE:
    case REQUEST_POST_DELETE:
    default:
      return state
  }
}

function postFormState(state = { formType: 'create', title: '', body: '', author: '', category: 'none', voteScore: 0, timestamp: ''}, action) {
  const clearedFields = {
    title: '',
    body: '',
    author: '',
    category: 'none',
    voteScore: 0,
    timestamp: ''
  }

  switch(action.type) {
    case SET_POST_FORM_TYPE:
      return {
        ...state,
        formType: action.formType
      }
    case UPDATE_POST_FORM_FIELD:
        let newField = {}
        var property = Object.keys(action).filter(item => (item !== 'type'))
        newField[property] = action[property]
       return {
         ...state,
         ...newField
       }
    case UPDATE_POST_FORM_FIELD_MULTIPLE:
        let fieldsDataObj = {}
        var properties = Object.keys(action).filter(item => (item !== 'type'))
        properties.forEach(prop => {
          fieldsDataObj[prop] = action[prop]
        })
       return {
         ...state,
         ...fieldsDataObj
       }
    case CLEAR_POST_FORM_FIELD:
      return {
        ...state,
        ...clearedFields
      }
    default:
      return state
  }
}

function postVote(state = {}, action) {

  switch(action.type) {
    case REQUEST_POST_VOTE:
      return {
        ...state,

      }
    case RECEIVE_POST_VOTE:
      return {
        ...state,
        //posts: action.posts
      }
    default:
      return state
  }
}

/////
// COMMENTS

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

// TODO could this be refactored with postsSort? kind of want to keep them separate
// but basically the same logic, just a different reducer
function commentsSort(state = { sortKey: 'voteScore', sortOrderDesc: true }, action) {

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

function commentCreate(state = {}, action) {
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

function commentEdit(state = {}, action) {
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

function commentDelete(state = {}, action) {
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

function commentFormState(state = { active: false, formType: 'create', id: '', body: '', author: '', voteScore: 0, timestamp: ''}, action) {
  const clearedFields = {
    id: '',
    body: '',
    author: '',
    voteScore: 0,
    timestamp: ''
  }

  switch(action.type) {
    case TOGGLE_COMMENT_FORM_ACTIVE:
      return {
        ...state,
        active: !state.active
      }
    case SET_COMMENT_FORM_TYPE:
      return {
        ...state,
        formType: action.formType
      }
    case SET_CURRENT_COMMENT_ID:
      return {
        ...state,
        id: action.commentId
      }
    case UPDATE_COMMENT_FORM_FIELD:
        let newField = {}
        var property = Object.keys(action).filter(item => (item !== 'type'))
        newField[property] = action[property]
       return {
         ...state,
         ...newField
       }
    case UPDATE_COMMENT_FORM_FIELD_MULTIPLE:
        let fieldsDataObj = {}
        var properties = Object.keys(action).filter(item => (item !== 'type'))
        properties.forEach(prop => {
          fieldsDataObj[prop] = action[prop]
        })
       return {
         ...state,
         ...fieldsDataObj
       }
    case CLEAR_COMMENT_FORM_FIELD:
      return {
        ...state,
        ...clearedFields
      }
    default:
      return state
  }
}

function commentVote(state = {}, action) {
  switch(action.type) {
    case REQUEST_COMMENT_VOTE:
    case RECEIVE_COMMENT_VOTE:
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
  postCreate,
  postEdit,
  postDelete,
  postVote,
  comments,
  commentsSort,
  commentCreate,
  commentEdit,
  commentDelete,
  postFormState,
  commentFormState,
  commentVote
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
