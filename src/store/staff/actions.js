import {
  GET_MEMBER_LIST,
  GET_MEMBER_LIST_FAIL,
  GET_MEMBER_LIST_SUCCESS,
  ADD_NEW_MEMBER_LIST,
  ADD_MEMBER_LIST_SUCCESS,
  ADD_MEMBER_LIST_FAIL,
  DELETE_MEMBER_LIST,
  DELETE_MEMBER_LIST_SUCCESS,
  DELETE_MEMBER_LIST_FAIL,
  SHOP_VECATION,
  SHOP_VECATION_SUCCESS,
  SHOP_VECATION_FAIL,
  GET_SHOP_VACATION,
  GET_SHOP_VACATION_FAIL,
  GET_SHOP_VACATION_SUCCESS,
  SHOP_COMPLIANCE,
  SHOP_COMPLIANCE_SUCCESS,
  SHOP_COMPLIANCE_FAIL,
  SHOP_BANK,
  SHOP_BANK_SUCCESS,
  SHOP_BANK_FAIL,
  GET_SHOP_COMPLIANCE,
  GET_SHOP_COMPLIANCE_FAIL,
  GET_SHOP_COMPLIANCE_SUCCESS,
  CHANGE_STATUS_MEMBER,
  CHANGE_STATUS_MEMBER_SUCCESS,
  CHANGE_STATUS_MEMBER_FAIL,
  LOADING_STATUS
} from "./actionTypes";

export const getShopCompliance = () => ({
 type:GET_SHOP_COMPLIANCE
})

export const getShopComplianceSuccess = compliances => ({
  type: GET_SHOP_COMPLIANCE_SUCCESS,
  payload: compliances,
})

export const getShopComplianceFail = error => ({
  type: GET_SHOP_COMPLIANCE_FAIL,
  payload: error,
})

 export const saveShopCompliance = data => ({
  type: SHOP_COMPLIANCE,
  payload: data,
})
 
 export const saveShopComplianceSuccess = compliances => ({
   type: SHOP_COMPLIANCE_SUCCESS,
   success:'Compliance Successfully Uploaded',
   payload: compliances,
 })


 export const saveShopComplianceFail = error => ({
   type: SHOP_COMPLIANCE_FAIL,
   payload: error,
 })

 export const saveShopBank = data => ({
  type: SHOP_BANK,
  payload: data,
})
 
 export const saveShopBankSuccess = bank => ({
   type: SHOP_BANK_SUCCESS,
   success:"Banificiery Details Saved Successfullu",
   payload: bank,
 })


 export const saveShopBankFail = error => ({
   type: SHOP_BANK_FAIL,
   payload: error,
 })

 
export const getMemberList = () => ({
  type: GET_MEMBER_LIST,
})

export const getMemberListSuccess = members => ({
  type: GET_MEMBER_LIST_SUCCESS,
  payload: members,
})

export const getMemberListFail = error => ({
  type: GET_MEMBER_LIST_FAIL,
  payload: error,
})

export const getShopVacation = () => ({
  type: GET_SHOP_VACATION,
})

export const getShopVacationSuccess = vacation => ({
  type: GET_SHOP_VACATION_SUCCESS,
  payload: vacation,
})

export const getShopVacationFail = error => ({
  type: GET_SHOP_VACATION_FAIL,
  payload: error,
})


export const setShopVacation = () => ({
  type:SHOP_VECATION
})

export const setShopVacationSuccess = (vacation) => ({
  type:SHOP_VECATION_SUCCESS,
  payload:vacation
})

export const setShopVacationFail = error => ({
  type:SHOP_VECATION_FAIL,
  payload:error
})


export const addNewMemberList = data => ({
  type: ADD_NEW_MEMBER_LIST,
  payload: data,
})

export const addMemberListSuccess = member => ({
  type: ADD_MEMBER_LIST_SUCCESS,
  payload: member,
})

export const addMemberListFail = error => ({
  type: ADD_MEMBER_LIST_FAIL,
  payload: error,
})

export const updateMemberList = member => ({
  type: CHANGE_STATUS_MEMBER,
  payload: member,
})

export const updateMemberListSuccess = member => ({
  type: CHANGE_STATUS_MEMBER_SUCCESS,
  payload: member,
})

export const updateMemberListFail = error => ({
  type: CHANGE_STATUS_MEMBER_FAIL,
  payload: error,
})


export const updateMemberStatus = member => ({
  type: CHANGE_STATUS_MEMBER,
  payload: member,
})

export const updateMemberStatusSuccess = member => ({
  type: CHANGE_STATUS_MEMBER_SUCCESS,
  payload: member,
})

export const updateMemberStatusFail = error => ({
  type: CHANGE_STATUS_MEMBER_FAIL,
  payload: error,
})

export const deleteMemberList = data => ({
  type: DELETE_MEMBER_LIST,
  payload: data,
})

export const deleteMemberListSuccess = data => ({
  type: DELETE_MEMBER_LIST_SUCCESS,
  payload: data,
})

export const deleteMemberListFail = error => ({
  type: DELETE_MEMBER_LIST_FAIL,
  payload: error,
})

export const loadingStaffStatus = loading => ({
  type: LOADING_STATUS,
  payload: loading,
})

