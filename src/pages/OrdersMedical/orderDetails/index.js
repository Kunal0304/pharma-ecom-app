
import React, { useEffect} from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import {Container, Row } from "reactstrap";
import Overview from './Overview';
import DetailsSection from './DetailsSection';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import {
    getOrderDetail as onGetOrderDetail,

} from "store/actions";


//redux
import { useSelector, useDispatch } from "react-redux";

const OrderDetails  = props => {
    document.title = "Order Details | Pharmwale";

    const dispatch = useDispatch();

    const { order_detail,loading } = useSelector(state => ({
        order_detail: state.OrderReducer.order_detail,
        loading: state.OrderReducer.loading
    }));
  
    const params = props.router.params;

  
    useEffect(() => {
       if (params && params.id) {
    //     console.log(params,'params')
   
        dispatch(onGetOrderDetail(params.id));
    //     setDetails(order_detail)
   } 
  
    }, []);
  
   
    return (
        <React.Fragment>
             <div className="page-content">
                <Container fluid>
                {/* Render Breadcrumbs */}
                <Breadcrumbs title="Order" breadcrumbItem="Order Details" />

                <Row>
                    <Overview order_detail={order_detail}/>
                    <DetailsSection order_detail={order_detail}/>
                </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

OrderDetails.propTypes = {
    match: PropTypes.object,
  };
  
  export default withRouter(OrderDetails);