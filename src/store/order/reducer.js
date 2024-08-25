import {
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_SETTLEMENTS_SUCCESS,
  GET_SETTLEMENTS_FAIL,
  GET_ORDER_DETAIL_FAIL,
  GET_ORDER_DETAIL_SUCCESS,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_TICKETS_FAIL,
  GET_TICKETS_SUCCESS,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  GET_TICKET_DETAIL_FAIL,
  GET_TICKET_DETAIL_SUCCESS,
  ADD_TICKET_MESSAGE_SUCCESS,
  ADD_TICKET_MESSAGE_FAIL,
  ORDER_STATUS_SUCCESS,
  ORDER_STATUS_FAIL,
  GET_ORDER_TRACK_FAIL,
  GET_ORDER_TRACK_SUCCESS,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  SAVE_PROCESS_SUCCESS,
  SAVE_PROCESS_FAIL,
  RESET_FLAG,
  SAVE_DOCKET_IMAGE_SUCCESS,
  SAVE_DOCKET_IMAGE_FAIL,
  SAVE_MENIFEST_ORDER_SUCCESS,
  SAVE_MENIFEST_ORDER_FAIL,
  LOADING_STATUS

} from "./actionTypes";

const INIT_STATE = {
  dashboard: {},
  ticket_detail: {},
  tickets: {},
  settlements: {},
  orders: {
    open:null,
    history:[],
    old_menifest:[]
  },
  order_detail: {},
  track: {},
  error: "",
  success: "",
  downloadSuccess:"",
  loading:false,
  allorders: {},
  orderProcess: {},
};

const OrderReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
      };

    case GET_DASHBOARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SETTLEMENTS_SUCCESS:
      return {
        ...state,
        settlements: action.payload,
      };

    case GET_SETTLEMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        order_detail: action.payload,
      };

    case GET_ORDER_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          (order.id + '') === (action.payload.id + '')
            ? { order, ...action.payload }
            : order
        ),
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id !== action.payload
        ),
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_TICKETS_SUCCESS:
      return {
        ...state,
        tickets: action.payload,
      };

    case GET_TICKETS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        ticket_detail: action.payload,
      };

    case GET_TICKET_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOADING_STATUS:
      return {
        ...state,
        loading:action.payload,
      }  
    case ADD_TICKET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case ADD_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_TICKET_MESSAGE_SUCCESS:
      return {
        ...state,
      };

    case ADD_TICKET_MESSAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };



    case UPDATE_TICKET_SUCCESS:
      return {
        ...state
      };

    case UPDATE_TICKET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SETTLEMENTS_SUCCESS:
      return {
        ...state,
        settlement: action.payload,
      };

    case GET_SETTLEMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ORDER_STATUS_SUCCESS:
      return {
        ...state,
        settlement: action.payload,
      };

    case ORDER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ORDER_TRACK_SUCCESS:
      return {
        ...state,
        track: action.payload,
      };

    case GET_ORDER_TRACK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        allorders: action.payload,
      };

    case GET_ALL_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SAVE_PROCESS_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case SAVE_PROCESS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SAVE_DOCKET_IMAGE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case SAVE_DOCKET_IMAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      case SAVE_MENIFEST_ORDER_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case SAVE_MENIFEST_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case RESET_FLAG:
      return {
        ...state,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export default OrderReducer;
