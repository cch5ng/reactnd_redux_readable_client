import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchComments, fetchCommentCreate, fetchCommentEdit, fetchCommentDelete,
  updateCommentVote, REQUEST_COMMENTS, RECEIVE_COMMENTS, REQUEST_COMMENT_CREATE, RECEIVE_COMMENT_CREATE,
  REQUEST_COMMENT_EDIT, RECEIVE_COMMENT_EDIT, REQUEST_COMMENT_DELETE, 
  RECEIVE_COMMENT_DELETE, REQUEST_COMMENT_VOTE, RECEIVE_COMMENT_VOTE } from '../../actions'

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

  afterEach(() => {
    fetchMock.restore()
  })

  it('should fetch comments', () => {
    fetchMock.get(`${API_GET_COMMENTS_PREFIX}${POST_ID}${API_GET_COMMENTS_SUFFIX}`, {
      body: {
        data: {
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
            ]
          }
        }
      }
    })

    const expectedActions = [
      {type: REQUEST_COMMENTS},
      {type: RECEIVE_COMMENTS,
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
    ]

    const store = mockStore({})
    return store.dispatch(fetchComments(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
      })

      expect(actions).toEqual(expectedActions)
  })

  it('should create a comment', () => {
    fetchMock.post(API_COMMENTS, {
      body: {
        data: {
          comment: {
            comment: {"id":"comment000",
              "timestamp":1505422670672,
              "body":"mmm",
              "author":"mmm",
              "parentId":"post000",
              "voteScore":9,
              "deleted":false,
              "parentDeleted":false
            }
          }
        }
      }
    })

    const expectedActions = [
      {type: REQUEST_COMMENT_CREATE},
      {type: RECEIVE_COMMENT_CREATE,
        comment:{"id":"comment000",
          "timestamp":1505422670672,
          "body":"mmm",
          "author":"mmm",
          "parentId":"post000",
          "voteScore":9,
          "deleted":false,
          "parentDeleted":false
        }
      }
    ]

    const store = mockStore({})
    // const COMMENT_DATA = {
    //     id: "comment000",
    //     body: "mmm",
    //     author: "mmm",
    //     voteScore: 9,
    //     timestamp: 1505422670672,
    //     parentId: "post000"
    //   }


    return store.dispatch(fetchCommentCreate(POST_ID))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
      })

      expect(actions).toEqual(expectedActions)
  })


  it('should update a comment', () => {
    fetchMock.put(`${API_COMMENTS}/${COMMENT_ID}`, {
      body: {
        data: {
          comment: {
            comment: {"id":"comment000",
              "timestamp":null,
              "body":"mmm",
              "author":"mmm",
              "parentId":"post000",
              "voteScore":9,
              "deleted":false,
              "parentDeleted":false
            }
          }
        }
      }
    })

    const expectedActions = [
      {type: REQUEST_COMMENT_CREATE},
      {type: RECEIVE_COMMENT_CREATE,
        comment:{"id":"comment000",
          "timestamp":null,
          "body":"mmm",
          "author":"mmm",
          "parentId":"post000",
          "voteScore":9,
          "deleted":false,
          "parentDeleted":false
        }
      }
    ]

    const store = mockStore({})

    return store.dispatch(fetchCommentEdit(COMMENT_ID, COMMENT_DATA))
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
      })

      expect(actions).toEqual(expectedActions)
  })

})
