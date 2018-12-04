import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './graphSrc/store/Store';

import  InitialComponent from './graphSrc/component/InitialComponent'


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InitialComponent />
      </Provider>
    );
  }
}
