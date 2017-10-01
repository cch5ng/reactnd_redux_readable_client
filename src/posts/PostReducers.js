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
    case REQUEST_POSTS:
      return {
        ...state,
        retrievingAllPosts: action.retrieving
      }
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
        allIds,
        retrievingAllPosts: false
      }
    case REQUEST_POST_CREATE:
      return {
        ...state,
        retrievingCreatePost: true
      }
    case RECEIVE_POST_CREATE:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        },
        allIds: state.allIds.concat([action.post.id]),
        retrievingCreatePost: false
      }
    case REQUEST_POST_EDIT:
      return {
        ...state,
        retrievingPost: true
      }
    case RECEIVE_POST_EDIT:
      return {
        ...state,
        posts: {...state.posts, 
          [action.post.id]: action.post
        },
        retrievingPost: false
      }
    case RECEIVE_POST_DELETE:
      return {
        ...state,
        allIds: state.allIds.filter(id => id !== action.deletedPostId),
        posts: {
          ...state.posts,
          [action.deletedPostId]: {...state.posts[action.deletedPostId],
            deleted: true
          } 
        },
        retrievingDeletePost: action.retrievingDeletePost
      }
    case REQUEST_POST_DELETE:
      return {
        ...state,
        retrievingDeletePost: action.retrievingDeletePost
      }
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
