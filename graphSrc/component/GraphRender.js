import React, {
    Component,
} from 'react';

import { xGraphDimension, yGraphDimension } from './GraphDimensions';
import {
    ART,
} from 'react-native';

const {
    Group,
    Shape,
    Surface,
} = ART;

export const graphRender = (linePath, oldLinePath) => {
    return (
        <Surface width={xGraphDimension} height={yGraphDimension} visible={false}>
            <Group x={0} y={0}>
                <Shape
                    d={linePath}
                    stroke="#FE9038"
                    strokeWidth={3}
                />
                <Shape
                    d={oldLinePath}
                    stroke="#FE9038"
                    strokeWidth={1}
                    strokeDash={[10, 20]}
                />
            </Group>
        </Surface>
    );
}