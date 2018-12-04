export const chageGraph = (newData, oldData) => {
    return {
        type: "CHANGE_GRAPH",
        newData,
        oldData
    }
}

export const dateSelect = (data, index) => {
    return {
        type: "DATE_SELECT",
        data,
        index
    }
}