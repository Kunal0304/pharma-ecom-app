import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, } from 'reactstrap';
import { useFormik } from "formik";
import {
    Nav,
    NavItem,
    NavLink,
    Modal,
    Form,
    Row,
    Input,
    FormFeedback,
    Label,
    Alert,
    Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
//import images
import adobephotoshop from "../../../assets/images/companies/adobe-photoshop.svg";
import { getorderStatus as orderstatus } from "store/actions";

import {
    getOrderDetail as onGetOrderDetail,

} from "store/actions";
import {
    getOrdersLists as onGetOrders, saveOrderProcess, downloadOrders , deleteMenifest, resetFlag
} from "store/actions";
import { array } from 'prop-types';
const Overview = ({order_detail}) => {
    const dispatch = useDispatch();
   

    const { orders,error, success ,loading} = useSelector(state => ({
        orders: state.OrderReducer.orders,
        error: state.OrderReducer.error,
        success: state.OrderReducer.success,
        loading:state.OrderReducer.loading
    }));

    const changeOrderStatus = (values) => {
     
        dispatch(orderstatus({id:order_detail.id, val: values}));
        dispatch(onGetOrders());    
        dispatch(onGetOrderDetail(order_detail.id));    
    } 
    const [amount, setAmount]=useState('');
    const [modal_xlarge, setmodal_xlarge] = useState(false);
    const [modal_small, setmodal_small] = useState(false);
    const [minValue, setminValue]=useState('');
    const [maxValue, setmaxValue]=useState('');
    const [oldmenifest, setoldmenifest]=useState(false);
    const [request, setRequest] = useState(null);
    const onClickEdit = (request) => {
        //console.log(modal_xlarge);
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
        setRequest(request);
        // console.log(request,'requests');
        validation.setFieldValue("id", request?.id);
        validation.setFieldValue("invoice", request?.order_amount);
        setAmount(request?.order_amount);
        let percent=((request?.order_amount*10)/100).toFixed(2);
        setminValue(request?.order_amount-percent);
        setmaxValue(Number(request?.order_amount) + Number(percent));
    }

    const handleInputChange = (event) => {
        let dtype= event.target.value;
        validation.values.weight=dtype;
    }
    const handleSelectChange = (event) => {
        let ordertype= event.target.value;
        download.values.order_type=ordertype;
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    const handleInputImgChange = (event) => {
        validation.values.invoice_doc=event.target.files[0];
    }

    const validate = values => {
        const errors = {};
        if (!values.invoice) {
          errors.invoice = 'Required';
        } else if (!(values.invoice >= minValue && values.invoice <= maxValue)) {
          errors.invoice = 'modification between defined value allowed only';
        } 
        return errors;
    };
    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
          id: 0,
          invoice: '',
          invoice_number: '',
          weight: '',
          invoice_doc:'',
        },
        validate,
        validationSchema: Yup.object({
            invoice: Yup.string().required("Please enter invoice"),
            invoice_number: Yup.string().required("Please enter invoice number"),
            weight: Yup.string().required("Please Select Weight"),
        }),
        onSubmit: (values) => {
            dispatch(saveOrderProcess(values));        
            dispatch(onGetOrders());    
            dispatch(onGetOrderDetail(values.id));    
            setmodal_xlarge(false); 
          //  window.location.reload();   
        }
      });
    return (
        <React.Fragment>
            <Col xl={3}>
                <Card>
                    <CardBody>
                        <h5 className="fw-semibold">Overview</h5>

                        <div className="table-responsive">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th scope="col">PLACED BY</th>
                                        <td scope="col">{order_detail?.customer?.f_name+' '+order_detail?.customer?.l_name}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Order ID:</th>
                                        <td>{order_detail?.id}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location</th>
                                        <td>{order_detail?.shipping_address_data?.address}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">City</th>
                                        <td><span className="badge badge-soft-success">{order_detail?.shipping_address_data?.zip+' '+order_detail?.shipping_address_data?.country}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td><span className="badge badge-soft-info">{order_detail?.order_status=='out_of_delivery'?'Menifested':order_detail?.order_status}</span></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Order Date</th>
                                        <td>{order_detail?.order_date}</td>
                                    </tr>
                                 
                                </tbody>
                            </table>
                        </div>
                        <div className="hstack gap-2">
                            {loading==false?<>
                            {order_detail?.order_status=='pending'?<button className="btn btn-soft-primary w-100" onClick={()=>onClickEdit(order_detail)}>Process Order</button>:<></>}
                            {order_detail?.order_status=='processing'?<button className="btn btn-soft-primary w-100" onClick={()=>changeOrderStatus('out_of_delivery')}>Process Menifest</button>:<></>}
                            {order_detail?.order_status=='pending'?<button className="btn btn-soft-danger w-100" onClick={()=>changeOrderStatus('canceled')}>Cancel Order</button>:<></>}
                            </>:<><button className="btn btn-soft-primary w-100">Loading...</button></>}
                        </div>
                    </CardBody>
                </Card>

                {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
                <Modal  size="md"  isOpen={modal_xlarge} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >  Add Product Request </h5>
                        <button  onClick={() => { setmodal_xlarge(false); }} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form className="form-horizontal"  onSubmit={(e) => { e.preventDefault();  validation.handleSubmit(); return false; }}   >
                        <div className="modal-body">
                            <Card>
                                <div className="MuiDialogContent-root">
                                    <div className="form-group">
                                        <label htmlFor="Value of invoice ( 10% modification allowed )" className="">Value of invoice ( 10% modification allowed Between {minValue} and {maxValue})</label>
                                        <Input  name="invoice" value={validation.values.invoice || ""} type="text" placeholder="Value of invoice ( 10% modification allowed )" onChange={validation.handleChange}  onBlur={validation.handleBlur}
                                        invalid={
                                        validation.touched.invoice && validation.errors.invoice ? true : false
                                        }
                                        />
                                        {validation.touched.invoice && validation.errors.invoice ? (
                                            <FormFeedback type="invalid">{validation.errors.invoice}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Invoice Number" className="">Invoice Number</label>
                                        <Input  name="invoice_number" value={validation.values.invoice_number || ""} type="text" placeholder="Invoice Number" onChange={validation.handleChange}  onBlur={validation.handleBlur}
                                        invalid={
                                        validation.touched.invoice_number && validation.errors.invoice_number ? true : false
                                        }
                                        />
                                        {validation.touched.invoice_number && validation.errors.invoice_number ? (
                                            <FormFeedback type="invalid">{validation.errors.invoice_number}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Length (cm)" className="">Length (cm)</label>
                                        <input disabled name="length" placeholder="20" type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Breadth (cm)" className="">Breadth (cm)</label>
                                        <input disabled name="breadth" placeholder="12" type="text" className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Height (cm)" className="">Height (cm)</label>
                                        <input disabled name="height" placeholder="10" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Weight" className="">Weight</label>
                                        <select className="form-control" name="discount_type" onChange={handleInputChange}  onBlur={validation.handleBlur}>
                                            <option value=" ">Select weight</option>
                                            <option value="0.5">0.5 kg</option>
                                            <option value="1">1.0 kg</option>
                                            <option value="1.5">1.5 kg</option>
                                            <option value="2">2.0 kg</option>
                                            <option value="2.5">2.5 kg</option>
                                            <option value="3">3.0 kg</option>
                                            <option value="3.5">3.5 kg</option>
                                            <option value="4">4.0 kg</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="invoice_doc" className="">Upload Invoice</label>
                                        <Input  name="invoice_doc"  type="file" placeholder="Invoice Docs"  onChange={handleInputImgChange} />
                                    </div>
                                </div>                          
                            </Card>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onClickEdit()}>Close</button>
                            <button type="submit" className="btn btn-primary">SUMBIT</button>
                        </div>
                    </Form>
                </Modal>

                <Card>
                    <CardBody>
                        <div className="text-center">
                            {/* <img src={adobephotoshop} alt="" height="50" className="mx-auto d-block" /> */}
                            <h5 className="mt-3 mb-1">KYC DETAILS</h5>
                            {/* <p className="text-muted mb-0">Since July 2017</p> */}
                        </div>

                        <ul className="list-unstyled mt-4">
                            <li>
                                <div className="d-flex">
                                    <i className="bx bx-file-find text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">FORM 20 </h6>
                                        <p className="text-muted fs-14 mb-0">({order_detail?.customer?.lic20bno} | {order_detail?.customer?.lic20bdate})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-file-find text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">FORM 21</h6>
                                        <p className="text-muted fs-14 mb-0"> ({order_detail?.customer?.lic21bno} | {order_detail?.customer?.lic21bdate})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-globe text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">PAYMENT TYPE</h6>
                                        <p className="text-muted fs-14 text-break mb-0">({order_detail?.payment_method=='razor_pay'?'Prepaid':'COD'})</p>
                                    </div>
                                </div>
                            </li>
                            <li className="mt-3">
                                <div className="d-flex">
                                    <i className="bx bx-map text-primary fs-4"></i>
                                    <div className="ms-3">
                                        <h6 className="fs-14 mb-2">Grand Total</h6>
                                        <p className="text-muted fs-14 mb-0">₹{order_detail?.order_amount}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        {/* <div className="mt-4">
                            <Link to="#" className="btn btn-soft-primary btn-hover w-100 rounded"><i className="mdi mdi-eye"></i> View Profile</Link>
                        </div> */}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default Overview;