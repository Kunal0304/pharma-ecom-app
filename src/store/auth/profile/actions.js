import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG, CHANGE_PASS } from "./actionTypes"

export const editProfile = (user, history) => {
  return {
    type: EDIT_PROFILE,
    payload: {user, history},
  }
}

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = () => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}
export const changePassword= (user, history) =>{
  return {
    type: CHANGE_PASS,
    payload: {user, history},
  }
}

