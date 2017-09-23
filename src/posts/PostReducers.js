import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES, REQUEST_POSTS, RECEIVE_POSTS, 
  FILTER_POSTS, SORT_POSTS, REQUEST_POST_VOTE, RECEIVE_POST_VOTE, REQUEST_POST_DELETE,
  RECEIVE_POST_DELETE, REQUEST_POST_CREATE, RECEIVE_POST_CREATE, REQUEST_POST_EDIT,
  RECEIVE_POST_EDIT, REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL } from '../posts/PostActions'

export function categories(state = {}, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      let categoriesObj = {}
      let allIds = []
      action.categories.forEach(categ => {
        categoriesObj[categ.name] = categ
        allIds.push(categ.name)
      })

      return {
        ...state,
        categories: categoriesObj,
        allIds
      }
    case REQUEST_CATEGORIES:
    default:
      return state
  }
}

export function posts(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      let postsObj = {}
      let allIds = []
      action.posts.forEach(post => {
        postsObj[post.id] = post
        allIds.push(post.id)
      })

      return {
        ...state,
        posts: postsObj,
        allIds
      }
    case REQUEST_POSTS:
    default:
      return state
  }
}

export function postsFilter(state = { filter: 'all' }, action) {
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

export function postsSort(state = { sortKey: 'voteScore', sortOrderDesc: true }, action) {
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

export function postDetail(state = {}, action) {
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

export function postCreate(state = {}, action) {
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

export function postEdit(state = {}, action) {
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

export function postDelete(state = {}, action) {
  switch(action.type) {
    case RECEIVE_POST_DELETE:
    case REQUEST_POST_DELETE:
    default:
      return state
  }
}

export function postVote(state = {}, action) {

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
