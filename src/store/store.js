import {createStore} from "redux"

const userReducer = (state = {user: 'user'}, action) => {
    if(action.type === "set-user"){
        return {user: action.payload}
    }
    return state;
}

const store = createStore(userReducer);
export default store;