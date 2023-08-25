import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, FlatList, Image, View, TouchableOpacity, Animated } from 'react-native';
import { fetchStandings } from '../redux/actions/index';
import { connect } from 'react-redux';

const Standings = ({ navigation, ...props }) => {
    const [conference, setConference] = useState("east");
    const headerPosition = useRef(new Animated.Value(1000)).current;
    const standingPosition = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        props.fetchStandings(conference);
        animate(headerPosition);
        animate(standingPosition);
    }, [conference]);

    const animate = (position) => {
        Animated.timing(position, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };


    const sortedStandings = props.standings.sort((a, b) => {
        return a.conference.rank - b.conference.rank;
    });

    return (
        <>
        <Animated.View style={{top: headerPosition}}>
            <View style={styles.conference}>
                <TouchableOpacity disabled={conference === "east"} onPress={() => {setConference("east"); standingPosition.setValue(1000)}}>
                    <Text style={conference === "east" ? {fontWeight: 900}:{fontWeight: 'normal'}}>Eastern Conference</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={conference === "west"} onPress={() => {setConference("west"); standingPosition.setValue(1000)}}>
                    <Text style={conference === "east" ? {fontWeight:'normal'} : {fontWeight:900}}>Western Conference</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.standingHeader}>
                <View style={{ width: 100 }}>
                    <Text style={{fontWeight: 'bold', textAlign:"center"}}>Team</Text>
                </View>
                <Text style={styles.headerText}>Win</Text>
                <Text style={styles.headerText}>Loss</Text>
                <Text style={styles.headerText}>Win%</Text>
                <Text style={styles.headerText}>Home</Text>
                <Text style={styles.headerText}>Away</Text>
            </View>
            </Animated.View>
            <FlatList data={sortedStandings} renderItem={({ item }) => (
                <Animated.View style={[styles.standingInfo, {top:standingPosition}]}>
                    <View style={styles.team}>
                        <Text>{item.conference.rank}</Text>
                        <Image source={{ uri: item.team.logo }} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                    </View>
                    <Text style={styles.text}>{item.win.total}</Text>
                    <Text style={styles.text}>{item.loss.total}</Text>
                    <Text style={styles.text}>{item.win.percentage}</Text>
                    <Text style={styles.text}>{item.win.home} - {item.loss.home}</Text>
                    <Text style={styles.text}>{item.win.away} - {item.loss.away}</Text>
                </Animated.View>
            )} keyExtractor={item => item.team.id} />
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        progressBar: state.reducers.progressBar,
        standings: state.reducers.standings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStandings: (conference) => dispatch(fetchStandings(conference)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Standings);

const styles = StyleSheet.create({
    conference: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 8,
        padding:10,
    },
    standingHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 5,
        width: "100%",
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    standingInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginVertical: 5,
    },
    team: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 100,
    },
    headerText: {
        width: 45,
        fontWeight: 'bold',
    },
    text: {
        width: 45,
    }
});