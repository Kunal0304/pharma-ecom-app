import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { EDIT_PROFILE, CHANGE_PASS } from "./actionTypes"
import { profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper"
import {postEditProfile, postChangePass} from "helpers/backend_helper"

const fireBaseBackend = getFirebaseBackend()

function* editProfile({ payload:  {user, history} }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))      
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeProfile, {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "auth") {
      const response = yield call(postEditProfile, user)
      if(response.status)
      {
        yield put(profileSuccess(response.msg))
        localStorage.removeItem("authUser");
        history('/logout');
      }
      else{
        yield put(profileError(response.error))
      }
    }
  } catch (error) {
    yield put(profileError(error))
  }
}

function* changePassword({ payload:  {user, history} }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "auth") {
      const response = yield call(postChangePass, user)
      if(response.status)
      {
        yield put(profileSuccess(response.msg))
        localStorage.removeItem("authUser");
        history('/logout');
      }
      else{
        yield put(profileError(response.error))
      }
    }
  } catch (error) {
    yield put(profileError(error))
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile)
  yield takeEvery(CHANGE_PASS, changePassword)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
