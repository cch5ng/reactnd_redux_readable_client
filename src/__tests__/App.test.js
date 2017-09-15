import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer'
import {App} from '../App';

it.skip('renders without crashing', () => {
  //const div = document.createElement('div');
  //const renderer = new ReactShallowRenderer()
  //renderer.render(<App />, div)
  //const result = renderer.getRenderOutput()

  var tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot()
//  const app = shallow(<App />)
//  ReactDOM.render(<App />, div);
});
