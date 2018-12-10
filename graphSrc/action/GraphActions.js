export const chageGraph = (newData, oldData, typeGraph) => {
    return {
        type: "CHANGE_GRAPH",
        newData,
        oldData,
        typeGraph
    }
}

export const dateSelect = (data, index) => {
    return {
        type: "DATE_SELECT",
        data,
        index
    }
}