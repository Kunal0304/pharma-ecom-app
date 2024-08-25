import {
  GET_GROUP_LIST,
  GET_GROUP_LIST_FAIL,
  GET_GROUP_LIST_SUCCESS,
  ADD_NEW_GROUP_LIST,
  ADD_GROUP_LIST_SUCCESS,
  ADD_GROUP_LIST_FAIL,
  UPDATE_GROUP_LIST,
  UPDATE_GROUP_LIST_SUCCESS,
  UPDATE_GROUP_LIST_FAIL,
  DELETE_GROUP_LIST,
  DELETE_GROUP_LIST_SUCCESS,
  DELETE_GROUP_LIST_FAIL,
  LOADING_STATUS
} from "./actionTypes";

export const getGroupList = () => ({
  type: GET_GROUP_LIST,
})

export const getGroupListSuccess = groups => ({
  type: GET_GROUP_LIST_SUCCESS,
  payload: groups,
})

export const getGroupListFail = error => ({
  type: GET_GROUP_LIST_FAIL,
  payload: error,
})


export const addNewGroupList = data => ({
  type: ADD_NEW_GROUP_LIST,
  payload: data,
})

export const addGroupListSuccess = group => ({
  type: ADD_GROUP_LIST_SUCCESS,
  payload: group,
  success:"success"
})

export const addGroupListFail = error => ({
  type: ADD_GROUP_LIST_FAIL,
  payload: error,
})

export const updateGroupList = group => ({
  type: UPDATE_GROUP_LIST,
  payload: group,
})

export const updateGroupListSuccess = group => ({
  type: UPDATE_GROUP_LIST_SUCCESS,
  payload: group,
})

export const updateGroupListFail = error => ({
  type: UPDATE_GROUP_LIST_FAIL,
  payload: error,
})

export const deleteGroupList = data => ({
  type: DELETE_GROUP_LIST,
  payload: data,
})

export const deleteGroupListSuccess = data => ({
  type: DELETE_GROUP_LIST_SUCCESS,
  payload: data,
})

export const deleteGroupListFail = error => ({
  type: DELETE_GROUP_LIST_FAIL,
  payload: error,
})
export const loadingGroupStatus = loading => ({
  type: LOADING_STATUS,
  payload: loading,
})

