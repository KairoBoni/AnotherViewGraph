import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { stylesGraph } from './GraphStyles'
import { xGraphDimension } from './GraphDimensions'


export const showLabelX = (graph, diff, dotCliked, showNumber, typeGraph) => {
    return graph.ticks.map((tick, index) => {
        const tickStyles = {};
        tickStyles.left = tick.x;
        let length = 0
        if(typeGraph === '7days'){
            length = 28
        } else {
            length = diff.length
        }
        return (
            <View key={index} style={[tickStyles]}>
                <TouchableOpacity
                    onPress={() => showNumber(tick.dataum, index)}
                    style={[stylesGraph.xBox,
                    {
                        width: xGraphDimension(typeGraph) / length,
                        left: -(xGraphDimension(typeGraph) / length) / 2,
                    },]
                    }>
                    <View style={[stylesGraph.xTrace, { left: (xGraphDimension(typeGraph) / length) / 2 },
                    (dotCliked === tick.dataum.x.getDate()) &&
                    { borderRightColor: '#AAAAAA' }]}>
                    </View>
                    <Text>
                    </Text>
                </TouchableOpacity>
                <Text style={stylesGraph.tickLabelX} >
                    {`${tick.dataum.x.getDate()}/${tick.dataum.x.getMonth() + 1}`}
                </Text>
            </View>
        );
    })
}

export const showDots = (graph, showNumber) => {
    return graph.ticks.map((tick, index) => {
        const tickStyles = {};
        tickStyles.left = tick.x - 4;
        tickStyles.bottom = tick.y - 5;
        return (
            <TouchableOpacity onPress={() => showNumber(tick.dataum, index)} key={index} style={[tickStyles, stylesGraph.ticksYContainer, stylesGraph.ticksYDot]}>
            </TouchableOpacity>
        );
    })
}