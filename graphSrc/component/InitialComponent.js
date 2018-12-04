import React, {
    Component,
  } from 'react';
  import {
    View,
    Button
  } from 'react-native';
  
  import { data1, data2, data3, data4 } from '../Datas'
  import Graph from './Graph'
  
  export default class InitialComponent extends Component {
    state = {
      dataSet : {
        newData: [0],
        oldData: [0]
      }
    }
  
    changeGraph = async (newData, oldData) =>{
      await this.setState({
        dataSet: {
          newData,
          oldData
        }
      })
    }
    
    render() {
      return (
        <View>
          <Graph newData={this.state.dataSet.newData} oldData={this.state.dataSet.oldData}/>
          <View style={{ margin: 30 }} >
            <Button title={'Ultimos 7 dias'} onPress={() => this.changeGraph(data1, data3)} />
          </View>
          <View style={{ margin: 30 }} >
            <Button title={'Ultimos 30 dias'} onPress={() => this.changeGraph(data2, data4)} />
          </View>
        </View>
      );
    }
  }