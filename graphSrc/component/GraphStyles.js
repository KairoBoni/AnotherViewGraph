import {
    StyleSheet,
} from 'react-native';

import {xDimension, yDimension, yGraphDimension} from './GraphDimensions'

export const stylesGraph = StyleSheet.create({
    titleValue: {
        fontSize: 16
    },

    viewData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    numberUsers: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    containerComparation: {
        width: xDimension * 0.7,
        height: yDimension * 0.075,

    },

    tickLabelX: {
        position: 'absolute',
        left: -11,
        fontSize: 10,
        top: 3,
        textAlign: 'center',
        transform: [{ rotate: '-65deg' }]
    },

    ticksYContainer: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },

    ticksYDot: {
        position: 'absolute',
        width: 10,
        height: 10,
        backgroundColor: '#F8923D',
        borderRadius: 100,
    },

    xBox: {
        position: "absolute",
        height: yGraphDimension,
        bottom: 0,
    },

    xTrace: {
        position: "absolute",
        height: yGraphDimension,
        bottom: 0,
        borderRightWidth: 1,
        borderRightColor: '#eeeeee',

    }
});