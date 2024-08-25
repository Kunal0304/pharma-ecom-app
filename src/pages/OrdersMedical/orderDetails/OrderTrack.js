import React, { useEffect, useState } from 'react';
import "../../../assets/scss/custom/pages/_trackorder.scss"
import withRouter from "components/Common/withRouter";
import { Link } from 'react-router-dom';
import {  map } from "lodash";
import { Card, CardBody, Col, Row, Container } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import {GetOrderTrack} from "store/actions";
//import images
import adobephotoshop from "../../../assets/images/companies/adobe-photoshop.svg";
import { getorderStatus as orderstatus } from "store/actions";
import { array } from 'prop-types';
const OrderTrack = props => {
    const [step, setStep]=useState('0');
    const dispatch = useDispatch();

    const { track } = useSelector(state => ({
        track: state.OrderReducer.track,
    }));
  
    const params = props.router.params;
    useEffect(() => {
        if (Object.keys(track).length === 0) {
            if(params && params.id) {
                dispatch(GetOrderTrack(params.id));
            } 
        }
        if (Object.keys(track).length != 0) {
            let element= track.slice(-1);
            const status=element[0].order_status;
            if(status=='pending')
            {
                setStep('0');
            }
            else if(status=='confirmed')
            {
                setStep('1');
            }
            else if(status=='processing')
            {
                setStep('2');
            }
            else if(status=='delivered')
            {
                setStep('4');
            }
            else if(status=='returned')
            {
                setStep('5');
            }
            else if(status=='failed')
            {
                setStep('6');
            }
            else if(status=='canceled')
            {
                setStep('7');
            }
        }
    }, [dispatch, track]);
    
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <h4>Track Order</h4>
                    <Row  className='mb-5'>
                        <Col xl="12">
                            <ol className="progtrckr" data-progtrckr-steps={step}>
                                <li className={step>=1?'progtrckr-done':'progtrckr-todo'}>Order Confirmed</li>
                                <li className={step>=2?'progtrckr-done':'progtrckr-todo'}>Order Processing</li>
                                <li className={step>=3?'progtrckr-done':'progtrckr-todo'}>Menifested</li>
                                <li className={step>=4?'progtrckr-done':'progtrckr-todo'}>Delivered</li>
                                <li className={step>=5?'progtrckr-done':'progtrckr-todo'}>Return</li>
                                <li className={step>=6?'progtrckr-done':'progtrckr-todo'}>Failed</li>
                                <li className={step>=7?'progtrckr-done':'progtrckr-todo'}>Cancelled</li>
                            </ol>               
                        </Col>
                    </Row>
                    {map(track, (data, index) => (
                    <Row className='mb-3'  key={index}>
                        <Col xl="2">
                            <div className='track'>
                                <i className="bx bxs-truck"></i>
                                {data.order_status}
                            </div>
                        </Col>
                        <Col xl="5">
                            <div className='track-details'>
                                <p>{data.status_change_date}</p>
                                <p>Order {data.order_status}</p>
                                <p>{data.order_track}</p>
                            </div>
                        </Col>
                    </Row>
                    ))}
                </Container>
            </div>
        </React.Fragment>
    );
}

export default withRouter(OrderTrack);