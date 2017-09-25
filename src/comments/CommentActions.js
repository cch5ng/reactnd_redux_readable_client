const API_GET_COMMENTS_PREFIX = 'http://localhost:5001/posts/'
const API_GET_COMMENTS_SUFFIX = '/comments'
const API_COMMENTS = 'http://localhost:5001/comments'
const INIT_GET_CATEGORIES = {method: 'GET',
                              headers: {
                                'Authorization': 'mAuth'
                              }
                            }

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
