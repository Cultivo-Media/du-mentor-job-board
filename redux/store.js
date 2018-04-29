import { createStore } from 'redux';
import withRedux from 'next-redux-wrapper';

import rootReducer from './reducers';

const makeStore = initialState => createStore(rootReducer, initialState);

const Page = ({ children }) => children;

export default withRedux(makeStore, {})(Page);
