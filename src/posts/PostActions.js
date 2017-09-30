import { fetchComments } from '../comments/CommentActions'

const API_GET_CATEGORIES = 'http://localhost:5001/categories'
const API_GET_POSTS = 'http://localhost:5001/posts'
const INIT_GET_CATEGORIES = {method: 'GET',
                              headers: {
                                'Authorization': 'mAuth'
                              }
                            }
const API_GET_POST_DETAIL = 'http://localhost:5001/posts/'


// sync actions for getting categories
export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function requestCategories() {
  return {
    type: REQUEST_CATEGORIES,
    retrieving: true
  }
}

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
    retrieving: false
  }
}

// async action for getting categories
export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return fetch(API_GET_CATEGORIES, INIT_GET_CATEGORIES)
    .then(response => response.json())
    // use json.categories to make the data more shallow
    .then(json => dispatch(receiveCategories(json.categories)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

// TEST section for Posts actions
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function requestPosts() {
  return {
    type: REQUEST_POSTS,
    retrieving: true
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
    retrieving: false
  }
}

// async action for getting posts
export const fetchPosts = () => dispatch => {
  dispatch(requestPosts())
  return fetch(API_GET_POSTS, INIT_GET_CATEGORIES)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => {
      dispatch(receivePosts(json))
      // need make multiple calls to get the comments list per postId
      let allIds = []
      json.forEach(post => {
        allIds.push(post.id)
      })
      allIds.forEach(postId => {
        dispatch(fetchComments(postId))
      }) 
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// TEST section for Post vote actions
export const REQUEST_POST_VOTE = 'REQUEST_POST_VOTE'
export const RECEIVE_POST_VOTE = 'RECEIVE_POST_VOTE'

export function requestPostVote() {
  return {
    type: REQUEST_POST_VOTE,
    retrieving: true
  }
}

export function receivePostVote(post) {
  return {
    type: RECEIVE_POST_VOTE,
    post,
    retrieving: false

  }
}

// async action for getting posts
export const updatePostVote = (postId, option) => dispatch => {
  dispatch(requestPostVote())
  let INIT_UPDATE_POSTS = {method: 'POST',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify({ option })
                        }
  return fetch(`${API_GET_POSTS}/${postId}`, INIT_UPDATE_POSTS)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => {
      dispatch(receivePostVote(json))
      dispatch(fetchPosts())
      dispatch(fetchPostDetail(postId))
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// TEST section for create Post action
export const REQUEST_POST_CREATE = 'REQUEST_POST_CREATE'
export const RECEIVE_POST_CREATE = 'RECEIVE_POST_CREATE'

export function requestPostCreate() {
  return {
    type: REQUEST_POST_CREATE,
    retrieving: true
  }
}

export function receivePostCreate(post) {
  return {
    type: RECEIVE_POST_CREATE,
    post,
    retrieving: false
  }
}

// async action for getting posts
export const fetchPostCreate = (postData) => dispatch => {
  dispatch(requestPostCreate())
  let INIT_CREATE_POST = {method: 'POST',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify(postData)
                        }

  return fetch(API_GET_POSTS, INIT_CREATE_POST)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receivePostCreate(json)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// section for edit Post action
export const REQUEST_POST_EDIT = 'REQUEST_POST_EDIT'
export const RECEIVE_POST_EDIT = 'RECEIVE_POST_EDIT'

export function requestPostEdit() {
  return {
    type: REQUEST_POST_EDIT,
    retrieving: true
  }
}

export function receivePostEdit(post) {
  return {
    type: RECEIVE_POST_EDIT,
    post,
    retrieving: false
  }
}

// async action for editing a post
export const fetchPostEdit = (postId, postData) => dispatch => {
  dispatch(requestPostEdit())
  let INIT_EDIT_POST = {method: 'PUT',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify(postData)
                        }

  return fetch(`${API_GET_POSTS}/${postId}`, INIT_EDIT_POST)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receivePostEdit(json)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

//////

// section for delete Post action
export const REQUEST_POST_DELETE = 'REQUEST_POST_DELETE'
export const RECEIVE_POST_DELETE = 'RECEIVE_POST_DELETE'

export function requestPostDelete() {
  return {
    type: REQUEST_POST_DELETE,
    retrievingDeletePost: true
  }
}

export function receivePostDelete(postId) {
  return {
    type: RECEIVE_POST_DELETE,
    retrievingDeletePost: false,
    deletedPostId: postId
  }
}

// async action for editing a post
export const fetchPostDelete = (postId) => dispatch => {
  dispatch(requestPostDelete())
  let INIT_EDIT_POST = {method: 'DELETE',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          }
                        }

  return fetch(`${API_GET_POSTS}/${postId}`, INIT_EDIT_POST)
    .then(() => dispatch(receivePostDelete(postId)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

// TEST section for setting postsFilter
export const FILTER_POSTS = 'FILTER_POSTS'

export function filterPosts(filter) {
  return {
    type: FILTER_POSTS,
    filter 
  }
}

// TEST section for setting postsSortBy
export const SORT_POSTS = 'SORT_POSTS'

export function sortPosts(sortKey) {
  return {
    type: SORT_POSTS,
    sortKey 
  }
}

////////

// TEST section for Post Detail actions
export const REQUEST_POST_DETAIL = 'REQUEST_POST_DETAIL'
export const RECEIVE_POST_DETAIL = 'RECEIVE_POST_DETAIL'

export function requestPostDetail() {
  return {
    type: REQUEST_POST_DETAIL,
    retrieving: true
  }
}

export function receivePostDetail(postDetail) {
  return {
    type: RECEIVE_POST_DETAIL,
    postDetail,
    retrieving: false
  }
}

// async action for getting posts
export const fetchPostDetail = (postId) => dispatch => {
  dispatch(requestPostDetail())
  return fetch(`${API_GET_POST_DETAIL}${postId}`, INIT_GET_CATEGORIES)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receivePostDetail(json)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}
