import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN,LOADING_STATUS } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess,loginLoadingStatus } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postAuthLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  console.log(user, "user")

  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      console.log("first")
      const response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      );
      console.log(response, "response")
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }else if (process.env.REACT_APP_DEFAULTAUTH === "auth") {
      yield put(loginLoadingStatus(true));
      const response = yield call(postAuthLogin, {
        email: user.email,
        password: user.password,
      });

      if(response.status==true){
        yield put(loginLoadingStatus(false));
        localStorage.removeItem("authUser");
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
      }else{
        yield put(loginLoadingStatus(false));
     
        yield put(apiError(response.message));
        return ;
      }

    }
    window.location.href='/dashboard';
   // history('/dashboard');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    window.location.href='/login';
    //history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    if(response)
    history("/dashboard");
  } catch (error) {
    console.log("error",error)
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
