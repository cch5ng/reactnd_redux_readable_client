import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer'
import { PostDetail } from '../components/PostDetail';
import { Comments } from '../components/Comments';

it.skip('renders without crashing', () => {
  //const div = document.createElement('div');
  //const renderer = new ReactShallowRenderer()
  //renderer.render(<App />, div)
  //const result = renderer.getRenderOutput()

  const postDetail= {
    postDetail: {}
  }

  const match= {
    params: {
      id: "id"
    }
  }

  const comments = {
    comments: {}
  }

  var tree = renderer.create(<PostDetail postDetail={postDetail} match={match} >
    <Comments comments={comments} />
  </PostDetail>).toJSON();

  expect(tree).toMatchSnapshot()
//  const app = shallow(<App />)
//  ReactDOM.render(<App />, div);
});