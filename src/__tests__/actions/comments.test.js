import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import { fetchComments, fetchCommentCreate, fetchCommentEdit, fetchCommentDelete,
  updateCommentVote, REQUEST_COMMENTS, RECEIVE_COMMENTS, REQUEST_COMMENT_CREATE, RECEIVE_COMMENT_CREATE,
  REQUEST_COMMENT_EDIT, RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_DELETE, 
  RECEIVE_COMMENT_DELETE, REQUEST_COMMENT_VOTE, RECEIVE_COMMENT_VOTE, CLEAR_COMMENT_FORM_FIELD } from '../../actions'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('comments actions', () => {
  const API_GET_COMMENTS_PREFIX = 'http://localhost:5001/posts/'
  const API_GET_COMMENTS_SUFFIX = '/comments'
  const API_COMMENTS = 'http://localhost:5001/comments'
  const POST_ID = 'post000'
  const COMMENT_DATA = {
      id: "comment000",
      body: "mmm",
      author: "mmm",
      voteScore: 9,
      timestamp: 1505422670672,
      parentId: "post000"
    }
  const COMMENT_ID = "comment000"
  const VOTE = "upVote"
  const VOTE_SCORE = 9
  let expectedActions
  let store

  afterEach(() => {
    fetchMock.restore()
  })

  it('should fetch comments', () => {
    fetchMock.get(`${API_GET_COMMENTS_PREFIX}${POST_ID}${API_GET_COMMENTS_SUFFIX}`, {
      body: {
        comments: [
          {"id":"comment000",
            "parentId":"parent000",
            "timestamp":1468166872634,
            "body":"Hi there!",
            "author":"author000",
            "voteScore":6,
            "deleted":false,
            "parentDeleted":false
          }
        ]
      }
    })

    let expectedActions = [
      {type: REQUEST_COMMENTS,
        retrieving: true
      },
      {type: RECEIVE_COMMENTS,
        comments: {
          comments: [
            {"id":"comment000",
              "parentId":"parent000",
              "timestamp":1468166872634,
              "body":"Hi there!",
              "author":"author000",
              "voteScore":6,
              "deleted":false,
              "parentDeleted":false
            }
        ]},
        retrieving: false
      }
    ]

    let store = mockStore({})
    return store.dispatch(fetchComments(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should create a comment', () => {
    fetchMock.post(API_COMMENTS, {
      body: {
        //data: {
          //comment: {
            comment: {"id":"comment000",
              "timestamp":1505422670672,
              "body":"mmm",
              "author":"mmm",
              "parentId":"post000",
              "voteScore":9,
              "deleted":false,
              "parentDeleted":false
            }
          //}
        //}
      }
    })

    fetchMock.get(`${API_GET_COMMENTS_PREFIX}${POST_ID}${API_GET_COMMENTS_SUFFIX}`, {
      body: {
        comments: [
          {"id":"comment000",
            "parentId":"parent000",
            "timestamp":1468166872634,
            "body":"Hi there!",
            "author":"author000",
            "voteScore":6,
            "deleted":false,
            "parentDeleted":false
          }
        ]
      }
    })

    let expectedActions = [
      {type: REQUEST_COMMENT_CREATE,
        retrieving: true
      },
      {type: RECEIVE_COMMENT_CREATE,
        comment: {
          comment:{"id":"comment000",
            "timestamp":1505422670672,
            "body":"mmm",
            "author":"mmm",
            "parentId":"post000",
            "voteScore":9,
            "deleted":false,
            "parentDeleted":false
          }
        },
        retrieving: false
      },
      {
        type: CLEAR_COMMENT_FORM_FIELD
      },
      {type: REQUEST_COMMENTS,
        retrieving: true
      }
    ]

    let store = mockStore({})

    return store.dispatch(fetchCommentCreate(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should update a comment', () => {
    fetchMock.put(`${API_COMMENTS}/${COMMENT_ID}`, {
      body: {
        //data: {
          //comment: {
            comment: {"id":"comment000",
              "timestamp":null,
              "body":"mmm",
              "author":"mmm",
              "parentId":"post000",
              "voteScore":9,
              "deleted":false,
              "parentDeleted":false
            }
          //}
        //}
      }
    })

    fetchMock.get(`${API_GET_COMMENTS_PREFIX}${POST_ID}${API_GET_COMMENTS_SUFFIX}`, {
      body: {
        comments: [
          {"id":"comment000",
            "parentId":"parent000",
            "timestamp":1468166872634,
            "body":"Hi there!",
            "author":"author000",
            "voteScore":6,
            "deleted":false,
            "parentDeleted":false
          }
        ]
      }
    })

    expectedActions = [
      {type: REQUEST_COMMENT_EDIT,
        retrieving: true
      },
      {type: RECEIVE_COMMENT_EDIT,
        comment: {
          comment:{"id":"comment000",
            "timestamp":null,
            "body":"mmm",
            "author":"mmm",
            "parentId":"post000",
            "voteScore":9,
            "deleted":false,
            "parentDeleted":false
          }
        },
        retrieving: false
      },
      {
        type: CLEAR_COMMENT_FORM_FIELD
      },
      {type: REQUEST_COMMENTS,
        retrieving: true
      }
    ]

    store = mockStore({})

    return store.dispatch(fetchCommentEdit(COMMENT_ID, COMMENT_DATA))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })

        console.log('actions.length: ' + actions.length)
        console.log('keys actions[0]: ' + Object.keys(actions[0]))
        console.log('actions[0].type: ' + actions[0].type)
        console.log('actions[0].retrieving: ' + actions[0].retrieving)
        console.log('keys actions[1]: ' + Object.keys(actions[1]))
        console.log('actions[1].comment: ' + actions[1].comment)
        console.log('keys actions[1].comment: ' + Object.keys(actions[1].comment))
        console.log('keys actions[2]: ' + Object.keys(actions[2]))
        console.log('actions[2].type: ' + actions[2].type)
        console.log('keys actions[3]: ' + Object.keys(actions[3]))
        console.log('actions[3].type: ' + actions[3].type)
        console.log('actions[3].retrieving: ' + actions[3].retrieving)

        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should delete a comment', () => {
    fetchMock.delete(`${API_COMMENTS}/${COMMENT_ID}`, {
      body: {
        data: {
          comment: {
            comment: {"id":"comment000",
              "timestamp":null,
              "body":"nnn",
              "author":"mmm",
              "parentId":"post000",
              "voteScore":9,
              "deleted":true,
              "parentDeleted":false
            }
          }
        }
      }
    })

    expectedActions = [
      {type: REQUEST_COMMENT_DELETE},
      {type: RECEIVE_COMMENT_DELETE,
        comment:{"id":"comment000",
          "timestamp":null,
          "body":"mmm",
          "author":"mmm",
          "parentId":"post000",
          "voteScore":9,
          "deleted":true,
          "parentDeleted":false
        }
      }
    ]

    store = mockStore({})

    return store.dispatch(fetchCommentDelete(COMMENT_ID, POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
        expect(actions).to.deep.equal(expectedActions)
      })

  })

  it('should update a comment vote', () => {
    fetchMock.post(`${API_COMMENTS}/${COMMENT_ID}`, {
      body: {
        data: {
          comment: {
            comment: {"id":"comment000",
              "timestamp":null,
              "body":"nnn",
              "author":"mmm",
              "parentId":"post000",
              "voteScore": VOTE_SCORE + 1,
              "deleted":true,
              "parentDeleted":false
            }
          }
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
              "body":"nnn",
              "author":"mmm",
              "parentId":"post000",
              "voteScore": VOTE_SCORE + 1,
              "deleted":true,
              "parentDeleted":false
            }
            ]
          }
        }
      }
    })


    expectedActions = [
      {type: REQUEST_COMMENT_VOTE},
      {type: RECEIVE_COMMENT_VOTE,
        comment:{"id":"comment000",
          "timestamp":null,
          "body":"mmm",
          "author":"mmm",
          "parentId":"post000",
          "voteScore": VOTE_SCORE,
          "deleted":true,
          "parentDeleted":false
        }
      }
    ]

    store = mockStore({})

    return store.dispatch(updateCommentVote(COMMENT_ID, POST_ID, VOTE))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
        // console.log('actions: ' + actions)
        // console.log('keys actions: ' + Object.keys(actions))
        // console.log('actions[0]: ' + Object.keys(actions[0]))
        expect(actions).to.deep.equal(expectedActions)
      })

      //expect({}).to.deep.equal(expectedActions)
      //expect(actions).to.eql({})
      //expect(actions).toEqual(expectedActions)
  })

})
