import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { removeFromFavorites, fetchDetails } from '../redux/actions/index';
import { connect } from 'react-redux';
import MatchInfo from './matchInfo';
import MatchDetail from './matchDetail';

const FavoriteGames = ({ navigation, ...props }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const showDetails = (id) => {
        props.fetchDetails(id);
        setModalVisible(!modalVisible);
    }

    return (
        <FlatList data={props.favorite_games} renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => showDetails(item.id)}>
                <MatchInfo
                    status={item.status.long}
                    homeLogo={item.teams.home.logo}
                    visitorsLogo={item.teams.visitors.logo}
                    homeScore={item.scores.home.points}
                    homeTeam={item.teams.home.name}
                    visitorsScore={item.scores.visitors.points}
                    visitorsTeam={item.teams.visitors.name}
                />
                <TouchableOpacity style={styles.button} onPress={() => props.removeFromFavorites(item)}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: "white" }}>Remove from Favorites</Text>
                </TouchableOpacity>
                <MatchDetail modalVisible={modalVisible} setModalVisible={setModalVisible} matchDetails={props.matchDetails} />
            </TouchableOpacity>
        )} keyExtractor={item => item.id} />
    );
}

const mapStateToProps = (state) => {
    return {
        favorite_games: state.reducers.favorite_games,
        matchDetails: state.reducers.matchDetails,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromFavorites: (game) => dispatch(removeFromFavorites(game)),
        fetchDetails: (id) => dispatch(fetchDetails(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteGames);

const styles = StyleSheet.create({
    item: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        padding: 20,
        marginHorizontal: 30,
        marginVertical: 15,
        borderRadius: 10,
        borderColor: '#2196F3',
        borderWidth: 3,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    }
});