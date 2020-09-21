import { CHANGE_LIST_GRAFIK, CHANGE_LIST_ } from "../type";
const { combineReducers } = require("redux");

const isState = {
    list_:[],
    list_grafik:[]
}

const Reducer = (state = isState, action)=>{
    switch (action.type) {
        case CHANGE_LIST_GRAFIK:
            return {...state, list_grafik: action.payload}
        case CHANGE_LIST_:
            return {...state, list_: action.payload}
        default:
            return state
    }
};

export default combineReducers({Reducer})