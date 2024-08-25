import {
    GET_PRODUCT_CATEGORY_FAIL,
    GET_PRODUCT_CATEGORY_SUCCESS,
    GET_PRODUCT_TYPE_LIST_FAIL,
    GET_PRODUCT_TYPE_LIST_SUCCESS,
    GET_PRODUCT_REQUEST_LIST_FAIL,
    GET_PRODUCT_REQUEST_LIST_SUCCESS,
    SAVE_PRODUCT_REQUEST_SUCCESS,
    SAVE_PRODUCT_REQUEST_FAIL,
    CANCEL_PRODUCT_REQUEST_SUCCESS,
    CANCEL_PRODUCT_REQUEST_FAIL,
    GET_PRODUCT_LIST_SUCCESS,
    GET_PRODUCT_LIST_FAIL,
    GET_PRODUCT_PARENT_LIST_SUCCESS,
    GET_PRODUCT_PARENT_LIST_FAIL,
    SAVE_INVENTORY_SUCCESS,
    SAVE_INVENTORY_FAIL,
    UPDATE_INVENTORY_SUCCESS,
    UPDATE_INVENTORY_FAIL,
    CHANGE_INVENTORY_SUCCESS,
    CHANGE_INVENTORY_FAIL,
    RESET_PFLAG,
    LOADING_STATUS,
    INVENTORY_DOWNLOAD_SUCCESS,
    INVENTORY_DOWNLOAD_FAIL

} from "./actionTypes";

const INIT_STATE = {
    productRequests: [],
    parentProducts: [],
    products: [],
    productTypes: [],
    productCategories: [],
    error: "",
    success: "",
    status_success: "",
    inventory_download_success:"",
    loading: false
}

const ProductReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                productCategories: action.payload,
            };
        case GET_PRODUCT_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_PRODUCT_TYPE_LIST_SUCCESS:
            return {
                ...state,
                productTypes: action.payload,
            };
        case GET_PRODUCT_TYPE_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_PRODUCT_REQUEST_LIST_SUCCESS:
            return {
                ...state,
                productRequests: action.payload,
            };
        case GET_PRODUCT_PARENT_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_PRODUCT_PARENT_LIST_SUCCESS:
            return {
                ...state,
                parentProducts: action.payload,
            };
        case GET_PRODUCT_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case GET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_PRODUCT_REQUEST_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SAVE_PRODUCT_REQUEST_SUCCESS:
            return {
                ...state,
                productRequests: [...state.productRequests, action.payload],
            };
        case SAVE_PRODUCT_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case SAVE_INVENTORY_SUCCESS:
            return {
                ...state,
                success: action.payload,
            };
        case SAVE_INVENTORY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case UPDATE_INVENTORY_SUCCESS:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id == action.payload.id
                        ? { product, ...action.payload }
                        : product),
            };
        case UPDATE_INVENTORY_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case INVENTORY_DOWNLOAD_SUCCESS:
            return {
                ...state,
                inventory_download_success: action.inventory_download_success,
            };
        case INVENTORY_DOWNLOAD_FAIL:
            return {
                ...state,
                error: action.error,
            };

        case CANCEL_PRODUCT_REQUEST_SUCCESS:
            return {
                ...state,
                productRequests: action.payload,
            };
        case CANCEL_PRODUCT_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload,
            };

        case CHANGE_INVENTORY_SUCCESS:
            return {
                ...state,
                status_success:'Success',
                products: action.payload,
            };
        case CHANGE_INVENTORY_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case LOADING_STATUS:
            return {
                ...state,
                loading: action.payload,
            }
        case RESET_PFLAG:
            return {
                ...state,
                error: null,
                success: null,
            };
        default:
            return state
    }
}

export default ProductReducer;