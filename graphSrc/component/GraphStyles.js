import {
    StyleSheet,
} from 'react-native';

import { xDimension, yDimension, yGraphDimension } from './GraphDimensions'

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
        height: yDimension * 0.075,
        justifyContent: 'space-between',
        width: '70%'

    },

    tickLabelX: {
        position: 'absolute',
        left: -15,
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
        bottom: 0
    },

    xTrace: {
        position: "absolute",
        height: yGraphDimension,
        bottom: 0,
        borderRightWidth: 1,
        borderRightColor: '#eeeeee',

    },

    viewButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        textAlign: 'center'
    },

    buttons: {
        width: '40%',
        height: 37,
        borderRadius: 8,
        borderColor: ' rgba(63, 62, 62, 0.5)',
        borderWidth: 1,
        justifyContent: 'space-around',
    },

    textButton: {
        textAlign: 'center',
        fontSize: 15,
        color: '#3f3e3e',
        opacity: 0.5,
        fontWeight: 'bold',
    }
});
