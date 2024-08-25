import {
    GET_GROUP_LIST_SUCCESS,
    GET_GROUP_LIST_FAIL,
    ADD_GROUP_LIST_SUCCESS,
    ADD_GROUP_LIST_FAIL,
    UPDATE_GROUP_LIST_SUCCESS,
    UPDATE_GROUP_LIST_FAIL,
    DELETE_GROUP_LIST_SUCCESS,
    DELETE_GROUP_LIST_FAIL,
    LOADING_STATUS

} from "./actionTypes";

const INIT_STATE = {
    groups: [],
    jobs: [],
    error: "",
    success: "",
    loading: false,
    jobApply: [],
}

const GroupReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_GROUP_LIST_SUCCESS:
            return {
                ...state,
                groups: action.payload,
            };
        case GET_GROUP_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case ADD_GROUP_LIST_SUCCESS:
            return {
                ...state,
                groups: [...state.jobs, action.payload],
            };

        case ADD_GROUP_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_GROUP_LIST_SUCCESS:
            return {
                ...state,
                groups: state.groups,
            };

        case UPDATE_GROUP_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_GROUP_LIST_SUCCESS:
            return {
                ...state,
                groups: state.groups.filter(
                    group => group.id.toString() !== action.payload.toString()
                ),
            };

        case DELETE_GROUP_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOADING_STATUS:
            return {
                ...state,
                loading: action.payload,
            };

        default:
            return state
    }
}

export default GroupReducer;