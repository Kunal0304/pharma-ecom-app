import { call, put, takeEvery } from "redux-saga/effects"

import { GET_GROUP_LIST, ADD_NEW_GROUP_LIST, UPDATE_GROUP_LIST, DELETE_GROUP_LIST } from "./actionTypes";
import {
    getGroupListSuccess,
    getGroupListFail,
    addGroupListSuccess,
    addGroupListFail,
    updateGroupListSuccess,
    updateGroupListFail,
    deleteGroupListSuccess,
    deleteGroupListFail,
    loadingGroupStatus
} from "./actions"

import {
    updateGroup,
    getSellerGroups,
    addNewGroupList,
    deleteJobList,
} from "helpers/fakebackend_helper";

function* fetchSellerGroupsList() {
    try {
        yield put(loadingGroupStatus(true))
        const response = yield call(getSellerGroups)
        if (response.status == true) {
            yield put(loadingGroupStatus(false))
            yield put(getGroupListSuccess(response.data))
        } else {
            yield put(loadingGroupStatus(false))
            yield put(getGroupListFail(response.message))
        }

    } catch (error) {
        yield put(loadingGroupStatus(false))
        yield put(getGroupListFail(error))
    }

}


function* onAddNewGroupList({ payload: data }) {
    try {
        yield put(loadingGroupStatus(true))
        const response = yield call(addNewGroupList, data)
        if(response.status==true){
            yield put(loadingGroupStatus(false))
            yield put(addGroupListSuccess(response.data))
        }else{
            yield put(loadingGroupStatus(false))
            yield put(addGroupListFail(response.message))
        }
        
    } catch (error) {
        yield put(loadingGroupStatus(false))
        yield put(addGroupListFail(error))
    }
}

function* onUpdateGroupList({ payload: data }) {
    try {
        yield put(loadingGroupStatus(true))
        const response = yield call(updateGroup, data)
        if (response.status == true) {
            yield put(loadingGroupStatus(false))
            yield put(updateGroupListSuccess(response.data))
        } else {
            yield put(loadingGroupStatus(false))
            yield put(updateGroupListFail(response.message))
        }

    } catch (error) {
        yield put(loadingGroupStatus(false))
        yield put(updateGroupListFail(error))
    }
}

function* onDeleteGroupList({ payload: data }) {

    try {
        yield put(loadingGroupStatus(true))
        const response = yield call(deleteJobList, data)
        if(response.status==true){
            yield put(loadingGroupStatus(false))
            yield put(deleteGroupListSuccess(response))
        }else{
            yield put(loadingGroupStatus(false))
            yield put(deleteGroupListFail(response.message)) 
        }
      
    } catch (error) {
        yield put(loadingGroupStatus(false))
        yield put(deleteGroupListFail(error))
    }
}



function* groupsSaga() {
    yield takeEvery(GET_GROUP_LIST, fetchSellerGroupsList);
    yield takeEvery(ADD_NEW_GROUP_LIST, onAddNewGroupList)
    yield takeEvery(UPDATE_GROUP_LIST, onUpdateGroupList)
    yield takeEvery(DELETE_GROUP_LIST, onDeleteGroupList)
}

export default groupsSaga;