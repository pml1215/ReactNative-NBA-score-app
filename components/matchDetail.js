import { useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Modal, Image, TouchableOpacity } from 'react-native';

const MatchDetailsContainer = ({ matchDetails }) => {
    // Teams logos
    var homeTeamLogo = matchDetails[0].team.logo;
    var awayTeamLogo = matchDetails[1].team.logo;

    // Home team statistics
    var homeStats = matchDetails[0].statistics[0];
    var homeFGM = homeStats.fgm;
    var homeFGA = homeStats.fga;
    var homeFGP = homeStats.fgp;
    var homeFTM = homeStats.ftm;
    var homeFTA = homeStats.fta;
    var homeFTP = homeStats.ftp;
    var home3PM = homeStats.tpm;
    var home3PA = homeStats.tpa;
    var home3PP = homeStats.tpp;
    var homeRebounds = homeStats.totReb;
    var homeAssists = homeStats.assists;
    var homeSteals = homeStats.steals;
    var homeBlocks = homeStats.blocks;
    var homeTurnovers = homeStats.turnovers;

    // Away team statistics
    var awayStats = matchDetails[1].statistics[0];
    var awayFGM = awayStats.fgm;
    var awayFGA = awayStats.fga;
    var awayFGP = awayStats.fgp;
    var awayFTM = awayStats.ftm;
    var awayFTA = awayStats.fta;
    var awayFTP = awayStats.ftp;
    var away3PM = awayStats.tpm;
    var away3PA = awayStats.tpa;
    var away3PP = awayStats.tpp;
    var awayRebounds = awayStats.totReb;
    var awayAssists = awayStats.assists;
    var awaySteals = awayStats.steals;
    var awayBlocks = awayStats.blocks;
    var awayTurnovers = awayStats.turnovers;

    return (
        <View style={styles.infoContainer}>
            <View style={styles.infoColumn}>
                <Image source={{ uri: homeTeamLogo }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                <Text>{homeFGM} / {homeFGA}</Text>
                <Text>{homeFGP}</Text>
                <Text>{homeFTM} / {homeFTA}</Text>
                <Text>{homeFTP}</Text>
                <Text>{home3PM} / {home3PA}</Text>
                <Text>{home3PP}</Text>
                <Text>{homeRebounds}</Text>
                <Text>{homeAssists}</Text>
                <Text>{homeSteals}</Text>
                <Text>{homeBlocks}</Text>
                <Text>{homeTurnovers}</Text>
            </View>
            <View style={styles.infoColumn}>
                <Text style={{width:60, height:60, textAlign:"center", padding:8}}>TEAM STATS</Text>
                <Text>Field Goals</Text>
                <Text>Field Goal %</Text>
                <Text>Free Throws</Text>
                <Text>Free Throw %</Text>
                <Text>3 Pointers</Text>
                <Text>3 Point %</Text>
                <Text>Rebounds</Text>
                <Text>Assists</Text>
                <Text>Steals</Text>
                <Text>Blocks</Text>
                <Text>Turnovers</Text>
            </View>
            <View style={styles.infoColumn}>
                <Image source={{ uri: awayTeamLogo }} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
                <Text>{awayFGM} / {awayFGA}</Text>
                <Text>{awayFGP}</Text>
                <Text>{awayFTM} / {awayFTA}</Text>
                <Text>{awayFTP}</Text>
                <Text>{away3PM} / {away3PA}</Text>
                <Text>{away3PP}</Text>
                <Text>{awayRebounds}</Text>
                <Text>{awayAssists}</Text>
                <Text>{awaySteals}</Text>
                <Text>{awayBlocks}</Text>
                <Text>{awayTurnovers}</Text>
            </View>
        </View>
    )
};


const MatchDetail = ({ matchDetails, modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {(matchDetails && matchDetails.length !== 0) ? <MatchDetailsContainer matchDetails={matchDetails} /> : <Text style={styles.modalText}>The game doesn't start yet</Text>}
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: "white" }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const mapStateToProps = state => ({
    matchDetails: state.reducers.matchDetails,
});

export default connect(mapStateToProps)(MatchDetail);


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: 350,
        height: 430,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    infoContainer: {
        flex: 1,
        width: 350,
        height: 300,
        // justifyContent: 'space-around',
        flexDirection: 'row',
    },
    infoColumn: {
        flex: 1,
        width: 160,
        height: 300,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
});


