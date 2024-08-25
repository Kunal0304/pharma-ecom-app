import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_ORDERS,
  GET_SETTLEMENTS,
  GET_ORDER_DETAIL,
  GET_DASHBOARD,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  GET_TICKETS,
  GET_TICKET_DETAIL,
  ADD_NEW_TICKET,
  ADD_TICKET_MESSAGE,
  UPDATE_TICKET,
  ORDER_STATUS,
  GET_ORDER_TRACK,
  GET_ALL_ORDERS,
  SAVE_PROCESS,
  DOWNLOAD_ORDERS,
  DELETE_OLD_MENEFIST,
  SAVE_DOCKET_IMAGE,
  SAVE_MENIFEST_ORDER
} from "./actionTypes";
import {
  getSettlementSuccess,
  getSettlementFail,
  getDashboardSuccess,
  getDashboardFail,
  getOrdersListsFail,
  getOrdersListsSuccess,
  getSettlementListsFail,
  getSettlementListsSuccess,
  getOrderDetailFail,
  getOrderDetailSuccess,
  addNewOrderFail,
  addNewOrderSuccess,
  updateOrdersSuccess,
  updateOrdersFail,
  deleteOrdersSuccess,
  deleteOrdersFail,
  getTicketsListsFail,
  getTicketsListsSuccess,
  getTicketDetailFail,
  getTicketDetailSuccess,
  addNewTicketFail,
  addNewTicketSuccess,
  loadingStatus,
  addTicketMessageFail,
  addTicketMessageSuccess,
  addOrderStatusSuccess,
  addOrderStatusSuccessFail,
  getOrderTrackSuccess,
  getOrderTrackFail,
  getAllordersSuccess,
  getAllordersFail,
  saveProcessSuccess,
  saveProcessFail,
  saveDocketImageSuccess,
  saveDocketImageFail,
  saveMenifestOrderSuccess,
  saveMenifestOrderFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getSettlements,
  getOrders,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getSellerDashboard,
  getTickets,
  getTicketDetails,
  addNewTicket,
  addTicketMessage,
  updateTicket,
  getOrderDetails,
  updateorderStatus,
  getOrderTrack,
  getAllorders,
  saveOrderProcess,
  saveDocketImage,
  saveMenifestOrder,
  downloadOrders,
  deleteOldMenifest,
  updateOrderNew,
} from "helpers/backend_helper";
// import { take } from "lodash";

function* fetchSettlements() {
  try {
    const response = yield call(getSettlements);
    yield put(getSettlementSuccess(response.data));
  } catch (error) {
    yield put(getSettlementFail(error));
  }
}

function* fetchDashboard() {
  try {
    const response = yield call(getSellerDashboard);
    yield put(getDashboardSuccess(response.data));
  } catch (error) {
    yield put(getDashboardFail(error));
  }
}

function* fetchTickets() {
  try {
    yield put(loadingStatus(true));
    const response = yield call(getTickets);
    if (response.status) {
      yield put(getTicketsListsSuccess(response.data));
      yield put(loadingStatus(false));
    }
    else {
      yield put(getTicketsListsFail(response.error));
      yield put(loadingStatus(false));

    }
  } catch (error) {
    yield put(getTicketsListsFail(error));
    yield put(loadingStatus(false));

  }
}

function* fetchTicketDetail({ ticketID }) {
  try {
    const response = yield call(getTicketDetails, ticketID);
    yield put(getTicketDetailSuccess(response.data));
  } catch (error) {
    yield put(getTicketDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    yield put(loadingStatus(true));

    const response = yield call(getOrders);
    if (response.status) {
      yield put(loadingStatus(false));

      yield put(getOrdersListsSuccess(response.data));
    }
    else {
      yield put(loadingStatus(false));

      yield put(getOrdersListsFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false));

    yield put(getOrdersListsFail(error));
  }
}


function* fetchOrderDetail({ orderID }) {
  try {
    const response = yield call(getOrderDetails, orderID);
    yield put(getOrderDetailSuccess(response.data));
  } catch (error) {
    yield put(getOrderDetailFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
console.log(order, "order")
  try {
    const response = yield call(updateOrder, order); 
    console.log(response, "aaaa") 
    yield put(updateOrdersSuccess(response));
  } catch (error) {
    yield put(updateOrdersFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    yield put(deleteOrdersSuccess(response));
  } catch (error) {
    yield put(deleteOrdersFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addNewOrderSuccess(response));
  } catch (error) {
    yield put(addNewOrderFail(error));
  }
}


function* onAddNewTicket({ payload: ticket }) {
  try {
    yield put(loadingStatus(true));
    const response = yield call(addNewTicket, ticket);
    if (response.status) {
      yield put(addNewTicketSuccess(response.message));
      yield put(loadingStatus(false));
    }
    else {
      yield put(loadingStatus(false));
      yield put(addNewTicketFail(response.error));
    }



    // try {
    //   const response = yield call(getTickets);
    //   yield put(getTicketsListsSuccess(response.data));
    // } catch (error) {
    //   yield put(getTicketsListsFail(error));
    // }
  } catch (error) {
    yield put(loadingStatus(false));
    yield put(addNewTicketFail(error));
  }
}



function* onAddTicketMessage({ payload: message }) {
  try {
    const response = yield call(addTicketMessage, message);
    yield put(addTicketMessageSuccess(response));
    try {
      const response = yield call(getTicketDetails, message.ticket_number);
      yield put(getTicketDetailSuccess(response.data));
    } catch (error) {
      yield put(getTicketDetailFail(error));
    }
  } catch (error) {
    yield put(addTicketMessageFail(error));
  }
}
function* orderStatusUpdate({ payload: status }) {
  try {
    yield put(loadingStatus(true));
    const response = yield call(updateorderStatus, status);
    if(response.status==true){
      yield put(loadingStatus(false));
      yield put(addOrderStatusSuccess(response.msg));
    }else{
      yield put(loadingStatus(false));
      yield put(addOrderStatusSuccessFail(error));
    }
    
  } catch (error) {
    yield put(loadingStatus(false));
    yield put(addOrderStatusSuccessFail(error));
  }
}

function* fetchTrackDetail({ orderID }) {
  try {
    yield put(loadingStatus(true));
    const response = yield call(getOrderTrack, orderID);
    if(response.status==true){
      yield put(loadingStatus(false));
    yield put(getOrderTrackSuccess(response.data));
    }else{
      yield put(loadingStatus(false));
      yield put(getOrderTrackFail(error));
    }
  } catch (error) {
    yield put(getOrderTrackFail(error));
  }
}
function* getAllOrders() {
  try {
    yield put(loadingStatus(true));

    const response = yield call(getAllorders);
    if (response.status) {
      yield put(loadingStatus(false));

      yield put(getAllordersSuccess(response.data));
    }
    else {
      yield put(loadingStatus(false));

      yield put(getAllordersFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false));

    yield put(getAllordersFail(error));
  }
}

function* saveProcess({ payload: orderprocess }) {
  try {
    yield put(loadingStatus(true))
    const response = yield call(saveOrderProcess, orderprocess);
    if (response.status == true) {
      yield put(loadingStatus(false))
      yield put(saveProcessSuccess(response.message));
    }
    else {
      yield put(loadingStatus(false))
      yield put(saveProcessFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false))
    yield put(saveProcessFail(error));
  }
}

function* saveDocketImages({ payload: image }) {
  try {
    yield put(loadingStatus(true))
    const response = yield call(saveDocketImage, image);
    if (response.status==true) {
      yield put(loadingStatus(false))
      yield put(saveDocketImageSuccess(response.message));
    }
    else {
      yield put(loadingStatus(false))
      yield put(saveDocketImageFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false))
    yield put(saveDocketImageFail(error));
  }
}

function* saveMenifestOrders({ payload: menifest }) {
  try {
    yield put(loadingStatus(true))
    const response = yield call(saveMenifestOrder, menifest);
    if (response.status==true) {
      yield put(loadingStatus(false))
      yield put(saveMenifestOrderSuccess(response.message));
    }
    else {
      yield put(loadingStatus(false))
      yield put(saveMenifestOrderFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false))
    yield put(saveMenifestOrderFail(error));
  }
}

function* downloadorderdata({ payload: values }) {
  try {
    yield put(loadingStatus(true));
    const response = yield call(downloadOrders, values);
    if (response.status==true) {
      yield put(loadingStatus(false));
      yield put(getOrdersListsSuccess(response.data));
    }
    else {
      yield put(loadingStatus(false));
      yield put(getOrdersListsFail(response.error));
    }
  } catch (error) {
    yield put(loadingStatus(false));
    yield put(getOrdersListsFail(error));
  }
}

function* onDeleteOldMenifested({ payload: oldMenifested }) {
  try {
    const response = yield call(deleteOldMenifest, oldMenifested);
    if (response.status) {
      yield put(saveProcessSuccess(response.message));
    }
    else {
      yield put(saveProcessFail(response.error));
    }
  } catch (error) {
    yield put(saveProcessFail(error));
  }
}

function* orderSaga() {
  yield takeEvery(GET_SETTLEMENTS, fetchSettlements);
  yield takeEvery(ADD_NEW_TICKET, onAddNewTicket);
  yield takeEvery(GET_DASHBOARD, fetchDashboard);
  yield takeEvery(GET_TICKETS, fetchTickets);
  yield takeEvery(ADD_TICKET_MESSAGE, onAddTicketMessage);
  yield takeEvery(GET_TICKET_DETAIL, fetchTicketDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_ORDER_DETAIL, fetchOrderDetail);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(ORDER_STATUS, orderStatusUpdate);
  yield takeEvery(GET_ORDER_TRACK, fetchTrackDetail);
  yield takeEvery(GET_ALL_ORDERS, getAllOrders);
  yield takeEvery(SAVE_PROCESS, saveProcess);
  yield takeEvery(SAVE_DOCKET_IMAGE, saveDocketImages);
  yield takeEvery(SAVE_MENIFEST_ORDER, saveMenifestOrders);
  yield takeEvery(DOWNLOAD_ORDERS, downloadorderdata);
  yield takeEvery(DELETE_OLD_MENEFIST, onDeleteOldMenifested);
}

export default orderSaga;
