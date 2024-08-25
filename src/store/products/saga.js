import { call, put, takeEvery } from "redux-saga/effects"

import { UPDATE_INVENTORY,SAVE_INVENTORY,GET_PRODUCT_LIST, GET_PRODUCT_PARENT_LIST, GET_PRODUCT_CATEGORY_LIST, GET_PRODUCT_REQUEST_LIST, GET_PRODUCT_TYPE_LIST, SAVE_PRODUCT_REQUEST, CANCEL_PRODUCT_REQUEST, CHANGE_INVENTORY, DOWNLOAD_PRODUCTS } from "./actionTypes";
import {
    getProductCategoryListSuccess,
    getProductCategoryListFail,
    getProductTypeListSuccess,
    getProductTypeListFail,
    getProductRequestListSuccess,
    getProductRequestListFail,
    getProductListSuccess,
    getProductListFail,
    getProductParentListSuccess,
    getProductParentListFail,
    saveProductRequestSuccess,
    saveProductRequestFail,
    cancelProductRequestSuccess,
    cancelProductRequestFail,
    saveInventorySuccess,
    saveInventoryFail,
    updateInventorySuccess,
    updateInventoryFail,
    changeInventoryStatusFail,
    changeInventoryStatusSuccess,
    loadingInventoryStatus,
    InventoryDownloadFail,
    InventoryDownloadSuccess

} from "./actions"

import {
    downloadProduct,
    updateSellerInventory,
    saveSellerInventory,
    getParentProducts,
    getSellerProducts,
    cancelProductRequest,
    addProductRequest,
    getProductTypes,
    getProductCategories,
    getProductRequests,
    changeSallerInventory
} from "helpers/backend_helper";

function* fetchProductTypesList() {
    try {
        const response = yield call(getProductTypes)
        if (response.status == true) yield put(getProductTypeListSuccess(response.data))
        else yield put(getProductTypeListFail(response.message))

    } catch (error) {
        yield put(getProductTypeListFail(error))
    }

}

function* fetchProductCategoriesList() {
    try {
        const response = yield call(getProductCategories)
        if (response.status == true) yield put(getProductCategoryListSuccess(response.data))
        else yield put(getProductCategoryListFail(response.message))

    } catch (error) {
        yield put(getProductCategoryListFail(error))
    }

}


function* fetchParentProductsList() {
    try {
        const response = yield call(getParentProducts)
        if (response.status == true) yield put(getProductParentListSuccess(response.data))
        else yield put(getProductParentListFail(response.message))

    } catch (error) {
        yield put(getProductParentListFail(error))
    }

}

function* fetchProductsList() {
    try {
        loadingInventoryStatus(true)
        const response = yield call(getSellerProducts)
        if (response.status == true){
            loadingInventoryStatus(false);
             yield put(getProductListSuccess(response.data));
        }else{ 
            loadingInventoryStatus(false);
            yield put(getProductListFail(response.error)); 
        }

    } catch (error) {
        loadingInventoryStatus(false);
        yield put(getProductListFail(error))
    }

}


function* fetchProductRequestsList() {
    try {
        const response = yield call(getProductRequests)
        if (response.status == true) yield put(getProductRequestListSuccess(response.data))
        else yield put(getProductRequestListFail(response.message))

    } catch (error) {
        yield put(getProductRequestListFail(error))
    }

}

function* saveProductRequests({ payload: data }) {
    try {
        const response = yield call(addProductRequest, data)
        if (response.status == true) yield put(saveProductRequestSuccess(response.data))
        else yield put(saveProductRequestFail(response.message))

    } catch (error) {
        yield put(saveProductRequestFail(error))
    }

}

function* cancelProductRequests({ payload: data }) {
    try {
        const response = yield call(cancelProductRequest, data)
        if (response.status == true) yield put(cancelProductRequestSuccess(response.data))
        else yield put(cancelProductRequestFail(response.message))

    } catch (error) {
        yield put(cancelProductRequestFail(error))
    }

}

function* changeProductStatuss({ payload: data }) {
    try {
        yield put(loadingInventoryStatus(true));
        const response = yield call(changeSallerInventory, data)
        if (response.status == true) yield put(changeInventoryStatusSuccess(response.data))
        else yield put(changeInventoryStatusFail(response.message))
        yield put(loadingInventoryStatus(false));
    } catch (error) {
        yield put(loadingInventoryStatus(false));
        yield put(changeInventoryStatusFail(error))
    }

}

function* saveInventories({ payload: data }){
    try {
        yield put(loadingInventoryStatus(true))
        const response = yield call(saveSellerInventory, data)
        if (response.status == true){ 
            yield put(saveInventorySuccess(response.message))
            yield put(loadingInventoryStatus(false))
        }else{ yield put(saveInventoryFail(response.message)) }

    } catch (error) {
        yield put(saveInventoryFail(error))
        yield put(loadingInventoryStatus(false))
    }
}

function* updateInventories({ payload: data }){
    try {
        const response = yield call(updateSellerInventory, data)
        if (response.status == true) yield put(updateInventorySuccess(response.data))
        else yield put(updateInventoryFail(response.message))

    } catch (error) {
        yield put(updateInventoryFail(error))
    }
}

function* downloadProducts({payload: values})
{
  try {
    const response = yield call(downloadProduct, values);
    yield put(loadingInventoryStatus(true));
    if (response.status == true) yield put(InventoryDownloadSuccess(response.data))
    else yield put(InventoryDownloadFail(response.message))
    
    yield put(loadingInventoryStatus(false));

  } catch (error) {
    yield put(loadingInventoryStatus(false));
    yield put(InventoryDownloadFail(response.message))
  }

}

function* groupsSaga() {
    yield takeEvery(UPDATE_INVENTORY,updateInventories);
    yield takeEvery(CHANGE_INVENTORY, changeProductStatuss);
    yield takeEvery(SAVE_INVENTORY,saveInventories);
    yield takeEvery(GET_PRODUCT_PARENT_LIST,fetchParentProductsList);
    yield takeEvery(CANCEL_PRODUCT_REQUEST, cancelProductRequests);
    yield takeEvery(SAVE_PRODUCT_REQUEST, saveProductRequests);
    yield takeEvery(GET_PRODUCT_LIST, fetchProductsList);
    yield takeEvery(GET_PRODUCT_REQUEST_LIST, fetchProductRequestsList);
    yield takeEvery(GET_PRODUCT_TYPE_LIST, fetchProductTypesList);
    yield takeEvery(GET_PRODUCT_CATEGORY_LIST, fetchProductCategoriesList);
    yield takeEvery(DOWNLOAD_PRODUCTS,downloadProducts);
}

export default groupsSaga;