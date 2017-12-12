import expect from 'expect';
import courseReducers from './courseReducers';
import * as courseActions from '../actions/courseActions';
import * as types from '../actions/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Course Reducers', () => {
  it('adds course when passes COURSE_CREATE_SUCCESS', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const course = {title: 'C'};
    const action = courseActions.createCourseSuccess(course);

    const newState = courseReducers(initialState, action);

    expect(newState.length).toEqual(3);
    expect(newState[2].title).toEqual('C');
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
    // Example using nock
    // nock('http://www.example.com')
    //   .get('/courses')
    //   .reply(200, {body: {course: [{id: 1, firstName: 'Cory', lastName: 'House'}]}});

    const expectedActions = [
      {type: types.BEGIN_AJAX_CALL},
      {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
    ];

    const store = mockStore({courses: []}, expectedActions);
    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});