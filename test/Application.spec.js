import React from 'react';

import { shallow, mount, render } from 'enzyme';
import { assert, expect } from 'chai';
import sinon from 'sinon';

import Application from '../lib/components/Application';
import InputSection from '../lib/components/InputSection';

describe('Application', () => {

  it('renders as a <section>', () => {
    const wrapper = shallow(<Application />)
    assert.equal(wrapper.type(), 'section');
  });

  it('should have a state of messages that is an empty array', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().messages).to.deep.equal([]);
  })

  it('should have a state of user that is null', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().user).to.equal(null);

  });

  it('should have a state of allUsers that is null', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().allUsers).to.equal(null);

  });

  it('should have a state of allEmails that is null', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().allEmails).to.equal(null);

  });

  it('should have a state of userMessages that is null', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().userMessages).to.equal(null);

  });

  it('should have a state of reverse that is false', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().reverse).to.equal(false);

  });

  it('should have a state of userInput that is null', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().userInput).to.equal(null);

  });

  it('should have a state of filterMessages that is an empty array', () => {
    const wrapper = shallow(<Application />)
    expect(wrapper.state().filterMessages).to.deep.equal([]);

  });

});

describe('InputSection', () => {

  it('should render <article/>', () => {
    const wrapper = shallow(<InputSection />)
    assert.equal(wrapper.type(), 'article')
  })

  it('should have a state of currentMessage that is an empty string', () => {
    const wrapper = shallow(<InputSection />)
    expect(wrapper.state().currentMessage).to.equal('');
  });

  it('should have a state of disabled that is true', () => {
    const wrapper = shallow(<InputSection />)
    expect(wrapper.state().disabled).to.equal(true);
  });

  // it('should change message state on onChange', () => {
  //   const onChange = sinon.spy();
  //   const wrapper = mount(<InputSection onChange={onChange}/>);
  //   const input = wrapper.find('input');
  //   input.simulate('onChange', {keyCode: 40});
  //   expect(onChange.called).to.be.true;
  // })

  
});

// currentMessage: '',
// disabled: true,
