import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import { fetchPosts, fetchPostDetail, fetchPostCreate, fetchPostEdit, fetchPostDelete, updatePostVote, 
  REQUEST_POSTS, RECEIVE_POSTS, REQUEST_POST_VOTE, RECEIVE_POST_VOTE, REQUEST_POST_CREATE,
  RECEIVE_POST_CREATE, REQUEST_POST_EDIT, RECEIVE_POST_EDIT, REQUEST_POST_DELETE, RECEIVE_POST_DELETE,
  REQUEST_POST_DETAIL, RECEIVE_POST_DETAIL, CLEAR_POST_FORM_FIELD } from '../../actions'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
const API_GET_POSTS = 'http://localhost:5001/posts'
const INIT_GET_CATEGORIES = {method: 'GET',
                              headers: {
                                'Authorization': 'mAuth'
                              }
                            }
const API_GET_POST_DETAIL = 'http://localhost:5001/posts/'

describe('posts actions', () => {
  const POST_ID = 'post000'
  const POST_DATA = {title: "www", 
    body: "www",
    author: "www",
    category: "udacity",
    voteScore: 0,
    timestamp: 1505509052933
  }
  const VOTE = "upVote"
  const VOTE_SCORE = 9

  afterEach(() => {
    fetchMock.restore()
  })

  it('should fetch all posts', () => {
    fetchMock.get(`${API_GET_POSTS}`, {
      body: {
        posts: [
          {"id":"post000",
          "timestamp":1467166872634,
          "title":"post 1",
          "body":"body 1",
          "author":"auth 1",
          "category":"react",
          "voteScore":6,
          "deleted":false},

          {"id":"post001",
          "timestamp":1468479767190,
          "title":"post 2",
          "body":"body 2",
          "author":"auth2",
          "category":"redux",
          "voteScore":-4,
          "deleted":false}
        ]
      }
    })

    let expectedActions = [
      {type: REQUEST_POSTS,
        retrieving: true
      },
      {type: RECEIVE_POSTS,
        posts: {
          posts: [
            {"id":"post000",
            "timestamp":1467166872634,
            "title":"post 1",
            "body":"body 1",
            "author":"auth 1",
            "category":"react",
            "voteScore":6,
            "deleted":false},

            {"id":"post001",
            "timestamp":1468479767190,
            "title":"post 2",
            "body":"body 2",
            "author":"auth2",
            "category":"redux",
            "voteScore":-4,
            "deleted":false}
          ]
        },
        retrieving: false
      }
    ]

    let store = mockStore({})
    return store.dispatch(fetchPosts())
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should fetch one post', () => {
    fetchMock.get(`${API_GET_POSTS}/${POST_ID}`, {
      body: {
        postDetail: {"id":"post000",
          "timestamp":1467166872634,
          "title":"post 1",
          "body":"body 1",
          "author":"auth 1",
          "category":"react",
          "voteScore":6,
          "deleted":false
        }
      }
    })

    let expectedActions = [
      {type: REQUEST_POST_DETAIL,
        retrieving: true
      },
      {type: RECEIVE_POST_DETAIL,
        postDetail: {
          postDetail: {"id":"post000",
            "timestamp":1467166872634,
            "title":"post 1",
            "body":"body 1",
            "author":"auth 1",
            "category":"react",
            "voteScore":6,
            "deleted":false
          }
        },
        retrieving: false
      }
    ]

    let store = mockStore({})
    return store.dispatch(fetchPostDetail(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should create a post', () => {
    fetchMock.post(API_GET_POSTS, {
      body: {
        post: {title: "www",
          body: "www",
          author: "www",
          category: "udacity",
          voteScore: 0,
          timestamp: 1505509052933,
          id: "post002"
        }
      }
    })

    fetchMock.get(`${API_GET_POSTS}`, {
      body: {
        posts: [
          {"id":"post000",
          "timestamp":1467166872634,
          "title":"post 1",
          "body":"body 1",
          "author":"auth 1",
          "category":"react",
          "voteScore":6,
          "deleted":false},

          {"id":"post001",
          "timestamp":1468479767190,
          "title":"post 2",
          "body":"body 2",
          "author":"auth2",
          "category":"redux",
          "voteScore":-4,
          "deleted":false}
        ]
      }
    })
    let expectedActions = [
      {type: REQUEST_POST_CREATE,
        retrieving: true
      },
      {type: RECEIVE_POST_CREATE,
        post: {
          post: {title: "www",
            body: "www",
            author: "www",
            category: "udacity",
            voteScore: 0,
            timestamp: 1505509052933,
            id: "post002"
          }
        },
        retrieving: false
      },
      {
        type: CLEAR_POST_FORM_FIELD
      }
    ]

    let store = mockStore({})

    return store.dispatch(fetchPostCreate(POST_DATA))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should update a post', () => {
    fetchMock.put(`${API_GET_POSTS}/${POST_ID}`, {
      body: {
        post: {"id":"post002",
          "title": "www",
          "body": "www",
          "author": "www", 
          "category": "udacity", 
          "voteScore": 5, 
          "timestamp": null,
          "deleted":false
        }
      }
    })

    fetchMock.get(`${API_GET_POSTS}`, {
      body: {
        posts: [
          {"id":"post000",
          "timestamp":1467166872634,
          "title":"post 1",
          "body":"body 1",
          "author":"auth 1",
          "category":"react",
          "voteScore":6,
          "deleted":false},

          {"id":"post001",
          "timestamp":1468479767190,
          "title":"post 2",
          "body":"body 2",
          "author":"auth2",
          "category":"redux",
          "voteScore":-4,
          "deleted":false}
        ]
      }
    })

    let expectedActions = [
      {type: REQUEST_POST_EDIT,
        retrieving: true
      },
      {type: RECEIVE_POST_EDIT,
        post: {
          post: {"id":"post002",
            "title": "www",
            "body": "www",
            "author": "www", 
            "category": "udacity", 
            "voteScore": 5, 
            "timestamp": null,
            "deleted":false
          }
        },
        retrieving: false
      },
      {
        type: CLEAR_POST_FORM_FIELD
      }
    ]

    let store = mockStore({})

    return store.dispatch(fetchPostEdit(POST_ID, POST_DATA))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should delete a post', () => {
    fetchMock.delete(`${API_GET_POSTS}/${POST_ID}`, {
    })

    fetchMock.get(`${API_GET_POSTS}`, {
      body: {
        posts: [
          {"id":"post000",
          "timestamp":1467166872634,
          "title":"post 1",
          "body":"body 1",
          "author":"auth 1",
          "category":"react",
          "voteScore":6,
          "deleted":false},

          {"id":"post001",
          "timestamp":1468479767190,
          "title":"post 2",
          "body":"body 2",
          "author":"auth2",
          "category":"redux",
          "voteScore":-4,
          "deleted":false}
        ]
      }
    })

    let expectedActions = [
      {type: REQUEST_POST_DELETE,
        retrieving: true
      },
      {type: RECEIVE_POST_DELETE,
        retrieving: false
      },
      {type: REQUEST_POSTS,
        retrieving: true
      },
      {type: RECEIVE_POSTS,
        posts: {
          posts: [
            {"id":"post000",
            "timestamp":1467166872634,
            "title":"post 1",
            "body":"body 1",
            "author":"auth 1",
            "category":"react",
            "voteScore":6,
            "deleted":false},

            {"id":"post001",
            "timestamp":1468479767190,
            "title":"post 2",
            "body":"body 2",
            "author":"auth2",
            "category":"redux",
            "voteScore":-4,
            "deleted":false}
          ]
        },
        retrieving: false
      }
    ]

    let store = mockStore({})

    return store.dispatch(fetchPostDelete(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it.skip('should update a comment vote', () => {
    fetchMock.post(`${API_COMMENTS}/${COMMENT_ID}`, {
      body: {
        comment: {"id":"comment000",
          "timestamp":null,
          "body":"mmm",
          "author":"mmm",
          "parentId":"post000",
          "voteScore": VOTE_SCORE + 1,
          "deleted":false,
          "parentDeleted":false
        }
      }
    })

    fetchMock.get(`${API_GET_COMMENTS_PREFIX}${POST_ID}${API_GET_COMMENTS_SUFFIX}`, {
      body: {
        data: {
          comments: {
            comments: [
              {"id":"comment000",
              "timestamp":null,
              "body":"mmm",
              "author":"mmm",
              "parentId":"post000",
              "voteScore": VOTE_SCORE + 1,
              "deleted":false,
              "parentDeleted":false
            }
            ]
          }
        }
      }
    })


    let expectedActions = [
      {type: REQUEST_COMMENT_VOTE,
        retrieving: true
      },
      {type: RECEIVE_COMMENT_VOTE,
        comment: {
          comment:{"id":"comment000",
            "timestamp":null,
            "body":"mmm",
            "author":"mmm",
            "parentId":"post000",
            "voteScore": VOTE_SCORE + 1,
            "deleted":false,
            "parentDeleted":false
          }
        },
        retrieving: false
      },
      {type: REQUEST_COMMENTS,
        retrieving: true
      }
    ]

    let store = mockStore({})

    return store.dispatch(updateCommentVote(COMMENT_ID, POST_ID, VOTE))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

})
