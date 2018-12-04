import React, {
    Component,
} from 'react';

import {
    View,
    LayoutAnimation,
} from 'react-native';

const AnimationDurationMs = 500;
import Morph from 'art/morph/path';

import { showWhoInfo, showNumberOfActivityUser, showDifference } from './GraphHeader';
import { showLabelX, showDots } from './GraphLabels';
import { stylesGraph } from './GraphStyles';
import { graphRender } from './GraphRender';

import { chageGraph, dateSelect } from '../action/GraphActions';
import { connect } from 'react-redux';

class Graph extends Component {
    state = {
        linePath: "",
        oldLinePath: "",
    }

    componentWillReceiveProps = async () => {
        await setTimeout(() => {
        }, 10);
        const {
            newData,
            oldData
        } = this.props
        if (this.props.graph.newData !== newData) {
            this.props.chageGraph(newData, oldData);
            if (this.props.graph.newPreviusGraph.path !== "") {
                this.setAnimation(this.props.graph.graph, this.props.graph.newPreviusGraph, 'new');
                this.setAnimation(this.props.graph.oldGraph, this.props.graph.oldPreviusGraph, 'old');
            } else {
                this.setState({
                    linePath: this.props.graph.linePath,
                    oldLinePath: this.props.graph.oldLinePath,
                })
            }
        }
    }

    setAnimation = (nextGraph, previusGraph, whoUpdate) => {
        const pathFrom = previusGraph.path;
        const pathTo = nextGraph.path;
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                AnimationDurationMs,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.scaleXY
            ),
        );

        if (whoUpdate === 'new') {
            this.setState({
                graph: nextGraph,
                linePath: Morph.Tween(
                    pathFrom,
                    pathTo,
                ),
            }, () => {
                this.animate('new');
            });
        } else {
            this.setState({
                oldGraph: nextGraph,
                oldLinePath: Morph.Tween(
                    pathFrom,
                    pathTo,
                ),
            }, () => {
                this.animate('old');
            });
        }
    }
    animate = (whoUpdate, start) => {
        this.animating = requestAnimationFrame((timestamp) => {
            if (!start) {
                start = timestamp;
            }
            if (whoUpdate === 'new') {
                delta = (timestamp - start) / AnimationDurationMs;
                if (delta > 1) {
                    this.setState({
                        linePath: this.state.graph.path,
                    });
                    return;
                }
                this.state.linePath.tween(delta);
                this.setState(this.state, () => {
                    this.animate('new', start);
                });
            } else {
                const delta = (timestamp - start) / AnimationDurationMs;
                if (delta > 1) {
                    this.setState({
                        oldLinePath: this.state.oldGraph.path,
                    });
                    return;
                }
                this.state.oldLinePath.tween(delta);
                this.setState(this.state, () => {
                    this.animate('old', start);
                });
            }
        });
    }

    render() {
        const graph = this.props.graph;
        return (
            <View>
                <View style={stylesGraph.containerComparation}>
                    {showWhoInfo(graph.infoToShow, graph.dotCliked)}
                    <View style={stylesGraph.numberUsers}>
                        {showNumberOfActivityUser(graph.infoToShow, graph.dotCliked, graph.diffNew)}
                        {showDifference(graph.dotCliked, graph.diff, graph.diffNew, graph.diffOld, graph.indexOfInfo)}
                    </View>
                </View>
                <View>
                    {graphRender(this.state.linePath, this.state.oldLinePath)}
                    <View key={'ticksX'} >
                        {showLabelX(graph.graph, graph.diff, graph.dotCliked, this.props.dateSelect)}
                    </View>
                    <View key={'ticksY'}>
                        {showDots(graph.graph, this.props.dateSelect)}
                    </View>
                </View>
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
        chageGraph: (newData, oldData) => {
            dispatch(chageGraph(newData, oldData, this.setNewAnimation))
        },

        dateSelect: (data, index) => {
            dispatch(dateSelect(data, index))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);