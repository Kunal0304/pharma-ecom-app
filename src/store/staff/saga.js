import { call, put, takeEvery } from "redux-saga/effects"

import { SHOP_VECATION, GET_MEMBER_LIST, ADD_NEW_MEMBER_LIST, SHOP_BANK, UPDATE_MEMBER_LIST, DELETE_MEMBER_LIST, GET_SHOP_VACATION, GET_SHOP_COMPLIANCE, SHOP_COMPLIANCE, CHANGE_STATUS_MEMBER } from "./actionTypes";
import {
    getMemberListSuccess,
    getMemberListFail,
    addMemberListSuccess,
    addMemberListFail,
    updateMemberListSuccess,
    updateMemberListFail,
    deleteMemberListSuccess,
    deleteMemberListFail,
    setShopVacationSuccess,
    setShopVacationFail,
    getShopVacationSuccess,
    getShopVacationFail,
    getShopComplianceSuccess,
    getShopComplianceFail,
    saveShopComplianceSuccess,
    saveShopComplianceFail,
    saveShopBankSuccess,
    saveShopBankFail,
    updateMemberStatusSuccess,
    updateMemberStatusFail,
    loadingStaffStatus
} from "./actions"

import {
    updateMember,
    updateMemberStatus,
    getSellerMembers,
    addNewMemberList,
    deleteJobList,
    setSellerShopVacation,
    getSellerShopVacation,
    getSellerShopCompliance,
    saveSellerShopCompliance,
    saveSellerShopBankDetail
} from "helpers/fakebackend_helper";

function* getSellerShopCompliances() {
    try {
        yield put(loadingStaffStatus(true))
        const response = yield call(getSellerShopCompliance)
        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(getShopComplianceSuccess(response.data));
        } else {
            yield put(loadingStaffStatus(false));
            yield put(getShopComplianceFail(response.message));
        }

    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(getShopComplianceFail(error))
    }

}

function* saveSellerShopCompliances({ payload: data }) {
    try {
        yield put(loadingStaffStatus(true));
        const response = yield call(saveSellerShopCompliance, data)

        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(saveShopComplianceSuccess(response.data))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(saveShopComplianceFail(response.message))
        }

    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(saveShopComplianceFail(error))
    }

}

function* saveSellerShopBank({ payload: data }) {
    try {
        yield put(loadingStaffStatus(true));
        const response = yield call(saveSellerShopBankDetail, data)

        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(saveShopBankSuccess(response.data));
        } else {
            yield put(loadingStaffStatus(false));
            yield put(saveShopBankFail(response.message));
        }

    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(saveShopBankFail(error))
    }

}

function* getSellerShopVacations() {
    try {
        const response = yield call(getSellerShopVacation)

        if (response.status == true) yield put(getShopVacationSuccess(response.data))
        else yield put(getShopVacationFail(response.message))

    } catch (error) {
        yield put(getShopVacationFail(error))
    }

}

function* setSellerShopVacations() {
    try {
        const response = yield call(setSellerShopVacation)
        if (response.status == true) yield put(setShopVacationSuccess(response.data))
        else yield put(setShopVacationFail(response.message))

    } catch (error) {
        yield put(setShopVacationFail(error))
    }

}

function* fetchSellerStaffList() {
    try {
        yield put(loadingStaffStatus(true));
        const response = yield call(getSellerMembers)
        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(getMemberListSuccess(response.data))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(getMemberListFail(response.message))
        }

    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(getMemberListFail(error))
    }

}


function* onAddNewStaffList({ payload: data }) {
    try {
        yield put(loadingStaffStatus(true));
        const response = yield call(addNewMemberList, data)
        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(addMemberListSuccess(response))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(addMemberListFail(response.message))
        }
    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(addMemberListFail(error))
    }
}

function* onUpdateStaffList({ payload: data }) {

    try {
        yield put(loadingStaffStatus(true));
        const response = yield call(updateMember, data)
        if (response.status == true) {
            yield put(updateMemberListSuccess(response))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(updateMemberListFail(response.message))
        }
    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(updateMemberListFail(error))
    }
}

function* onUpdateStaffStatusList({ payload: data }) {

    try {
        const response = yield call(updateMemberStatus, data)
        if (response.status == true) {
            yield put(loadingStaffStatus(false));
            yield put(updateMemberStatusSuccess(response))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(updateMemberStatusFail(response.message));
        }
    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(updateMemberStatusFail(error))
    }
}



function* onDeleteStaffList({ payload: data }) {

    try {
        const response = yield call(deleteJobList, data)
        if (response.status == true) {
            yield put(loadingStaffStatus(true));
            yield put(deleteMemberListSuccess(response))
        } else {
            yield put(loadingStaffStatus(false));
            yield put(deleteMemberListFail(response.message))

        }
    } catch (error) {
        yield put(loadingStaffStatus(false));
        yield put(deleteMemberListFail(error))
    }
}

function* staffSaga() {
    yield takeEvery(CHANGE_STATUS_MEMBER, onUpdateStaffStatusList);
    yield takeEvery(GET_SHOP_COMPLIANCE, getSellerShopCompliances);
    yield takeEvery(SHOP_COMPLIANCE, saveSellerShopCompliances);
    yield takeEvery(GET_SHOP_VACATION, getSellerShopVacations);
    yield takeEvery(GET_MEMBER_LIST, fetchSellerStaffList);
    yield takeEvery(SHOP_VECATION, setSellerShopVacations);
    yield takeEvery(ADD_NEW_MEMBER_LIST, onAddNewStaffList);
    yield takeEvery(UPDATE_MEMBER_LIST, onUpdateStaffList);
    yield takeEvery(DELETE_MEMBER_LIST, onDeleteStaffList);
    yield takeEvery(SHOP_BANK, saveSellerShopBank);
}

export default staffSaga;