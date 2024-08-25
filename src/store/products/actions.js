import {
  GET_PRODUCT_CATEGORY_LIST,
  GET_PRODUCT_CATEGORY_FAIL,
  GET_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_TYPE_LIST,
  GET_PRODUCT_TYPE_LIST_SUCCESS,
  GET_PRODUCT_TYPE_LIST_FAIL,
  GET_PRODUCT_REQUEST_LIST,
  GET_PRODUCT_REQUEST_LIST_SUCCESS,
  GET_PRODUCT_REQUEST_LIST_FAIL,
  SAVE_PRODUCT_REQUEST,
  SAVE_PRODUCT_REQUEST_FAIL,
  SAVE_PRODUCT_REQUEST_SUCCESS,
  CANCEL_PRODUCT_REQUEST,
  CANCEL_PRODUCT_REQUEST_FAIL,
  CANCEL_PRODUCT_REQUEST_SUCCESS,
  GET_PRODUCT_LIST,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_PARENT_LIST,
  GET_PRODUCT_PARENT_LIST_SUCCESS,
  GET_PRODUCT_PARENT_LIST_FAIL,
  SAVE_INVENTORY,
  SAVE_INVENTORY_SUCCESS,
  SAVE_INVENTORY_FAIL,
  UPDATE_INVENTORY,
  UPDATE_INVENTORY_SUCCESS,
  UPDATE_INVENTORY_FAIL,
  CHANGE_INVENTORY,
  CHANGE_INVENTORY_SUCCESS,
  CHANGE_INVENTORY_FAIL,
  RESET_PFLAG,
  LOADING_STATUS,
  DOWNLOAD_PRODUCTS,
  INVENTORY_DOWNLOAD_SUCCESS,
  INVENTORY_DOWNLOAD_FAIL
} from "./actionTypes";

export const getProductCategoryList = () => ({
  type: GET_PRODUCT_CATEGORY_LIST,
})

export const getProductCategoryListSuccess = productCategories => ({
  type: GET_PRODUCT_CATEGORY_SUCCESS,
  payload: productCategories,
})

export const getProductCategoryListFail = error => ({
  type: GET_PRODUCT_CATEGORY_FAIL,
  payload: error,
})


export const getProductTypeList = () => ({
  type: GET_PRODUCT_TYPE_LIST,
})

export const getProductTypeListSuccess = productTypes => ({
  type: GET_PRODUCT_TYPE_LIST_SUCCESS,
  payload: productTypes,
})

export const getProductTypeListFail = error => ({
  type: GET_PRODUCT_TYPE_LIST_FAIL,
  payload: error,
})


export const getProductRequestList = () => ({
  type: GET_PRODUCT_REQUEST_LIST,
})

export const getProductRequestListSuccess = productRequests => ({
  type: GET_PRODUCT_REQUEST_LIST_SUCCESS,
  payload: productRequests,
})

export const getProductRequestListFail = error => ({
  type: GET_PRODUCT_REQUEST_LIST_FAIL,
  payload: error,
})

export const getProductParentList = () => ({
  type: GET_PRODUCT_PARENT_LIST,
})

export const getProductParentListSuccess = products => ({
  type: GET_PRODUCT_PARENT_LIST_SUCCESS,
  payload: products,
})

export const getProductParentListFail = error => ({
  type: GET_PRODUCT_PARENT_LIST_FAIL,
  payload: error,
})


export const getProductList = () => ({
  type: GET_PRODUCT_LIST,
})

export const getProductListSuccess = products => ({
  type: GET_PRODUCT_LIST_SUCCESS,
  payload: products,
})

export const getProductListFail = error => ({
  type: GET_PRODUCT_LIST_FAIL,
  payload: error,
})


export const cancelProductRequest = request => ({
  type: CANCEL_PRODUCT_REQUEST,
  payload: request,
})

export const cancelProductRequestSuccess = productRequest => ({
  type: CANCEL_PRODUCT_REQUEST_SUCCESS,
  payload: productRequest,
})

export const cancelProductRequestFail = error => ({
  type: CANCEL_PRODUCT_REQUEST_FAIL,
  payload: error,
})

export const saveProductRequest = data => ({
  type: SAVE_PRODUCT_REQUEST,
  payload: data,
})

export const saveProductRequestSuccess = request => ({
  type: SAVE_PRODUCT_REQUEST_SUCCESS,
  payload: request,
})

export const saveProductRequestFail = error => ({
  type: SAVE_PRODUCT_REQUEST_FAIL,
  payload: error,
})

export const saveInventory = data => ({
  type: SAVE_INVENTORY,
  payload: data,
})

export const saveInventorySuccess = request => ({
  type: SAVE_INVENTORY_SUCCESS,
  payload: request.data,
  message: request.message,
})

export const saveInventoryFail = error => ({
  type: SAVE_INVENTORY_FAIL,
  payload: error,
})

export const updateInventory = data => ({
  type: UPDATE_INVENTORY,
  payload: data,
})

export const updateInventorySuccess = request => ({
  type: UPDATE_INVENTORY_SUCCESS,
  payload: request,
})

export const updateInventoryFail = error => ({
  type: UPDATE_INVENTORY_FAIL,
  payload: error,
})


export const changeInventoryStatus = request => ({
  type: CHANGE_INVENTORY,
  payload: request,
})

export const changeInventoryStatusSuccess = product => ({
  type: CHANGE_INVENTORY_SUCCESS,
  status_success:'Success',
  payload: product,
})

export const changeInventoryStatusFail = error => ({
  type: CHANGE_INVENTORY_FAIL,
  payload: error,
})


export const InventoryDownloadSuccess = product => ({
  type: INVENTORY_DOWNLOAD_SUCCESS,
  inventory_download_success:"Download link ready",
})

export const InventoryDownloadFail = error => ({
  type: INVENTORY_DOWNLOAD_FAIL,
  payload: error,
})



export const resetpFlag = () => {
  return {
    type: RESET_PFLAG,
  }
}

export const loadingInventoryStatus = loading => ({
  type: LOADING_STATUS,
  payload: loading,
})

export const downloadProducts = values => ({
  type: DOWNLOAD_PRODUCTS,
  payload: values,
})