import { FETCH_SCORES, FETCH_DETAILS, FETCH_STANDINGS, SHOW_PROGRESS_BAR, HIDE_PROGRESS_BAR,INCREASE_DATE, DECREASE_DATE, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from '../actionTypes';
import moment from 'moment';

const initialState = {
    progressBar: false,
    scores: [],
    matchDetails: [],
    standings: [],
    date: moment().format('YYYY-MM-DD'),
    favorite_games: [],
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case FETCH_SCORES:
            return {
                ...state,
                scores: action.payload
            };
        case FETCH_DETAILS:
            return {
                ...state,
                matchDetails: action.payload
            };
        case FETCH_STANDINGS:
            return {
                ...state,
                standings: action.payload
            };
        case SHOW_PROGRESS_BAR:
            return {
                ...state,
                progressBar: action.payload
            };
        case HIDE_PROGRESS_BAR:
            return {
                ...state,
                progressBar: action.payload
            };
        case INCREASE_DATE:
            return {
                ...state,
                date: action.payload
            };
        case DECREASE_DATE:
            return {
                ...state,
                date: action.payload
            };
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorite_games: [...state.favorite_games, action.payload]
            };
        case REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favorite_games: state.favorite_games.filter(game => game.id !== action.payload.id)
            };
        default:
            return state;
    }
}


