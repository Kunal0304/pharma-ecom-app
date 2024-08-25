//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";
export const ASSET_URL = "https://admin.pharmwale.com/storage/app/public/";
export const BASE_URL = "https://admin.pharmwale.com/api/v2/seller";
export const API_DOMAIN = "https://admin.pharmwale.com/api/v2/seller";
export const APP_DOMAIN = "https://admin.pharmwale.com/";
// export const ASSET_URL = "https://medimny.pmtinfotech.in/storage/app/public/";
// export const BASE_URL = "https://medimny.pmtinfotech.in/api/v2/seller";
//export const API_DOMAIN = "https://medimny.pmtinfotech.in/";
export const GENERATE_LABEL ="/orders/generate-label/"
export const GENERATE_MENIFEST_REPORT ="/orders/generate-menifest-report/"
export const GENERATE_REMITENCE_REPORT ="/orders/generate-remitence-report/"
export const HEADER_IMAGE=  "headers: { 'Content-Type': 'multipart/form-data', 'x-rapidapi-host': 'file-upload8.p.rapidapi.com', 'x-rapidapi-key': 'your-rapidapi-key-here',}";
//LOGIN
export const POST_AUTH_LOGIN ="/auth/login";
export const POST_AUTH_REGISTER ="/auth/register";
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const GET_SELLER_EDIT="/profile/edit";
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";
export const GET_SELLER_CHANGE_PASS= "/auth/change-password";

//PRODUCTS
export const GET_PRODUCTS = "/products";
export const GET_PRODUCTS_DETAIL = "/product";

//Mails
export const GET_MAILS_LIST = "/mailslists";
export const SELECT_FOLDER = "/folders";
export const GET_SELECTED_MAILS = "/selectedmails";
export const SET_FOLDER_SELECTED_MAILS = "/setfolderonmail";
export const UPDATE_MAIL = "/update/mail";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_SELLER_GROUPS = "/groups";
export const GET_PRODUCT_TYPES = "/types";
export const GET_PRODUCT_CATEGORIES = "/categories";
export const GET_PARENT_PRODUCTS= "/products-parent-search?search=";
export const SAVE_INVENTORY= "/products-add-inventory";
export const UPDATE_INVENTORY= "/products-update-inventory";
export const CHANGE_INVENTORY= "/products-update-status";
export const GET_SELLER_PRODUCTS= "/products-list";
export const GET_DOWNLOAD_ORDERS="/orders/download";
export const GET_DOWNLOAD_PRODUCT="/products-download";
export const DELETE_MENIFESTED = "/orders/oldmenifested/delete/";
export const GET_PRODUCT_REQUESTS = "/requests";
export const CANCEL_PRODUCT_REQUESTS = "/product-request-cancel";
export const ADD_SELLER_GROUP = "/group-save";
export const UPDATE_SELLER_GROUP = "/group-update";
export const GET_SELLER_MEMBERS = "/members";
export const GET_SELLER_DASHBOARD = "/dashboard";
export const ADD_SELLER_MEMBERS ="/add-new-member"
export const UPDATE_SELLER_MEMBERS ="/update-member"
export const UPDATE_SELLER_MEMBERS_STATUS ="/status-member"
export const SET_SELLER_SHOP_VACATION = "/vacation";
export const GET_SELLER_SHOP_VACATION = "/shop-vacation";
export const GET_SELLER_SHOP_COMPLIANCE = "/get-document";
export const SAVE_SELLER_SHOP_COMPLIANCE = "/update-document";
export const SAVE_SELLER_SHOP_BANK = "/update-bank";
export const GET_CONTACTS = "/contacts";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";
export const GET_SELLER_ORDERS = "/orders/list";
export const GET_SELLER_ALL_ORDERS = "/orders/list/all";
export const GET_SELLER_SETTLEMENTS = "settlements";

//ORDERS
export const GET_ORDERS = "/orders";
export const GET_ORDER_DETAIL = "/orders/";
export const ADD_NEW_ORDER = "/add/order";
export const UPDATE_ORDER = "/update/order";
export const DELETE_ORDER = "/delete/order";
export const ORDER_STATUS_CHANGE = "/orders/status";
export const GET_ORDER_TRACK = "/orders/track/";
export const URL_SAVE_PROCESS= "/orders/process-order"
export const URL_DOCKET_IMAGE= "/orders/docket-image-order"
export const URL_MENIFEST_ORDER= "/orders/generate-menifest"

//TICKETS
export const GET_TICKETS = "/tickets/list";
export const GET_TICKET_DETAIL = "/tickets/details/";
export const ADD_TICKET_MESSAGE = "/tickets/message/";
export const ADD_NEW_TICKET = "/tickets/store";
export const UPDATE_TICKET = "/tickets/update";

//SETTLEMENTS
export const GET_SETTLEMT_LIST ="/settlements";

//CART DATA
export const GET_CART_DATA = "/cart";

//CUSTOMERS
export const GET_CUSTOMERS = "/customers";
export const ADD_NEW_CUSTOMER = "/add/customer";
export const UPDATE_CUSTOMER = "/update/customer";
export const DELETE_CUSTOMER = "/delete/customer";

//SHOPS
export const GET_SHOPS = "/shops";

//CRYPTO
export const GET_WALLET = "/wallet";
export const GET_CRYPTO_ORDERS = "/crypto/orders";
export const GET_CRYPTO_PRODUCTS = "/crypto-products";

//INVOICES
export const GET_INVOICES = "/invoices";
export const GET_INVOICE_DETAIL = "/invoice";

// JOBS
export const GET_JOB_LIST = "/jobs";
export const ADD_NEW_JOB_LIST = "/add/job";
export const UPDATE_JOB_LIST = "/update/job";
export const DELETE_JOB_LIST = "/delete/job";

//Apply Jobs
export const GET_APPLY_JOB = "/jobApply";
export const DELETE_APPLY_JOB = "add/applyjob";

//PROJECTS
export const GET_PROJECTS = "/projects";
export const GET_PROJECT_DETAIL = "/project";
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

//TASKS
export const GET_TASKS = "/tasks";

//CONTACTS
export const GET_USERS = "/users";
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
export const UPDATE_USER = "/update/user";
export const DELETE_USER = "/delete/user";

//Blog
export const GET_VISITOR_DATA = "/visitor-data";

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data";
export const GET_YEARLY_DATA = "/yearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

export const TOP_SELLING_DATA = "/top-selling-data";

//dashboard crypto
export const GET_WALLET_DATA = "/wallet-balance-data";

//dashboard jobs
export const GET_STATISTICS_DATA = "/Statistics-data";

export const GET_EARNING_DATA = "/earning-charts-data";

export const GET_PRODUCT_COMMENTS = "/comments-product";

export const ON_LIKNE_COMMENT = "/comments-product-action";

export const ON_ADD_REPLY = "/comments-product-add-reply";

export const ON_ADD_COMMENT = "/comments-product-add-comment";