import { combineReducers } from 'redux'
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../actions'
import { REQUEST_POSTS, RECEIVE_POSTS } from '../actions'
import { FILTER_POSTS } from '../actions'

// const initPostsState = [
//     {
//         "id": "8xf0y6ziyjabvozdd253nd",
//         "timestamp": 1467166872634,
//         "title": "Udacity is the best place to learn React",
//         "body": "Everyone says so after all.",
//         "author": "thingtwo",
//         "category": "react",
//         "voteScore": 6,
//         "deleted": false
//     },
//     {
//         "id": "6ni6ok3ym7mf1p33lnez",
//         "timestamp": 1468479767190,
//         "title": "Learn Redux in 10 minutes!",
//         "body": "Just kidding. It takes more than 10 minutes to learn technology.",
//         "author": "thingone",
//         "category": "redux",
//         "voteScore": -5,
//         "deleted": false
//     }
// ]

// const initCategoriesState = {
//     "categories": [
//         {
//             "name": "react",
//             "path": "react"
//         },
//         {
//             "name": "redux",
//             "path": "redux"
//         },
//         {
//             "name": "udacity",
//             "path": "udacity"
//         }
//     ]
// }

// function posts(state = [], action) {

//   switch(action.type) {
//     case REQUEST_CATEGORIES:
//       return {
//         ...state,

//       }
//     case RECEIVE_CATEGORIES:
//       return {
//         ...state,
//         posts: initPostsState
//       }
//     default:
//       return state
//   }
// }

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

export default combineReducers({
  posts,
  categories,
  postsFilter
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
