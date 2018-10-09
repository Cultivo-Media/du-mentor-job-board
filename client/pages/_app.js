import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import configureStore from '../redux/store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '_es_NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return configureStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const withRedux = AppComponent => class AppWithRedux extends React.Component {
  static propTypes = {
    initialReduxState: PropTypes.object // eslint-disable-line
  }

  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const reduxStore = getOrCreateStore();

    // Provide the store to getInitialProps of pages
    appContext.ctx.reduxStore = reduxStore; // eslint-disable-line

    let appProps = {};
    if (typeof App.getInitialProps === 'function') {
      appProps = await App.getInitialProps.call(App, appContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <AppComponent {...this.props} reduxStore={this.reduxStore} />;
  }
};

class AppWrapper extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>DU Mentor Job Board</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(AppWrapper);
