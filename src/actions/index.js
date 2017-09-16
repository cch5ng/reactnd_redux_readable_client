const API_GET_CATEGORIES = 'http://localhost:5001/categories'
const API_GET_POSTS = 'http://localhost:5001/posts'
const INIT_GET_CATEGORIES = {method: 'GET',
                              headers: {
                                'Authorization': 'mAuth'
                              }
                            }
const API_GET_POST_DETAIL = 'http://localhost:5001/posts/'
const API_GET_COMMENTS_PREFIX = 'http://localhost:5001/posts/'
const API_GET_COMMENTS_SUFFIX = '/comments'
const API_COMMENTS = 'http://localhost:5001/comments'

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
    retrieving: true
  }
}

export function receivePostDelete() {
  return {
    type: RECEIVE_POST_DELETE,
    retrieving: false
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
    .then(() => dispatch(receivePostDelete()))
    .then(() => dispatch(fetchPosts()))
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

/////

// section for Comments (by post id) actions
export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export function requestComments() {
  return {
    type: REQUEST_COMMENTS,
    retrieving: true
  }
}

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
    retrieving: false

  }
}

// async action for getting comments
export const fetchComments = (postId) => dispatch => {
  dispatch(requestComments())
  return fetch(`${API_GET_COMMENTS_PREFIX}${postId}${API_GET_COMMENTS_SUFFIX}`, INIT_GET_CATEGORIES)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receiveComments(json)))
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

// section for setting commentsSortBy
export const SORT_COMMENTS = 'SORT_COMMENTS'

export function sortComments(sortKey) {
  return {
    type: SORT_COMMENTS,
    sortKey
  }
}

/////

// section for create Comment action
export const REQUEST_COMMENT_CREATE = 'REQUEST_COMMENT_CREATE'
export const RECEIVE_COMMENT_CREATE = 'RECEIVE_COMMENT_CREATE'

export function requestCommentCreate() {
  return {
    type: REQUEST_COMMENT_CREATE,
    retrieving: true
  }
}

export function receiveCommentCreate(comment) {
  return {
    type: RECEIVE_COMMENT_CREATE,
    comment,
    retrieving: false

  }
}

// async action for getting posts
export const fetchCommentCreate = (commentData) => dispatch => {
  dispatch(requestCommentCreate())
  let INIT_CREATE_COMMENT = {method: 'POST',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify(commentData)
                        }

  return fetch(API_COMMENTS, INIT_CREATE_COMMENT)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receiveCommentCreate(json)))
    .then(() => {
      dispatch(clearCommentFormField())
    })
    .then(() => {
      dispatch(fetchComments(commentData.parentId))
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// section for edit Comment action
export const REQUEST_COMMENT_EDIT = 'REQUEST_COMMENT_EDIT'
export const RECEIVE_COMMENT_EDIT = 'RECEIVE_COMMENT_EDIT'

export function requestCommentEdit() {
  return {
    type: REQUEST_COMMENT_EDIT,
    retrieving: true
  }
}

export function receiveCommentEdit(comment) {
  return {
    type: RECEIVE_COMMENT_EDIT,
    comment,
    retrieving: false
  }
}

// async action for getting posts
export const fetchCommentEdit = (commentId, commentData) => dispatch => {
  dispatch(requestCommentEdit())
  let INIT_CREATE_COMMENT = {method: 'PUT',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify(commentData)
                        }

  return fetch(`${API_COMMENTS}/${commentId}`, INIT_CREATE_COMMENT)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => dispatch(receiveCommentEdit(json)))
    .then(() => {
      dispatch(clearCommentFormField())
    })
    .then(() => {
      dispatch(fetchComments(commentData.parentId))
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// section for delete Comment action
export const REQUEST_COMMENT_DELETE = 'REQUEST_COMMENT_DELETE'
export const RECEIVE_COMMENT_DELETE = 'RECEIVE_COMMENT_DELETE'

export function requestCommentDelete() {
  return {
    type: REQUEST_COMMENT_DELETE,
    retrieving: true
  }
}

export function receiveCommentDelete(comment) {
  return {
    type: RECEIVE_COMMENT_DELETE,
    comment,
    retrieving: false
  }
}

// async action for deleting a post
export const fetchCommentDelete = (commentId, postId) => dispatch => {
  dispatch(requestCommentDelete())
  let INIT_DELETE_POST = {method: 'DELETE',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          }
                        }

  return fetch(`${API_COMMENTS}/${commentId}`, INIT_DELETE_POST)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => {
      dispatch(receiveCommentDelete(json))
      dispatch(fetchComments(postId)) 
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

/////

// TEST section for Comment vote actions
export const REQUEST_COMMENT_VOTE = 'REQUEST_COMMENT_VOTE'
export const RECEIVE_COMMENT_VOTE = 'RECEIVE_COMMENT_VOTE'

export function requestCommentVote() {
  return {
    type: REQUEST_COMMENT_VOTE,
    retrieving: true
  }
}

export function receiveCommentVote(comment) {
  return {
    type: RECEIVE_COMMENT_VOTE,
    comment,
    retrieving: false

  }
}

// async action for getting comment vote
export const updateCommentVote = (commentId, postId, option) => dispatch => {
  dispatch(requestCommentVote())
  let INIT_VOTE_COMMENTS = {method: 'POST',
                          headers: {
                            'Authorization': 'mAuth',
                            "Content-Type": 'application/json'
                          },
                          body: JSON.stringify({ option })
                        }
  return fetch(`${API_COMMENTS}/${commentId}`, INIT_VOTE_COMMENTS)
    .then(response => response.json())
    // use json.posts to make the data more shallow
    .then(json => {
      dispatch(receiveCommentVote(json))
      dispatch(fetchComments(postId))
    })
    .catch(function(err) {
      console.log('fetch err: ' + err.message)
    })
}

////////

// section for Comment Form State actions (first try to combine state for create vs edit)
export const TOGGLE_COMMENT_FORM_ACTIVE = 'TOGGLE_COMMENT_FORM_ACTIVE'
export const SET_COMMENT_FORM_TYPE = 'SET_COMMENT_FORM_TYPE'
export const SET_CURRENT_COMMENT_ID = 'SET_CURRENT_COMMENT_ID'
export const UPDATE_COMMENT_FORM_FIELD = 'UPDATE_COMMENT_FORM_FIELD'
export const UPDATE_COMMENT_FORM_FIELD_MULTIPLE = 'UPDATE_COMMENT_FORM_FIELD_MULTIPLE'
export const CLEAR_COMMENT_FORM_FIELD = 'CLEAR_COMMENT_FORM_FIELD'

export function toggleCommentFormActive() {
  return {
    type: TOGGLE_COMMENT_FORM_ACTIVE,
  }
}

export function setCommentFormType(formType) {
  return {
    type: SET_COMMENT_FORM_TYPE,
    formType
  }
}

export function setCurrentCommentId(commentId) {
  return {
    type: SET_CURRENT_COMMENT_ID,
    commentId
  }
}

export function updateCommentFormField(fieldDataObj) {
  return {
    type: UPDATE_COMMENT_FORM_FIELD,
    ...fieldDataObj
  }
}

// used to prepopulate the form if formType is 'edit'
export function updateCommentFormFieldMultiple(fieldDataObj) {
  return {
    type: UPDATE_COMMENT_FORM_FIELD_MULTIPLE,
    ...fieldDataObj
  }
}

// // called at the end of action, fetchCommentCreate
export function clearCommentFormField() {
  return {
    type: CLEAR_COMMENT_FORM_FIELD
  }
}

