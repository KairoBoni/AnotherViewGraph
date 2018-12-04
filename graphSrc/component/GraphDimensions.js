import {
    Dimensions,
} from 'react-native';

export const xDimension = Dimensions.get('window').width;;
export const yDimension = Dimensions.get('window').height;
export const xGraphDimension = xDimension * 0.95;
export const yGraphDimension = yDimension * 0.4;