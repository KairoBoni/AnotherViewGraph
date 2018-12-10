import buildGraph from '../component/GraphBuider';

initialState = {
    graph: {
        path: "",
        ticks: [],
        lineGraph: ""
    },
    oldGraph: {
        path: "",
        ticks: [],
        lineGraph: ""
    },
    dotCliked: 0,
    linePath: "",
    oldLinePath: "",
    diff: [0],
    diffNew: [0],
    diffOld: [0],
    infoToShow: {
        x: "",
        y: ""
    },
    indexOfInfo: 0,
    newData: [0],
    oldData: [0]
}

getMaxYDomain = (newData, oldData) => {
    const newY = newData.map((data) => {
        return data.y;
    });
    const oldY = oldData.map((data) => {
        return data.y;
    });
    const newYMax = newY.reduce((a, b) => {
        return Math.max(a, b);
    });

    const oldYMax = oldY.reduce((a, b) => {
        return Math.max(a, b);
    });
    yMax = Math.max(newYMax, oldYMax);

    return yMax
}

getDiff = (newTicks, oldTicks, state) => {
    const diffNew = newTicks.map((tick) => {
        return tick.dataum.y;
    });

    const diffOld = oldTicks.map((tick) => {
        return tick.dataum.y;
    });

    const diff = diffNew.map((value, index) => {
        return (value * 100) / (diffOld[index]) - 100;
    })

    return state = {
        ...state,
        diff,
        diffNew,
        diffOld
    };
}

const GraphReducer = (state = initialState, action) => {
    const {
        type,
    } = action
    switch (type) {
        case "CHANGE_GRAPH":
            const {
                newData,
                oldData,
                typeGraph
            } = action

            state = {
                ...state,
                dotCliked: 0,
                newData,
                oldData
            };

            const yMax = this.getMaxYDomain(newData, oldData);
            const newNextGraph = buildGraph(newData, yMax, typeGraph);
            const oldNextGraph = buildGraph(oldData, yMax, typeGraph);
            const newPreviusGraph = state.graph;
            const oldPreviusGraph = state.oldGraph;
            state = this.getDiff(newNextGraph.ticks, oldNextGraph.ticks, state);
            state = {
                ...state,
                graph: newNextGraph,
                oldGraph: oldNextGraph,
                linePath: newNextGraph.path,
                oldLinePath: oldNextGraph.path,
                newPreviusGraph,
                oldPreviusGraph
            }
            break;

        case "DATE_SELECT":
            const {
                data,
                index
            } = action

            state = {
                ...state,
                dotCliked: data.x.getDate(),
                infoToShow: data,
                indexOfInfo: index
            }
            break;
    }
    return state;
}

export default GraphReducer;