import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFormik } from "formik";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import { ASSET_URL, API_DOMAIN, APP_DOMAIN, GENERATE_LABEL, GENERATE_MENIFEST_REPORT } from "helpers/url_helper";
import * as Yup from "yup";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import {
    Nav,
    NavItem,
    NavLink,
    Modal,
    Form,
    Col,
    Row,
    Input,
    FormFeedback,
    Label,
    Card,
    CardBody,
    Alert,
    Button,
} from "reactstrap";
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';

import {
    getOrdersLists as onGetOrders, saveOrderProcess, saveDocketImage, saveMenifestOrder, downloadOrders, deleteMenifest, resetFlag
} from "store/actions";

import {
    OrderMenifest,
    OrderId,
    Date,
    Total,
    PaymentStatus,
}
    from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";

//redux
import { useSelector, useDispatch } from "react-redux";


function OrderMedical({ user }) {

    //meta title
    document.title = "Orders | Pharmwale";

    const dispatch = useDispatch();
    const { orders, error, success, loading,downloadSuccess } = useSelector(state => ({
        orders: state.OrderReducer.orders,
        downloadSuccess: state.OrderReducer.downloadSuccess,
        error: state.OrderReducer.error,
        success: state.OrderReducer.success,
        loading: state.OrderReducer.loading
    }));


    useEffect(() => { if (success != null || success != '') { setTimeout(() => { dispatch(resetFlag()); }, 3000); } }, [dispatch, success]);

    useEffect(() => { if (error != null || error != '') { setTimeout(() => { dispatch(resetFlag()); }, 3000); } }, [dispatch, error]);
   
  function  fetchRecorderOrder(){
    
        dispatch(onGetOrders());
    }
    useEffect(() => {

        dispatch(onGetOrders());

    }, [dispatch]);

    useEffect(() => {
        if (success != '' && loading == false) {
            dispatch(onGetOrders());
            setmodal_xlarge(false);
            setmodal_image_small();
        }

    }, [dispatch, success]);

    // dispatch(onGetOrders());
    //  setmodal_xlarge(false);


    const [modal_xlarge, setmodal_xlarge] = useState(false);
    const [modal_small, setmodal_small] = useState(false);
    const [modal_image_small, setmodal_image_small] = useState(false);
    const [amount, setAmount] = useState('');
    const [minValue, setminValue] = useState('');
    const [maxValue, setmaxValue] = useState('');
    const [oldmenifest, setoldmenifest] = useState(false);
    const [request, setRequest] = useState(null);
    let menifestOrder = [];

    const CheckHandler = (e) => {

        if (menifestOrder.length > 0) {

            var permissions_array = [...menifestOrder];
            if (e.target.checked) {
                permissions_array.splice(menifestOrder.indexOf(e.target.value), 1);
                permissions_array = [...menifestOrder, e.target.value];
            } else {
                permissions_array.splice(menifestOrder.indexOf(e.target.value), 1);
            }

        } else {
            permissions_array = [e.target.value];
        }

        validation_generate_menifest.setFieldValue("order_ids", permissions_array)

        menifestOrder = permissions_array;

    };

    const onUploadImage = (request) => {
        // console.log(modal_image_small);
        setmodal_image_small(!modal_image_small);
        removeBodyCss();
        // console.log(request,'requests');
        validation_docket_image.setFieldValue("id", request?.id);
    }

    const handleInputDocketImgChange = (event) => {
        validation_docket_image.setFieldValue("image", event.target.files[0]);
    }

    const onClickEdit = (request) => {
        //console.log(modal_xlarge);
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
        setRequest(request);
        // console.log(request,'requests');
        validation.setFieldValue("id", request?.id);
        validation.setFieldValue("invoice", request?.order_amount);
        setAmount(request?.order_amount);
        let percent = ((request?.order_amount * 10) / 100).toFixed(2);
        setminValue(request?.order_amount - percent);
        setmaxValue(Number(request?.order_amount) + Number(percent));
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    const handleInputImgChange = (event) => {
        validation.values.invoice_doc = event.target.files[0];
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

    const validation_generate_menifest = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            order_ids: [],
        },
        validationSchema: Yup.object({
            order_ids: Yup.array().required("Please select at least one order"),
        }),
        onSubmit: (values) => {
            // console.log(values,'values')
            // return ;
            dispatch(saveMenifestOrder(values));
            dispatch(onGetOrders());

        }
    });

    const validation_docket_image = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            id: 0,
            image: '',
        },
        validationSchema: Yup.object({
            image: Yup.mixed().required("Please select Image"),
        }),
        onSubmit: (values) => {
            // console.log(values,'values')
            // return ;
            dispatch(saveDocketImage(values));
            // dispatch(onGetOrders());
            // setmodal_image_small(false);
        }
    });
    // console.log(validation_docket_image,'upload image');
    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            id: 0,
            invoice: '',
            invoice_number: '',
            weight: '',
            invoice_doc: '',
        },
        validate,
        validationSchema: Yup.object({
            invoice: Yup.string().required("Please enter invoice"),
            invoice_number: Yup.string().required("Please enter invoice number"),
            weight: Yup.string().required("Please Select Weight"),
        }),
        onSubmit: (values) => {
            dispatch(saveOrderProcess(values));
            // dispatch(onGetOrders());
            //  setmodal_xlarge(false);
        }
    });
    const handleInputChange = (event) => {
        let dtype = event.target.value;
        validation.values.weight = dtype;
    }
    const handleSelectChange = (event) => {
        let ordertype = event.target.value;
        download.values.order_type = ordertype;
    }
    const download = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,
        initialValues: {
            date_from: '',
            date_to: '',
            order_type: 'All',
        },
        validationSchema: Yup.object({
            date_from: Yup.string().required("Please select From Date"),
            date_to: Yup.string().required("Please select To Date"),
            order_type: Yup.string().required("Please Select Order Type"),
        }),
        onSubmit: (values) => {
            dispatch(downloadOrders(values));
            //  window.location.href = APP_DOMAIN + 'storage/app/order/export_order_data.xlsx';
            //  setmodal_small();
        }
    });
    const columns = useMemo(
        () => [

            {
                Header: 'Order',
                accessor: 'order',
                width: '150px',
                style: {
                    textAlign: "center",
                    width: "10%",
                    background: "#0000",
                },
                filterable: true,
                Cell: (cellProps) => {
                    return <OrderId {...cellProps} />;
                }
            },
            // {
            //     Header: 'Amount',
            //     accessor: 'billingName',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <BillingName {...cellProps} />;
            //     }
            // },
            {
                Header: 'Amount',
                accessor: 'order_amount',
                filterable: true,
                Cell: (cellProps) => {
                    return <Total {...cellProps} />;
                }
            },
            {
                Header: 'Status',
                accessor: 'order_status',
                filterable: true,
                Cell: (cellProps) => {
                    return <PaymentStatus {...cellProps} />;
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'paymentMethod',
            //     Cell: (cellProps) => {
            //         return <PaymentMethod {...cellProps} />;
            //     }
            // },
            {
                Header: 'Date',
                accessor: 'order_date',
                filterable: true,
                Cell: (cellProps) => {
                    return <Date {...cellProps} />;
                }
            },
            {
                Header: 'View Details',
                accessor: 'view',
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="btn-group" role="group">
                                    {cellProps.row.original.order_status != 'delivered' && cellProps.row.original.order_status != 'canceled' && cellProps.row.original.order_status != 'Failed' ? <>
                                        {generateMenifest == "0" || generateMenifest == 0 ? <><Link to={'/orders/' + cellProps.row.original.id} className="btn btn-outline-secondary">DETAILS</Link>
                                            <Link to={'/track-order/' + cellProps.row.original.id} className="btn btn-outline-secondary">Track Order</Link></> : <></>}
                                        {cellProps.row.original.order_status == 'pending' ? <Link to="#" className="btn btn-outline-secondary" onClick={() => { const orderData = cellProps.row.original; onClickEdit(orderData); }} >
                                            Process
                                        </Link> : <a href={API_DOMAIN + GENERATE_LABEL + cellProps.row.original.id} className="btn btn-outline-secondary" target="_blank" rel="noreferrer" >
                                            Docket
                                        </a>}
                                    </> : <></>}
                                    {generateMenifest == "1" || generateMenifest == 1 ? <Link to="#" className="btn btn-outline-secondary" onClick={() => { const orderData = cellProps.row.original; onUploadImage(orderData); }} >
                                        Upload
                                    </Link> : <></>}

                                    {cellProps.row.original.order_status == 'canceled' ? <>
                                        <p>{cellProps.row.original.order_note}</p>
                                    </> : <></>}
                                    {cellProps.row.original.order_status == 'delivered' ? <>
                                        <a href={ASSET_URL+'/order/invoice/'+ cellProps.row.original.invoice_doc} className="btn btn-outline-secondary" htmlFor="btnradio4" target="_blank" rel="noreferrer">INVOICE</a>
                                    </> : <></>}
                                </div>
                            </div>
                        </div>
                    );
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'action',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         return (
            //             <div className="d-flex gap-3">
            //                 <Link
            //                     to="#"
            //                     className="text-success"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         handleOrderClick(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
            //                     <UncontrolledTooltip placement="top" target="edittooltip">
            //                         Edit
            //                     </UncontrolledTooltip>
            //                 </Link>
            //                 <Link
            //                     to="#"
            //                     className="text-danger"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         onClickDelete(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
            //                     <UncontrolledTooltip placement="top" target="deletetooltip">
            //                         Delete
            //                     </UncontrolledTooltip>
            //                 </Link>
            //             </div>
            //         );
            //     }
            // },
        ],
        []
    );
    const column_menifest = useMemo(
        () => [

            {
                Header: 'Order',
                accessor: 'order',
                width: '150px',
                style: {
                    textAlign: "center",
                    width: "10%",
                    background: "#0000",
                },
                filterable: true,
                Cell: (cellProps) => {
                    return (<>
                        <input type="checkbox" id={'order' + cellProps.row.original.id} name="order" value={cellProps.row.original.id} onClick={(e) => CheckHandler(e)} disabled={cellProps.row.original.docket_image == null ? true : false} />

                        <OrderMenifest {...cellProps} />
                    </>);
                }
            },
            // {
            //     Header: 'Amount',
            //     accessor: 'billingName',
            //     filterable: true,
            //     Cell: (cellProps) => {
            //         return <BillingName {...cellProps} />;
            //     }
            // },
            {
                Header: 'Amount',
                accessor: 'order_amount',
                filterable: true,
                Cell: (cellProps) => {
                    return <Total {...cellProps} />;
                }
            },
            {
                Header: 'Status',
                accessor: 'order_status',
                filterable: true,
                Cell: (cellProps) => {
                    return <PaymentStatus {...cellProps} />;
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'paymentMethod',
            //     Cell: (cellProps) => {
            //         return <PaymentMethod {...cellProps} />;
            //     }
            // },
            {
                Header: 'Date',
                accessor: 'order_date',
                filterable: true,
                Cell: (cellProps) => {
                    return <Date {...cellProps} />;
                }
            },
            {
                Header: 'View Details',
                accessor: 'view',
                disableFilters: true,
                Cell: (cellProps) => {
                    // console.log(cellProps.row.original)
                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="btn-group" role="group">
                                    <a href={API_DOMAIN + GENERATE_LABEL + cellProps.row.original.id} className="btn btn-outline-secondary" target="_blank" rel="noreferrer"  >
                                        Docket
                                    </a>

                                    {cellProps.row.original.docket_image != null ? <Link to="#" className="btn btn-outline-secondary" >
                                        Uploaded
                                    </Link> : <Link to="#" className="btn btn-outline-secondary" onClick={() => { const orderData = cellProps.row.original; onUploadImage(orderData); }} >
                                        Upload
                                    </Link>}


                                </div>
                            </div>
                        </div>
                    );
                }
            },
            // {
            //     Header: 'Action',
            //     accessor: 'action',
            //     disableFilters: true,
            //     Cell: (cellProps) => {
            //         return (
            //             <div className="d-flex gap-3">
            //                 <Link
            //                     to="#"
            //                     className="text-success"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         handleOrderClick(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
            //                     <UncontrolledTooltip placement="top" target="edittooltip">
            //                         Edit
            //                     </UncontrolledTooltip>
            //                 </Link>
            //                 <Link
            //                     to="#"
            //                     className="text-danger"
            //                     onClick={() => {
            //                         const orderData = cellProps.row.original;
            //                         onClickDelete(orderData);
            //                     }}
            //                 >
            //                     <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
            //                     <UncontrolledTooltip placement="top" target="deletetooltip">
            //                         Delete
            //                     </UncontrolledTooltip>
            //                 </Link>
            //             </div>
            //         );
            //     }
            // },
        ],
        []
    );
    const ondeleteMenifest = (menifestId) => {
        // console.log(menifestId);
        if (menifestId != '') {
            dispatch(deleteMenifest(menifestId));
            dispatch(onGetOrders());
        }
    }
    const oldMenifestColumns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'menifest_date',
                filterable: true,
                Cell: (cellProps) => {
                    return <Date {...cellProps} />;
                }
            },
            {
                Header: 'OrderId',
                accessor: 'order_id',
                width: '150px',
                style: {
                    textAlign: "center",
                    width: "10%",
                    background: "#0000",
                },
                filterable: true,
                Cell: (cellProps) => {
                    return (
                        <>
                            <div className="">{cellProps.row.original.order_id}</div>
                        </>
                    );
                }
            },
            {
                Header: 'Action',
                accessor: 'view',
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="btn-group" role="group">
                                    <a onClick={() => ondeleteMenifest(cellProps.row.original.id)} className="btn btn-outline-secondary">DELETE</a>
                                    <Link to={API_DOMAIN + GENERATE_MENIFEST_REPORT + cellProps.row.original.id} className="btn btn-outline-secondary" target="_blank">PRINT</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
            },
        ],
        []
    );
    const [activeTab, setactiveTab] = useState("1");
    const [generateMenifest, setGenerateMenifest] = useState("0");

    const menifested = []
    // console.log(orders?.open,'orderss')
    // console.log(orders?.open?.length,'orders length')
    //order.order_status ==='out_of_delivery'??menifested.push(order)
    if (orders?.open?.length > 0) {
        orders?.open.map((order) => order.order_status == "out_of_delivery" && order.isManifested == 0 ? menifested.push(order) : '')
    }
   
    console.log(loading,downloadSuccess,'downloadSuccess');
    if(loading==false && downloadSuccess!=''){
        window.location.href = APP_DOMAIN + 'export_order_data.xlsx';
       }



    return (
        <React.Fragment>

            <div className="page-content">
                {error && error ? <Alert color="danger">{error}</Alert> : null}
                {success ? <Alert color="success">{success}</Alert> : null}
                <Modal size="md" isOpen={modal_image_small} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >  Upload Docket Image</h5>
                        <button onClick={() => { setmodal_image_small(false); }} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation_docket_image.handleSubmit(); return false; }}   >
                        <div className="modal-body">
                            <Card>
                                <div className="MuiDialogContent-root">
                                    <div className="form-group">
                                        <label htmlFor="invoice_doc" className="">Upload Invoice</label>
                                        <Input name="invoice_doc" type="file" placeholder="Invoice Docs" onChange={handleInputDocketImgChange} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onUploadImage()}>Close</button>
                            {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                        </div>
                    </Form>
                </Modal>
                <Modal size="md" isOpen={modal_xlarge} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >  Add Product Request </h5>
                        <button onClick={() => { setmodal_xlarge(false); }} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}   >
                        <div className="modal-body">
                            <Card>
                                <div className="MuiDialogContent-root">
                                    <div className="form-group">
                                        <label htmlFor="Value of invoice ( 10% modification allowed )" className="">Value of invoice ( 10% modification allowed Between {minValue} and {maxValue})</label>
                                        <Input name="invoice" value={validation.values.invoice || ""} type="text" placeholder="Value of invoice ( 10% modification allowed )" onChange={validation.handleChange} onBlur={validation.handleBlur}
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
                                        <Input name="invoice_number" value={validation.values.invoice_number || ""} type="text" placeholder="Invoice Number" onChange={validation.handleChange} onBlur={validation.handleBlur}
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
                                        <input disabled name="length" placeholder="20" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Breadth (cm)" className="">Breadth (cm)</label>
                                        <input disabled name="breadth" placeholder="12" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Height (cm)" className="">Height (cm)</label>
                                        <input disabled name="height" placeholder="10" type="text" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Weight" className="">Weight</label>
                                        <select className="form-control" name="discount_type" onChange={handleInputChange} onBlur={validation.handleBlur}>
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
                                        <Input name="invoice_doc" type="file" placeholder="Invoice Docs" onChange={handleInputImgChange} />
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => onClickEdit()}>Close</button>
                            {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                        </div>
                    </Form>
                </Modal>
                <Modal size="md" isOpen={modal_small} >
                    <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" >  Download </h5>
                        <button onClick={() => { setmodal_small(); }} type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <Form className="form-horizontal" onSubmit={(e) => { e.preventDefault(); download.handleSubmit(); return false; }}   >
                        <div className="modal-body">
                            <Card>
                                <div className="MuiDialogContent-root">
                                    <div className="form-group">
                                        <label htmlFor="Value of invoice ( 10% modification allowed )" className="">Date From</label>
                                        <Flatpickr
                                            name="date_from"
                                            onChange={(e) => download.setFieldValue('date_from', e[0])}
                                            className={download.errors.date_from ? 'invalid-feedback form-control d-block' : 'form-control d-block'}
                                            placeholder="dd M,yyyy"
                                            options={{
                                                altInput: true,
                                                altFormat: "F j, Y",
                                                dateFormat: "Y-m-d"
                                            }}
                                        />
                                        {download.touched.date_from && download.errors.date_from ? (
                                            <FormFeedback type="invalid">{download.errors.date_from}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Date To" className="">Date To</label>
                                        <Flatpickr
                                            name="date_to"
                                            onChange={(e) => download.setFieldValue('date_to', e[0])}
                                            className={download.errors.date_to ? 'invalid-feedback form-control d-block' : 'form-control d-block'}
                                            placeholder="dd M,yyyy"
                                            options={{
                                                altInput: true,
                                                altFormat: "F j, Y",
                                                dateFormat: "Y-m-d"
                                            }}
                                        />
                                        {download.touched.date_to && download.errors.date_to ? (
                                            <FormFeedback type="invalid">{download.errors.date_to}</FormFeedback>
                                        ) : null}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Weight" className="">Select Order Type</label>
                                        <select name="order_type" onChange={handleSelectChange} className={download.errors.order_type ? 'invalid-feedback form-control d-block' : 'form-control d-block'}
                                            onBlur={download.handleBlur}>
                                            <option value="All">All</option>
                                            <option value="pending"> Pending</option>
                                            <option value="confirmed"> Confirmed</option>
                                            <option value="processing" selected="">Processing </option>
                                            <option value="out_for_delivery">Menifested</option>
                                            <option value="delivered">Delivered </option>
                                            {/* <option value="returned"> Returned</option> */}
                                            {/* <option value="failed">Failed </option> */}
                                            <option value="canceled">Canceled </option>
                                        </select>

                                        {download.touched.order_type && download.errors.order_type ? (
                                            <FormFeedback type="invalid">{download.errors.order_type}</FormFeedback>
                                        ) : null}

                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="modal-footer">
                            {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                        </div>
                    </Form>
                </Modal>
                <div className="container-fluid">
                    <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" />
                    <Row>
                        <Col xs="12" className="text-right">
                            <button className="btn btn-outline-primary mb-2" onClick={() => { setmodal_small(true); }} >Download</button>
                        </Col>
                    </Row>
                    <Nav tabs>
                        <NavItem style={{ width: '33%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "1",
                                })}
                                onClick={() => {

                                    fetchRecorderOrder();
                                    setactiveTab("1");
                                    setoldmenifest(false);
                                }}
                            >
                                OPEN
                            </NavLink>
                        </NavItem>
                        <NavItem style={{ width: '33%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "2",
                                })}
                                onClick={() => {

                                    fetchRecorderOrder();
                                    setactiveTab("2");
                                    setoldmenifest(false);
                                }}
                            >
                                HISTORY
                            </NavLink>
                        </NavItem>
                        <NavItem style={{ width: '34%' }}>
                            <NavLink
                                style={{
                                    cursor: "pointer",
                                    textAlign: "center"
                                }}
                                className={classnames({
                                    active: activeTab === "3",
                                })}
                                onClick={() => {

                                    fetchRecorderOrder();
                                    setactiveTab("3");
                                    setoldmenifest(true);
                                }}
                            >
                                OLD MENIFEST
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    {(!oldmenifest && generateMenifest == 0 && orders?.open != null && orders?.open != undefined) ? loading == false ? <TableContainer
                                        columns={columns}
                                        data={activeTab == 1 ? orders?.open : orders?.history}
                                        isGlobalFilter={true}
                                        isAddOptions={true}
                                        handleOrderClicks={() => setGenerateMenifest(1)}
                                        isAddOptionTitle={'Generate Menifest'}
                                        customPageSize={50}
                                    /> : <><h1>Loading...</h1></> : <></>}
                                    {(generateMenifest == 1) ? <TableContainer
                                        columns={column_menifest}
                                        data={generateMenifest == 1 ? menifested : orders?.open}
                                        isGlobalFilter={true}
                                        isAddOptions={true}
                                        isCancelOption={true}
                                        handleCancelClicks={() => setGenerateMenifest(0)}
                                        handleOrderClicks={(e) => { e.preventDefault(); validation_generate_menifest.handleSubmit(); }}
                                        isAddOptionTitle={'Print Menifest'}
                                        customPageSize={50}
                                    /> : <></>}
                                    {(oldmenifest && orders?.old_menifest != null && orders?.old_menifest != undefined) && loading == false ? <TableContainer
                                        columns={oldMenifestColumns}
                                        data={orders?.old_menifest}
                                        isGlobalFilter={true}
                                        isAddOptions={false}
                                        handleOrderClicks={null}
                                        customPageSize={50}
                                    /> : <></>}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </div>
        </React.Fragment>
    );
}
OrderMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,
};

export default OrderMedical;
OrderMedical