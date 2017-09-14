import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchCategories, REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../../actions'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

describe('categories actions', () => {
  const API_GET_CATEGORIES = 'http://localhost:5001/categories'

  afterEach(() => {
    fetchMock.restore()
  })

  it('should fetch categories', () => {
    fetchMock.get(API_GET_CATEGORIES, {
      body: {
        data: {
          categories: {
            categories: [
              {"name":"react","path":"react"},
              {"name":"redux","path":"redux"},
              {"name":"udacity","path":"udacity"}
            ]
          }
        }
      }
    })

    const expectedActions = [
      {type: REQUEST_CATEGORIES},
      {type: RECEIVE_CATEGORIES,
        categories: [
          {"name":"react","path":"react"},
          {"name":"redux","path":"redux"},
          {"name":"udacity","path":"udacity"}
        ]
      }
    ]

    const store = mockStore({})
    return store.dispatch(fetchCategories())
      .then(() => {
        const actions = store.getActions().map((action, index) => {
          return action;
        })
      })

      expect(actions).toEqual(expectedActions)
  })

})
