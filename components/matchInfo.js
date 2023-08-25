import React, {useRef, useEffect} from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';

const MatchInfo = (props) => {

    return (
        <>
            <Text style={styles.status}>{props.status}</Text>
            <View style={styles.team}>
                <Image source={{ uri: (props.homeLogo) }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                <Text style={[styles.teamName, (props.homeScore > props.visitorsScore) ? styles.win : styles.lose]}> {props.homeTeam}</Text>
                <Text style={[styles.score, (props.homeScore > props.visitorsScore) ? styles.win : styles.lose]}> {props.homeScore} </Text>
            </View>
            <View style={styles.team}>
                <Image source={{ uri: (props.visitorsLogo) }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                <Text style={[styles.teamName, (props.homeScore < props.visitorsScore) ? styles.win : styles.lose]}> {props.visitorsTeam}</Text>
                <Text style={[styles.score, (props.homeScore < props.visitorsScore) ? styles.win : styles.lose]}> {props.visitorsScore} </Text>
            </View>
        </>
    );
};

export default MatchInfo;

const styles = StyleSheet.create({
    status: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'right',
        color: 'green',
    },
    team: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        width: "100%",
    },
    teamName: {
        fontSize: 18,
        fontWeight: 700,
        marginLeft: 10,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    win: {
        color: 'green',
    },
    lose: {
        color: 'grey',
    },
});