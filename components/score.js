import React, { useEffect, useState, useRef } from 'react';
import { Text, View, FlatList, StyleSheet, Pressable, Image, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { fetchScores, fetchDetails, increaseDate, decreaseDate, addToFavorites } from '../redux/actions/index';
import MatchInfo from './matchInfo';
import MatchDetail from './matchDetail';
import * as Progress from 'react-native-progress';

const Score = ({ navigation, ...props }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const bounce = useRef(new Animated.Value(0)).current;
    const fade = useRef(new Animated.Value(-1)).current;

    const addToListAlert = (item) => {
        Alert.alert(
            'Add to Favorites',
            'Are you sure you want to add this game to your favorites?',
            [
                { text: 'No', onPress: () => { } },
                { text: 'Yes', onPress: () => props.addToFavorites(item) },
            ]
        );
    }

    const showDetails = (id) => {
        props.fetchDetails(id);
        setModalVisible(!modalVisible);
    }

    const fetchScorewithAnimation = async (date) => {
        try {
            await props.fetchScores(date);
            fadeAnimation();
        } catch (error) {
            console.log(error);
        }
    }

    const fadeAnimation = () => {
        Animated.timing(fade, {
            toValue: 1,
            easing: Easing.ease,
            duration: 2200,
            useNativeDriver: false,
        }).start();
    }

    const bounceAnimation = () => {
        Animated.timing(bounce, {
            toValue: 1,
            easing: Easing.bounce,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    useEffect(() => {
        bounceAnimation();
        fetchScorewithAnimation(props.date);
    }, [props.date]);


    return (
        <Animated.View style={{ flex:1, opacity: bounce, transform: [{ scaleY: bounce.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }) }] }}>
            <View style={styles.heading}>
                <Image source={require('../assets/nba.png')} style={{ width: 70, height: 70 }} />
                <Text style={styles.title}>NBA</Text>
            </View>
            <View style={styles.date}>
                <Pressable onPress={() => { props.decreaseDate(props.date); fade.setValue(-1) }}>
                    <Text style={{ fontSize: 16, borderBottomWidth: 1 }}>&#8636; PREV DAY</Text>
                </Pressable>
                <Text style={{ fontSize: 22, fontWeight: 700 }}>{props.date}</Text>
                <Pressable onPress={() => { props.increaseDate(props.date); fade.setValue(-1) }}>
                    <Text style={{ fontSize: 16, borderBottomWidth: 1 }}>NEXT DAY &#8640;</Text>
                </Pressable>
            </View>

            {StandingButton(navigation)}
            {FavoriteGamesButtton(navigation)}

            {props.progressBar ?
                <View>
                    <Progress.CircleSnail size={100} thickness={5} duration={500} style={[styles.progress, { fill: "transparent" }]} />
                    <Text style={styles.loadingText}>Loading......</Text>
                </View>
                :
                <FlatList
                    data={props.scores}
                    renderItem={({ item }) => (
                        <View>
                            <Animated.View style={{opacity: fade }}>
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
                                    {(props.favorite_games.some(game => game.id == item.id)) ?
                                        <Text style={{ color: "red" }}>Added into the Favorite Games</Text> :
                                        <TouchableOpacity style={styles.button} onPress={() => addToListAlert(item)}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: "white" }}>Add to Favorites</Text>
                                        </TouchableOpacity>}
                                </TouchableOpacity>
                            </Animated.View>
                            <MatchDetail modalVisible={modalVisible} setModalVisible={setModalVisible} matchDetails={props.matchDetails} />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />}
        </Animated.View>
    );
}

const FavoriteGamesButtton = (navigation) => (
    <Pressable style={styles.navigateButton} onPress={() => navigation.navigate('Favorite Games')}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Favorite Games</Text>
    </Pressable>
)

const StandingButton = (navigation) => (
    <Pressable style={styles.navigateButton} onPress={() => navigation.navigate('Standings')}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white" }}>Standings</Text>
    </Pressable>
)

const mapStateToProps = (state) => {
    return {
        progressBar: state.reducers.progressBar,
        scores: state.reducers.scores,
        matchDetails: state.reducers.matchDetails,
        date: state.reducers.date,
        favorite_games: state.reducers.favorite_games
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchScores: (date) => dispatch(fetchScores(date)),
        fetchDetails: (id) => dispatch(fetchDetails(id)),
        increaseDate: (date) => dispatch(increaseDate(date)),
        decreaseDate: (date) => dispatch(decreaseDate(date)),
        addToFavorites: (game) => dispatch(addToFavorites(game)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Score);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
    },
    progress: {
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 10,
    },
    loadingText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
    },
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
    navigateButton: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        width: "85%",
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    }
});