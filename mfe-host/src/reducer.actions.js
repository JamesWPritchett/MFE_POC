import {ADD_TO_COUNT} from "./reducer.types";

export const incrCount = (payload) =>{
    return {
        type: ADD_TO_COUNT,
    }
}