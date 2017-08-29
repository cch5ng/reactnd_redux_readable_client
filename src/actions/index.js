
// TO DELETE for testing
const categories = [
    {
        "name": "react",
        "path": "react"
    },
    {
        "name": "redux",
        "path": "redux"
    },
    {
        "name": "udacity",
        "path": "udacity"
    }
]

const posts = [
    {
        "id": "8xf0y6ziyjabvozdd253nd",
        "timestamp": 1467166872634,
        "title": "Udacity is the best place to learn React",
        "body": "Everyone says so after all.",
        "author": "thingtwo",
        "category": "react",
        "voteScore": 6,
        "deleted": false
    },
    {
        "id": "6ni6ok3ym7mf1p33lnez",
        "timestamp": 1468479767190,
        "title": "Learn Redux in 10 minutes!",
        "body": "Just kidding. It takes more than 10 minutes to learn technology.",
        "author": "thingone",
        "category": "redux",
        "voteScore": -5,
        "deleted": false
    }
]
// END TO DELETE

const API_GET_CATEGORIES = 'http://localhost:5001/categories'
const API_GET_POSTS = 'http://localhost:5001/posts'
let mHeaders = new Headers();
mHeaders.append('Authorization', 'mAuth')
const INIT_GET_CATEGORIES = {method: 'GET',
                              headers: mHeaders
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
    .then(json => dispatch(receivePosts(json)))
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
  console.log(`${API_GET_POST_DETAIL}${postId}`)
  return fetch(`${API_GET_POST_DETAIL}${postId}`, INIT_GET_CATEGORIES)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receivePostDetail(json)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

