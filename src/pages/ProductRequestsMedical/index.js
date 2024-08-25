// src/components/filter.
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
//import components

import TableContainer from '../../components/Common/TableContainer';
import {

    Row,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {
    Col,
    Card,
    CardBody,
    CardTitle,
    Modal,
    Alert, FormFeedback
} from "reactstrap";

import {
    getProductCategoryList, getProductTypeList, getProductRequestList, saveProductRequest, cancelProductRequest, resetpFlag
} from "store/actions";

import ChangeStatusModal from '../../components/Common/ChangeStatusModal';
import ProductRequestModal from "./ProductRequestModal";
import {
    Label,
    Form,
    Input
} from "reactstrap";
import {
    ProductRequestStatus
}
    from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";
function ProductRequestMedical() {

    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            chemical_combination: '',
            name: '',
            company: '',
            type: '',
            product_category: '',
            gst: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Product Name"),
            chemical_combination: Yup.string().required("Please Enter Chemical Combination"),
            company: Yup.string().required("Please Enter Company Name"),
            type: Yup.string().required("Please Select Type"),
            product_category: Yup.string().required("Please Select Product Category"),
            gst: Yup.string().required("Please Select Product GST"),
        }),
        onSubmit: (values) => {
            dispatch(saveProductRequest(values));
            // dispatch(getProductRequestList());
            // window.location.reload();
            tog_xlarge();

        }
    });

    // const { error } = useSelector(state => ({
    //     error: state.StaffReducer.error,
    // }));

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Company',
                accessor: 'company'
            },
            {
                Header: 'Request Date',
                accessor: 'created_at'
            },
            {
                Header: 'Status',
                accessor: 'status',
                disableFilters: true,
                Cell: (cellProps) => {
                    return <ProductRequestStatus {...cellProps} />;
                }
            },
            {
                Header: 'Action',
                accessor: 'action',
                disableFilters: false,
                Cell: (cellProps) => {

                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">

                                <div className="btn-group" role="group" onClick={() => {
                                    let viewData = cellProps.row.original;
                                    onClickViewRequest(viewData)
                                }}>

                                    <label className="btn btn-outline-secondary" htmlFor="btnradio4">View Details</label>

                                </div>


                                {cellProps.row.original.status == 1 ?
                                    <div className="btn-group" role="group" onClick={() => {
                                        const requestData = cellProps.row.original;
                                        onClickChangeRequest(requestData);
                                    }}>

                                        <label className="btn btn-outline-secondary" htmlFor="btnradio4">CANCEL REQUEST</label>

                                    </div> : <></>}

                            </div>
                        </div>
                    );
                }
            }
        ],
        []
    );
    const [modal1, setModal1] = useState(false);
    const toggleViewModal = () => setModal1(!modal1);
    const [requestModal, setRequestModal] = useState(false);
    const [request, setRequest] = useState(null);

    const handleRequestProduct = () => {
        if (request && request.id) {
            dispatch(cancelProductRequest({ id: request.id }));
            setRequestModal(false);
        }
    };

    const onClickViewRequest = (request) => {
        setRequest(request);
        setModal1(!modal1);
    };

    const onClickChangeRequest = (request) => {
        setRequest(request);
        setRequestModal(true);
    };
    const dispatch = useDispatch();
    const { productRequests, success,loading, error } = useSelector(state => ({
        productRequests: state.ProductReducer.productRequests,
        error: state.ProductReducer.error,
        success: state.ProductReducer.success,
    }));

    const { productTypes } = useSelector(state => ({
        productTypes: state.ProductReducer.productTypes,
    }));

    const { productCategories } = useSelector(state => ({
        productCategories: state.ProductReducer.productCategories,
    }));
    useEffect(() => { if (success != null || success != '') { setTimeout(() => { dispatch(resetpFlag()); }, 3000); } }, [dispatch, success]);

    useEffect(() => { if (error != null || error != '') { setTimeout(() => { dispatch(resetpFlag()); }, 3000); } }, [dispatch, error]);

    useEffect(() => {
        dispatch(getProductCategoryList());


    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductTypeList());


    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductRequestList());


    }, [dispatch]);
   
    useEffect(() => {
        if(success!="" && loading==false){
            tog_xlarge();
            dispatch(getProductRequestList());
        }
        


    }, [dispatch,loading]);
      

    const [modal_xlarge, setmodal_xlarge] = useState(false);
    function tog_xlarge() {
        //console.log(modal_xlarge);
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }
    //meta title
    document.title = "Product Request Merchent | Pharmwale";

    return (
        <div className="page-content">
            {error && error ? <Alert color="danger">{error}</Alert> : null}
            {success ? <Alert color="success">{success}</Alert> : null}
            <div className="container-fluid">
                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-weight-bold">Staff Members</h2>
                    <button className="btn btn-outline-primary">
                        Add Staff Members +
                    </button>
                </div> */}
                {/* <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" /> */}
                {/* <Table columns={columns} data={data} /> */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-weight-bold">Product Requests</h2>
                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                        tog_xlarge();
                    }}
                        data-toggle="modal"
                        data-target=".bs-example-modal-xl">
                        Add Request +
                    </button>
                    <Modal
                        size="xl"
                        isOpen={modal_xlarge}
                        toggle={() => {
                            tog_xlarge();
                        }}
                    >
                        <div className="modal-header">
                            <h5
                                className="modal-title mt-0"
                                id="myExtraLargeModalLabel"
                            >
                                Add Product Request
                            </h5>
                            <button
                                onClick={() => {
                                    setmodal_xlarge(false);
                                }}
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <Form
                            className="form-horizontal"
                            onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                            }}
                        >
                            <div className="modal-body">
                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4"> </CardTitle>

                                        {error ? <Alert color="danger">{error}</Alert> : null}

                                        <Row>
                                            <Col md={6}>

                                                <div className="mb-3">
                                                    <Label className="form-label">Name</Label>
                                                    <Input
                                                        name="name"
                                                        value={validation.values.name || ""}
                                                        type="text"
                                                        placeholder="Enter Name"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.name && validation.errors.name ? true : false
                                                        }
                                                    />
                                                    {validation.touched.name && validation.errors.name ? (
                                                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label className="form-label">Company </Label>
                                                    <Input
                                                        name="company"
                                                        className="form-control"
                                                        placeholder="Enter Company Name"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.company || ""}
                                                        invalid={
                                                            validation.touched.company && validation.errors.company ? true : false
                                                        }
                                                    />
                                                    {validation.touched.company && validation.errors.company ? (
                                                        <FormFeedback type="invalid">{validation.errors.company}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>


                                        </Row>


                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-email-Input">Chemical Combination</Label>
                                                    <Input
                                                        name="chemical_combination"
                                                        value={validation.values.chemical_combination || ""}
                                                        type="text"
                                                        placeholder="Enter Chemical Combination"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.chemical_combination && validation.errors.chemical_combination ? true : false
                                                        }
                                                    />
                                                    {validation.touched.chemical_combination && validation.errors.chemical_combination ? (
                                                        <FormFeedback type="invalid">{validation.errors.chemical_combination}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-password-Input">GST</Label>
                                                    <select
                                                        id="formrow-InputState"
                                                        className="form-control"
                                                        name="gst"

                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}

                                                    >
                                                        <option defaultValue>Choose...</option>

                                                        <option value="12">GST 12%</option>
                                                        <option value="18">GST 18%</option>
                                                        <option value="28">GST 28%</option>
                                                        <option value="0">GST 0%</option>
                                                        <option value="5">GST 5%</option>

                                                    </select>
                                                    {validation.touched.gst && validation.errors.gst ? (
                                                        <FormFeedback type="invalid">{validation.errors.gst}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>

                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-password-Input">Type</Label>
                                                    <select
                                                        id="formrow-InputState"
                                                        className="form-control"
                                                        name="type"

                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}

                                                    >
                                                        <option defaultValue>Choose...</option>
                                                        {productTypes.length > 0 ? productTypes.map((productType, i) => (<option key={i} value={productType.id}>{productType.name}</option>)) : <></>}
                                                    </select>
                                                    {validation.touched.type && validation.errors.type ? (
                                                        <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-password-Input">Product Category</Label>
                                                    <select
                                                        id="formrow-InputState"
                                                        className="form-control"
                                                        name="product_category"

                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}

                                                    >
                                                        <option defaultValue>Choose...</option>
                                                        {productCategories.length > 0 ? productCategories.map((productCategory, i) => (<option key={i} value={productCategory.id}>{productCategory.name}</option>)) : <></>}
                                                    </select>
                                                    {validation.touched.product_category && validation.errors.product_category ? (
                                                        <FormFeedback type="invalid">{validation.errors.product_category}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </Row>



                                    </CardBody>
                                </Card>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => tog_xlarge()}>Close</button>

                                <button type="submit" className="btn btn-primary">SUMBIT</button>
                            </div>
                        </Form>
                    </Modal>
                </div>
                <TableContainer
                    columns={columns}
                    data={productRequests}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />

                <ProductRequestModal isOpen={modal1} toggle={toggleViewModal} productRequest={request} />

                <ChangeStatusModal
                    show={requestModal}
                    onChangeClick={handleRequestProduct}
                    onCloseClick={() => setRequestModal(false)}
                    message={'Are you Sure you want to cancel product request'}
                    buttonText={'Cancel Now'}
                />
            </div>
        </div>
    );
}
ProductRequestMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default ProductRequestMedical;