import React, {
    Component,
} from 'react';

import {
    View,
    Animated,
    Easing,
    TouchableOpacity,
    Text
} from 'react-native';


import { showWhoInfo, showNumberOfActivityUser, showDifference } from './GraphHeader';
import { showLabelX, showDots } from './GraphLabels';
import { stylesGraph } from './GraphStyles';
import { graphRender } from './GraphRender';

import { chageGraph, dateSelect } from '../action/GraphActions';
import { connect } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import { xGraphDimension } from './GraphDimensions'

class Graph extends Component {
    state = {
        linePath: "",
        oldLinePath: "",
        graphShow: (xGraphDimension('7days') / 4) * 3,
        animatedGraphShow: new Animated.Value((xGraphDimension('7days') / 4) * 3),
        new7Data: [],
        old7Data: [],
        new30Data: [],
        old30Data: [],
        typeGraph: '7days',
        partSelected: 3
    }

    fillData = async () => {
        let data = this.props.data;
        data = data.reverse();
        new7Data = data.slice(0, 28)
        old7Data = data.slice(7, 35)
        new30Data = data.slice(0, 30)
        old30Data = data.slice(30, 60)

        await this.setState({
            new7Data: new7Data.reverse(),
            old7Data: old7Data.reverse(),
            new30Data: new30Data.reverse(),
            old30Data: old30Data.reverse()
        })
    }

    selectData = async (newData, oldData) => {
        this.props.chageGraph(newData, oldData, this.state.typeGraph);
        setTimeout(() => {
            this.setState({
                linePath: this.props.graph.linePath,
                oldLinePath: this.props.graph.oldLinePath,
            })
        }, 1);
    }

    componentDidMount = async () => {
        await this.fillData();
        const {
            new7Data,
            old7Data
        } = this.state
        this.selectData(new7Data, old7Data);
    }

    onSwipeRight() {
        let {
            graphShow,
        } = this.state;
        if (this.state.typeGraph === '7days'
            && this.state.partSelected > 0) {
            graphShow += -xGraphDimension(this.state.typeGraph) / 4;
            Animated.timing(
                this.state.animatedGraphShow, {
                    toValue: graphShow,
                    easing: Easing.ease,
                    duration: 500
                }
            ).start();
            this.setState({
                graphShow,
                partSelected: this.state.partSelected - 1
            })
        }
    }

    onSwipeLeft() {
        let {
            graphShow,
        } = this.state;
        if (this.state.typeGraph === '7days'
            && this.state.partSelected < 3) {
            graphShow += xGraphDimension(this.state.typeGraph) / 4;
            Animated.timing(
                this.state.animatedGraphShow, {
                    toValue: graphShow,
                    easing: Easing.ease,
                    duration: 500
                }
            ).start();
            this.setState({
                graphShow,
                partSelected: this.state.partSelected + 1
            })
        }
    }

    last7Days = async () => {
        await this.setState({
            typeGraph: '7days',
            graphShow: (xGraphDimension('7days') / 4) * 3,
            animatedGraphShow: new Animated.Value((xGraphDimension('7days') / 4) * 3),
            partSelected: 3
        })
        this.selectData(this.state.new7Data, this.state.old7Data);

    }

    last30Days = async () => {
        await this.setState({
            typeGraph: '30days',
            graphShow: 0,
            animatedGraphShow: new Animated.Value(0),
        })
        this.selectData(this.state.new30Data, this.state.old30Data);
    }


    render() {
        const graph = this.props.graph;
        return (
            <View >
                <View style={stylesGraph.viewButtons}>
                    <TouchableOpacity style={[stylesGraph.buttons, this.state.typeGraph === '7days' && { backgroundColor: "#9D9C9C" }]} onPress={this.last7Days}>
                        <Text style={[stylesGraph.textButton, this.state.typeGraph === '7days' && { color: "#FFFFFF" }]}>
                            Last 7 Days
                        </Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={[stylesGraph.buttons, this.state.typeGraph === '30days' && { backgroundColor: "#9D9C9C" }]} onPress={this.last30Days}>
                        <Text style={[stylesGraph.textButton, this.state.typeGraph === '30days' && { color: "#ffffff" }]}>
                            Last 30 Days
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={stylesGraph.containerComparation}>
                    {showWhoInfo(graph.infoToShow, graph.dotCliked)}
                    <View style={[stylesGraph.numberUsers]}>
                        {showNumberOfActivityUser(graph.infoToShow, graph.dotCliked, graph.diffNew, this.props.titleGraph)}
                        {showDifference(graph.dotCliked, graph.diff, graph.diffNew, graph.diffOld, graph.indexOfInfo)}
                    </View>
                </View>
                <Animated.View style={{ right: this.state.animatedGraphShow }}>
                    <GestureRecognizer
                        onSwipeRight={(state) => this.onSwipeRight(state)}
                        onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    >
                        {graphRender(this.state.linePath, this.state.oldLinePath, this.state.typeGraph)}
                        <View key={'ticksX'} >
                            {showLabelX(graph.graph, graph.diff, graph.dotCliked, this.props.dateSelect, this.state.typeGraph)}
                        </View>
                        <View key={'ticksY'}>
                            {showDots(graph.graph, this.props.dateSelect)}
                        </View>
                    </GestureRecognizer>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        graph: state.GraphReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        chageGraph: (newData, oldData, typeGraph) => {
            dispatch(chageGraph(newData, oldData, typeGraph))
        },

        dateSelect: (data, index) => {
            dispatch(dateSelect(data, index))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);