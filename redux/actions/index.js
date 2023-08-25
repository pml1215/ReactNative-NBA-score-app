import { FETCH_SCORES, FETCH_DETAILS, FETCH_STANDINGS, SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR, INCREASE_DATE, DECREASE_DATE, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../actionTypes';
import moment from 'moment';

export const increaseDate = (date) => {
    return {
        type: INCREASE_DATE,
        payload: moment(date).add(1, 'days').format('YYYY-MM-DD')
    };
};

export const decreaseDate = (date) => {
    return {
        type: DECREASE_DATE,
        payload: moment(date).subtract(1, 'days').format('YYYY-MM-DD')
    };
};

export const showProgressBar = () => {
    return {
        type: SHOW_PROGRESS_BAR,
        payload: true
    };
};

export const hideProgressBar = () => {
    return {
        type: HIDE_PROGRESS_BAR,
        payload: false
    };
};

const options = {
    method: 'GET',
    headers: {
        // APIKey: 5bb7ca56f5f4308f48c886912d4b96ef, e84f00baf79796ac216dd440970531bc
        'X-RapidAPI-Key': 'e84f00baf79796ac216dd440970531bc',
        'X-RapidAPI-Host': 'v2.nba.api-sports.io'
    }
};

export const fetchScores = (date) => {
    return dispatch => {
        dispatch(showProgressBar());

        setTimeout(() => {
        fetch(`https://v2.nba.api-sports.io/games?date=${date}`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_SCORES,
                    payload: data.response
                });
            })
            .then(() => dispatch(hideProgressBar()))
            .catch(err => console.error(err));
        }, 1500);
    };
};

export const fetchDetails = (id) => {
    return dispatch => {
        fetch(`https://v2.nba.api-sports.io/games/statistics?id=${id}`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_DETAILS,
                    payload: data.response
                });
            })
            .catch(err => console.error(err));
    };
};

export const fetchStandings = (conference) => {
    return dispatch => {
        fetch(`https://v2.nba.api-sports.io/standings?league=standard&season=2022&conference=${conference}`, options)
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: FETCH_STANDINGS,
                    payload: data.response
                });
            })
            .catch(err => console.error(err));
    };
};

export const addToFavorites = (game) => {
    return {
        type: ADD_TO_FAVORITES,
        payload: game
    };
};

export const removeFromFavorites = (game) => {
    return {
        type: REMOVE_FROM_FAVORITES,
        payload: game
    };
}

