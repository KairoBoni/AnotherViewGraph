import {
    Dimensions,
} from 'react-native';

export const xDimension = Dimensions.get('window').width;
export const yDimension = Dimensions.get('window').height;

export const yGraphDimension = (yDimension * 0.4 );

export const  xGraphDimension = (type) => {
    if(type === '7days') {
       return (xDimension * 0.95)*4;
    } else {
        return (xDimension * 0.95);
    }

}