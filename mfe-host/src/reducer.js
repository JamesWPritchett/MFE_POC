import {ADD_TO_COUNT} from "./reducer.types";

const STATE = {
    count: 0
};



function reducer(state = STATE, action){
    switch(action.type){
        case ADD_TO_COUNT:
            return {
                ...state,
                count: state.count + 1
            };
        default:
            return STATE;
    }
}

export default reducer;