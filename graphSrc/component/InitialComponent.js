import React, {
  Component,
} from 'react';
import {
  View,
  Button
} from 'react-native';

import { data} from '../Datas'
import Graph from './Graph'

export default class InitialComponent extends Component {
  render() {
    return (
      <View>
        <Graph data={data} />
      </View>
    );
  }
}