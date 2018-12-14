import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import { Icon } from 'react-native-elements'

import { stylesGraph } from './GraphStyles'

subDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

export const showWhoInfo = (infoToShow, dotCliked) => {
    if (dotCliked !== 0) {
        return (
            <View style={stylesGraph.viewData}>
                <Text style={stylesGraph.titleValue}>
                    {infoToShow.x.toDateString()}
                </Text>
                <Text>
                    Vs
                        </Text>
                <Text style={stylesGraph.titleValue}>
                    {this.subDays(infoToShow.x, 7).toDateString()}
                </Text>
            </View>
        )
    } else {
        return (
            <Text style={stylesGraph.titleValue}>
                Average
                </Text>
        )
    }
}

export const showNumberOfActivityUser = (infoToShow, dotCliked, diffNew, titleGraph) => {
    if (dotCliked !== 0) {
        return (
            <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'space-between' }}>
                <Text >
                    {titleGraph}:
                </Text>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                    {infoToShow.y}
                </Text>
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'space-between' }}>
                <Text >
                    {titleGraph}:
                </Text>
                <Text style={{ fontWeight: "bold", color: "black" }}>
                    {
                        (Math.round(diffNew.reduce((value, acc) => {
                            acc = acc + value;
                            return acc;
                        }) / diffNew.length * 100)) / 100
                    }
                </Text>
            </View>
        )
    }
}

export const showDifference = (dotCliked, diff, diffNew, diffOld, indexOfInfo) => {
    const avNew = (diffNew.reduce((value, acc) => {
        acc = acc + value;
        return acc;
    }) / diffNew.length)

    const avOld = (diffOld.reduce((value, acc) => {
        acc = acc + value;
        return acc;
    }) / diffOld.length);

    const monthDiff = Math.round(((avNew * 100) / avOld - 100) * 100) / 100;
    if (dotCliked === 0) {
        if (monthDiff >= 0) {
            return (
                <View style={{ flexDirection: "row" }}>
                    <Icon name="arrow-upward" size={18} color="#239E5F" />
                    <Text style={{ color: "#239E5F", fontWeight: "bold" }}>
                        {(Math.abs(monthDiff)) + "%"}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: "row" }}>
                    <Icon name="arrow-downward" size={18} color="#ED5F6E" />
                    <Text style={{ color: "#ED5F6E", fontWeight: "bold" }}>
                        {(Math.abs(monthDiff)) + "%"}
                    </Text>
                </View>
            )
        }
    } else {
        if (diff[indexOfInfo] >= 0) {
            return (
                <View style={{ flexDirection: "row" }}>
                    <Icon name="arrow-upward" size={18} color="#239E5F" />
                    <Text style={{ color: "#239E5F", fontWeight: "bold" }}>
                        {(Math.abs(Math.round(diff[indexOfInfo] * 100) / 100)) + "%"}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: "row" }}>
                    <Icon name="arrow-downward" size={18} color="#ED5F6E" />
                    <Text style={{ color: "#ED5F6E", fontWeight: "bold" }}>
                        {(Math.abs(Math.round(diff[indexOfInfo] * 100) / 100)) + "%"}
                    </Text>
                </View>

            )
        }
    }
}
