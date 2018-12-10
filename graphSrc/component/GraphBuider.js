import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3R from 'd3'

import {
    ART,
} from 'react-native';
import {xGraphDimension, yGraphDimension} from './GraphDimensions'

const {
    Group,
    Shape,
    Surface,
} = ART;

const d3 = {
    d3R,
    scale,
    shape,
};

const margin = 15;

createScales = (typeGraph, yMax, xMin, xMax) => {
    const yScale = d3.scale
        .scaleLinear()
        .domain([-0.05 * yMax, yMax + 0.05 * yMax])
        .range([yGraphDimension, 0]);
    const yScaleForLabel = d3.scale
        .scaleLinear()
        .domain([-0.05 * yMax, yMax + 0.05 * yMax])
        .range([0, yGraphDimension]);
    const xScale = d3.scale
        .scaleTime()
        .domain([xMin, xMax])
        .range([margin, xGraphDimension(typeGraph)]);
    return {
        yScale,
        yScaleForLabel,
        xScale
    }
}

createAxisGraph = (xScale, yScaleForLabel, data) => {
    const ticks = data.map((dataum) => {
        const x = dataum.x;
        const y = dataum.y;

        return {
            x: xScale(x),
            y: yScaleForLabel(y),
            dataum,
        }
    });
    return ticks;
}

createLineGraph = (xScale, yScale) => {
    const line = d3.shape.line()
        .x(function (d) { return xScale(d.x) })
        .y(function (d) { return yScale(d.y) })
    return line;

}

export default buildGraph = (data, yMax, typeGraph) => {
    const x = data.map((data) => {
        return data.x;
    });
    const y = data.map((data) => {
        return data.y;
    });
    const xMin = x[0];
    const xMax = x[x.length - 1];
    const {
        yScale,
        yScaleForLabel,
        xScale
    } = this.createScales(typeGraph, yMax, xMin, xMax)

    const lineGraph = this.createLineGraph(xScale, yScale);
    const ticks = this.createAxisGraph(xScale, yScaleForLabel, data);

    return {
        path: lineGraph(data),
        lineGraph: lineGraph,
        ticks: ticks,
    }
}