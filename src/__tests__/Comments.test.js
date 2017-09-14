import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer'
import { Comments } from '../components/Comments';

it.skip('renders without crashing', () => {
  const comments = {
    comments: {}
  }

  const commentsSort = {
    sortKey: "voteScore",
    sortOrderDesc: true
  }

  var tree = renderer.create(<Comments comments={comments} commentsSort={commentsSort} />).toJSON();
  expect(tree).toMatchSnapshot()
});