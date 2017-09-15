import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer'
import { connect } from 'react-redux'
import { PostForm } from '../components/PostForm';

it.skip('renders without crashing', () => {
  const categories = {
    categories: []
  }

  const postDetail = {
    postDetail: {}
  }

  const wrapper = shallow(<PostForm formType="create" categories={categories} postDetail={postDetail} />)
  expect(wrapper.find('form')).toHaveLength(1)
  expect(wrapper.find('input')).toHaveLength(2)

  //expect(wrapper.contains(<div className="form-container" />)).toEqual(true)
});
