import React, { useEffect, useMemo, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableContainer from '../../components/Common/TableContainer';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import ChangeStatusModal from '../../components/Common/ChangeStatusModal';
import { APP_DOMAIN } from '../../helpers/url_helper';
//import components

import {
  getProductList, getProductParentList, downloadProducts
} from "store/actions";
import {
  getProductCategoryList, getProductTypeList, saveInventory, updateInventory, changeInventoryStatus, getProductRequestList as getSellerProductlist, resetpFlag
} from "store/actions";

import { ProductStatus } from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  InputGroup
} from "reactstrap";

import { Alert } from "reactstrap";

function InventryMedical() {

  //meta title
  document.title = "Inventory | Pharmwale";
  // validation
  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      id: 0,
      product_id: '',
      expiry_date: '',
      current_stock: '',
      max_qty: '',
      lot_size: '',
      unit_price: '',
      purchase_price: '',
      discount_type: '',
      discount: '',
      discount_get: '',
      discount_get_product: '',
    },
    validationSchema: Yup.object({
      product_id: Yup.string().required("Please Select  Product"),
      expiry_date: Yup.string().required("Please Select  Expriry Date"),
      current_stock: Yup.string().required("Please Enter Total Available Quantity"),
      max_qty: Yup.string().required("Please Enter Total Maximum Quantity"),
      lot_size: Yup.string().required("Please Enter Lot Size"),
      unit_price: Yup.string().required("Please Enter MRP"),
      purchase_price: Yup.string().required("Please Enter PTR"),
      // discount_type: Yup.string().required("Please Select Discount"),
      // discount: Yup.string().required("Please Enter Discount"),
    }),
    onSubmit: (values) => {
      if (values.id == 0) {
        dispatch(saveInventory(values));
      } else {
        dispatch(updateInventory(values));
      }

      // dispatch(getProductList());
      // window.location.reload();
      //tog_xlarge();

    }
  });


  const download = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      status: true
    },
    onSubmit: (values) => {
      dispatch(downloadProducts(values));

     // window.location.href = APP_DOMAIN + 'inventory.xlsx';

      //  window.location.href = APP_DOMAIN + 'storage/app/order/export_order_data.xlsx';
      //  setmodal_small();
    }
  });



  const [modal_xlarge, setmodal_xlarge] = useState(false);
  function tog_xlarge() {
    console.log(modal_xlarge, 'modal xlarge ');
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
    validation.setFieldValue("id", '');
    validation.setFieldValue("product_id", '');
    validation.setFieldValue("current_stock", '');
    validation.setFieldValue("max_qty", '');
    validation.setFieldValue("expiry_date", '');
    validation.setFieldValue("unit_price", '');
    validation.setFieldValue("purchase_price", '');
    validation.setFieldValue("lot_size", '');
    validation.setFieldValue("discount_type", '');
    validation.setFieldValue("discount", '');
    validation.setFieldValue("discount_get", '');
    validation.setFieldValue("discount_get_product", '');
    setChemicalCombination('');
    setGST('');
    setMedicineType('');
    setCategory('');
    setProductType('');
    setselectedGroup('');
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const dispatch = useDispatch();

  const { products } = useSelector(state => ({
    products: state.ProductReducer.products,
  }));

  const { parentProducts } = useSelector(state => ({
    parentProducts: state.ProductReducer.parentProducts,
  }));

  const { sellerProduct } = useSelector(state => ({
    sellerProduct: state.ProductReducer.productRequests,
  }));


  const { productTypes } = useSelector(state => ({
    productTypes: state.ProductReducer.productTypes,
  }));

  const { productCategories } = useSelector(state => ({
    productCategories: state.ProductReducer.productCategories,
  }));

  const { error, success, loading, inventory_download_success,status_success } = useSelector(state => ({
    error: state.ProductReducer.error,
    success: state.ProductReducer.success,
    status_success:state.ProductReducer.status_success,
    inventory_download_success: state.ProductReducer.inventory_download_success,
    loading: state.ProductReducer.loading,
  }));

  useEffect(() => {
    if (loading == false && (success != null && success != '')) {
      // tog_xlarge();
      dispatch(getProductList());
      // setTimeout(() => { dispatch(resetpFlag()); }, 3000); 
    }

  }, [dispatch, success, loading]);

  useEffect(() => { if (error != null || error != '') { setTimeout(() => { dispatch(resetpFlag()); }, 3000); } }, [dispatch, error]);
  useEffect(() => {
    console.log(loading,inventory_download_success,'downloaddd')
    if(loading==false && inventory_download_success!=''){
      window.location.href = APP_DOMAIN + 'inventory.xlsx';
    }
  }, [dispatch,inventory_download_success]);


  useEffect(() => {

    dispatch(getProductList());

  }, [dispatch]);

  useEffect(() => {
    if (success != '' && loading == false) {
      dispatch(getProductList());
      // window.location.reload();
      // tog_xlarge();
    }
  }, [dispatch, loading])


  useEffect(() => {


    dispatch(getProductParentList());


  }, [dispatch]);



  useEffect(() => {
    dispatch(getProductCategoryList());


  }, [dispatch]);



  useEffect(() => {
    dispatch(getProductTypeList());


  }, [dispatch]);


  const columns = useMemo(
    () => [

      {
        Header: 'Title',
        accessor: 'name',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true
      },
      {
        Header: 'MRP',
        accessor: 'unit_price',
        filterable: true
      },
      {
        Header: 'PTR',
        accessor: 'purchase_price',
        filterable: true
      },
      {
        Header: 'Quantity',
        accessor: 'current_stock',
        filterable: true
      },
      {
        Header: 'Status',
        accessor: 'status',
        filterable: true,
        Cell: (cellProps) => {
          return <ProductStatus {...cellProps} />;
        }
      },
      {
        Header: 'Action',
        accessor: 'action',
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#"
                className="text-success"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickEdit(orderData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Edit
                </UncontrolledTooltip>
              </Link>
              {/* <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickDelete(orderData);
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Delete
                </UncontrolledTooltip>
              </Link> */}
              {cellProps.row.original?.status == 1 ? <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickHide(orderData);
                }}
              >
                <i className="mdi mdi-eye-off font-size-18" id="hidetooltip" />
                <UncontrolledTooltip placement="top" target="hidetooltip">
                  Hide
                </UncontrolledTooltip>
              </Link> : <></>}
              {cellProps.row.original?.status == 0 ? <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const orderData = cellProps.row.original;
                  onClickHide(orderData);
                }}
              >
                <i className="mdi mdi-eye font-size-18" id="hidetooltip" />
                <UncontrolledTooltip placement="top" target="hidetooltip">
                  Show
                </UncontrolledTooltip>
              </Link> : <></>}
            </div>
          );
        }
      },
    ],
    []
  );

  const [selectedGroup, setselectedGroup] = useState(null);

  function handleSelectGroup(selectedGroup) {

    validation.setFieldValue("product_id", selectedGroup.value);

    const selected = parentProducts.find(parent => parent.id == selectedGroup.value)

    setChemicalCombination(selected.chemical_combination);
    setGST("GST " + selected.tax)
    setMedicineType(selected.medicine_type)
    setProductName(selected.name)
    const cats = JSON.parse(selected.category_ids);

    if (cats.length > 0) {
      const catss = productCategories.find(proCat => proCat?.id == cats[0]?.id)
      setCategory(catss?.name)
    }

    const proTypess = productTypes.find(proType => proType?.id == selected.product_type)

    if (proTypess) {
      setProductType(proTypess?.name)
    }

    setselectedGroup(selectedGroup);

  }

  const [ChemicalCombination, setChemicalCombination] = useState('');
  const [GST, setGST] = useState('');
  const [category, setCategory] = useState('');
  const [MedicineType, setMedicineType] = useState('');
  const [ProductType, setProductType] = useState('');
  const [ProductName, setProductName] = useState('');

  let options = []
  if (parentProducts.length > 0) {
    parentProducts.map((parent) => (options.push({ label: parent.name, value: parent.id })))
  }

  const optionGroup = [
    {
      options: options
    }
  ];
  const [request, setRequest] = useState(null);
  const [requestModal, setRequestModal] = useState(false);

  const onClickHide = (request) => {
    setRequest(request);
    setRequestModal(true);
  }

  const handleRequestProduct = () => {
    if (request && request.id) {
      if (request.status == 1) {
        dispatch(changeInventoryStatus({ id: request.id, status: 0 }));
      } else {
        dispatch(changeInventoryStatus({ id: request.id, status: 1 }));
      }

      // dispatch(getProductList());
       setRequestModal(false);
    }
  };

  useEffect(()=>{
    if(loading==false && status_success!=""){
     dispatch(getProductList());
    }

  },dispatch,loading,status_success)
  const onClickEdit = (request) => {

    tog_xlarge();
    setRequest(request);

    // console.log(request,'requests')

    validation.setFieldValue("id", request?.id);
    validation.setFieldValue("product_id", request?.product_id);
    validation.setFieldValue("current_stock", request?.current_stock);
    validation.setFieldValue("max_qty", request?.max_qty);
    validation.setFieldValue("expiry_date", request?.expiry);
    validation.setFieldValue("unit_price", request?.unit_price);
    validation.setFieldValue("purchase_price", request?.purchase_price);
    validation.setFieldValue("lot_size", request?.lot_size);
    validation.setFieldValue("discount_type", request?.discount_type);
    validation.setFieldValue("discount", request?.discount);
    validation.setFieldValue("discount_get", request?.discount_get);
    validation.setFieldValue("discount_get_product", request?.discount_get_product);
    setChemicalCombination(request?.chemical_combination);
    setGST('GST ' + request?.tax);
    setMedicineType(request?.medicine_type);

    
    const cats = JSON.parse(request?.category_ids);

    if (cats.length > 0) {
      const catss = productCategories.find(proCat => proCat?.id == cats[0]?.id)
      setCategory(catss?.name)
    }

    const proTypess = productTypes.find(proType => proType?.id == request?.product_type)

    if (proTypess) {
      setProductType(proTypess?.name)
    }

 
    setselectedGroup({ label: request?.parentProduct?.name, value: request?.parentProduct?.id });

  };

  useEffect(() => {

    dispatch(getSellerProductlist());


  }, [dispatch]);

  let ownproducts = []
  if (products.length > 0) {
    products.map((parent) => (ownproducts.push({ label: parent.name, value: parent.id })))
  }

  const ownproductsoptionGroup = [
    {
      options: ownproducts
    }
  ];

  const [selectedOwnGroup, setselectedOwnGroup] = useState(null);
  function handleSelectOwnGroup(selectedOwnGroup) {
    validation.setFieldValue("discount_get_product", selectedOwnGroup.value);
    const ownselected = sellerProduct.find(parent => parent.id == selectedOwnGroup.value)
    setselectedOwnGroup(selectedOwnGroup);

  }
  const [inputField, setInputField] = useState('');
  const handleInputChange = (event) => {
    validation.values.discount = '';
    validation.values.discount_get = '';
    validation.values.discount_get_product = '';
    setselectedOwnGroup(null);

    let dtype = event.target.value;
    validation.values.discount_type = dtype;
    if (dtype == 'Discount') {
      setInputField(1);
    }
    else if (dtype == 'Same') {
      setInputField(2);
    }
    else if (dtype == 'Different') {
      setInputField(3);
    }
    else if (dtype == 'SameAndDiscount') {
      setInputField(4);
    }
    else if (dtype == 'DifferentAndDiscount') {
      setInputField(5);
    }
    else {
      setInputField(0);
    }
  }


  return (
    <React.Fragment>

      <div className="page-content">
        <div className="container-fluid">
          {error && error ? <Alert color="danger">{error}</Alert> : null}
          {success ? <Alert color="success">{success}</Alert> : null}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="font-weight-bold">Inventory </h2>
            <Form
              className="form-horizontal"
              onSubmit={(e) => {
                e.preventDefault();
                download.handleSubmit();
                return false;
              }}
            >
              <button className="btn btn-outline-primary" type="submit">
                DOWNLOAD
              </button>
            </Form>
          </div>
          {/* <Breadcrumbs title="Ecommerce" breadcrumbItem="Orders" /> */}
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {loading == false ? <TableContainer
                    columns={columns}
                    data={products}
                    isGlobalFilter={true}
                    isAddOptions={true}
                    isAddOptionTitle={'Add Inventory'}
                    handleOrderClicks={tog_xlarge}
                    customPageSize={10}
                  /> : <><h1>Loading...</h1></>}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal size="xl" isOpen={modal_xlarge} toggle={() => { tog_xlarge(); }} >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myExtraLargeModalLabel" > Inventory </h5>
              <button onClick={() => {
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

                    {error ? <Alert color="danger">{error}</Alert> : null}

                    <Row>
                      <Col md={12}>
                        <div className="mb-12">
                          <Label htmlFor="formrow-email-Input">Select Product</Label>
                          <Select
                            value={selectedGroup}
                            name="product_id"
                            onChange={(e) => {
                              handleSelectGroup(e);
                            }}
                            options={validation.values.id==0 || validation.values.id=='0'?optionGroup:[selectedGroup]}

                            className={validation.errors.expiry_date ? 'is-invalid select2-selection' : 'select2-selection'}

                          />
                          {validation.touched.product_id && validation.errors.product_id ? (
                            <FormFeedback type="invalid">{validation.errors.product_id}</FormFeedback>
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
                            value={ChemicalCombination}
                            type="text"
                            placeholder=""
                            disabled
                          />

                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label className="form-label">Company Name</Label>
                          <Input
                            name="company"
                            className="form-control"
                            placeholder=""
                            type="text"
                            value={""}
                            disabled
                          />

                        </div>
                      </Col>


                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Total Available Quantity</Label>
                          <Input
                            name="current_stock"
                            value={validation.values.current_stock || ""}
                            type="text"
                            placeholder="Total Available Quantity"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.current_stock && validation.errors.current_stock ? true : false
                            }
                          />
                          {validation.touched.current_stock && validation.errors.current_stock ? (
                            <FormFeedback type="invalid">{validation.errors.current_stock}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Expiry Date</Label>

                          <Flatpickr
                            name="expiry_date"
                            onChange={(e) => validation.setFieldValue('expiry_date', e[0])}
                            className={validation.errors.expiry_date ? 'is-invalid form-control d-block' : 'form-control d-block'}
                            placeholder="dd M,yyyy"
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d"
                            }}
                          />

                          {validation.touched.expiry_date && validation.errors.expiry_date ? (
                            <FormFeedback type="invalid">{validation.errors.expiry_date}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Country of Origin</Label>
                          <Input
                            name="country"
                            value={"INDIA"}
                            type="text"
                            placeholder=""
                            disabled

                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">GST</Label>
                          <Input
                            value={GST}
                            type="text"
                            placeholder=""
                            disabled
                          />

                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">TYPE</Label>
                          <Input
                            value={ProductType}
                            type="text"
                            placeholder=""
                            disabled
                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Medicine type</Label>
                          <Input
                            value={MedicineType}
                            type="text"
                            placeholder=""
                            disabled
                          />

                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">MRP</Label>
                          <Input
                            name="unit_price"
                            value={validation.values.unit_price || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.unit_price && validation.errors.unit_price ? true : false
                            }
                          />
                          {validation.touched.unit_price && validation.errors.unit_price ? (
                            <FormFeedback type="invalid">{validation.errors.unit_price}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">PTR</Label>
                          <Input
                            name="purchase_price"
                            value={validation.values.purchase_price || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.purchase_price && validation.errors.purchase_price ? true : false
                            }
                          />
                          {validation.touched.purchase_price && validation.errors.purchase_price ? (
                            <FormFeedback type="invalid">{validation.errors.purchase_price}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Prepaid Inventory</Label>
                          <Input
                            type="text"
                            placeholder="FALSE"
                            disabled
                          />

                        </div>
                      </Col>
                    </Row>


                    <Row>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Lot size</Label>
                          <Input
                            name="lot_size"
                            value={validation.values.lot_size || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.lot_size && validation.errors.lot_size ? true : false
                            }
                          />
                          {validation.touched.lot_size && validation.errors.lot_size ? (
                            <FormFeedback type="invalid">{validation.errors.lot_size}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Maximum order quantity</Label>
                          <Input
                            name="max_qty"
                            value={validation.values.max_qty || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.max_qty && validation.errors.max_qty ? true : false
                            }
                          />
                          {validation.touched.max_qty && validation.errors.max_qty ? (
                            <FormFeedback type="invalid">{validation.errors.max_qty}</FormFeedback>
                          ) : null}
                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Product Surcharge</Label>
                          <Input
                            value={"0 %"}
                            type="text"
                            placeholder=""
                            disabled
                          />

                        </div>
                      </Col>
                      <Col md={3}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Prepaid Product</Label>
                          <Input
                            type="text"
                            value={"FALSE"}
                            placeholder=""
                            disabled

                          />

                        </div>
                      </Col>
                    </Row>


                    <Row>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Product Category</Label>
                          <Input
                            value={category}
                            type="text"
                            placeholder=""
                            disabled

                          />
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Discount Type</Label>
                          <select id="formrow-InputState" className="form-control" name="discount_type" onChange={handleInputChange}
                            onBlur={validation.handleBlur}   >
                            <option value="nodiscount">Select discount</option>
                            <option value="Discount">Discount on PTR</option>
                            <option value="Same">Same product bonus</option>
                            <option value="Different">Different product bonus</option>
                            <option value="SameAndDiscount">Same product bonus and Discount</option>
                            <option value="DifferentAndDiscount">Different product bonus and Discount</option>
                          </select>
                        </div>
                      </Col>
                      {/* <Col md={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Discount</Label>
                          <Input
                            name="discount_type"
                            value={validation.values.discount || ""}
                            type="text"
                            placeholder=""
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.discount && validation.errors.discount ? true : false
                            }
                          />
                          {validation.touched.discount && validation.errors.discount ? (
                            <FormFeedback type="invalid">{validation.errors.discount}</FormFeedback>
                          ) : null}
                        </div>
                      </Col> */}
                    </Row>
                    <Row>
                      <div>{inputField == 1 ?
                        <div className="d-flex">Get flat <Input name="discount" value={validation.values.discount || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} /> % Off</div>
                        : <></>}</div>
                      {/* <div>{inputField == 2 ?
                        <div className="d-flex">
                          buy {validation.values.lot_size} {ProductName} and get
                          <Input name="discount_get" value={validation.values.discount_get || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />
                          free
                        </div>
                        : <></>}
                      </div> */}
                      <div>{inputField == 3 || inputField == 2 ?
                        <div className="d-flex">
                          buy {validation.values.lot_size} {ProductName} and get
                          <Input name="discount_get" value={validation.values.discount_get || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />
                          {inputField == 3 ? <Select value={selectedOwnGroup} name="discount_get_product" style={{ width: "15%" }} options={ownproductsoptionGroup} onChange={(e) => {
                            handleSelectOwnGroup(e);
                          }} className="select2-selection" /> : <></>}
                        </div>
                        : <></>}
                      </div>
                      <div>{inputField == 4 ?
                        <div className="d-flex">
                          buy {validation.values.lot_size} {ProductName} and get
                          <Input name="discount_get" value={validation.values.discount_get || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />free and add-on
                          <Input name="discount" value={validation.values.discount || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />
                          off
                        </div>
                        : <></>}
                      </div>
                      <div>{inputField == 5 ?
                        <div className="d-flex">
                          buy {validation.values.lot_size} {ProductName}and get
                          <Input name="discount_get" value={validation.values.discount_get || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />
                          <div className="me-2">
                            <Select value={selectedOwnGroup} classNames="mr-2" name="discount_get_product" style={{ width: "25%" }} onChange={(e) => {
                              handleSelectOwnGroup(e);
                            }} options={ownproductsoptionGroup} className="select2-selection" />
                          </div>
                          free and add-on
                          <Input name="discount" value={validation.values.discount || ""} onChange={validation.handleChange} className="custom mx-3" type="text" style={{ width: "10%" }} />
                          off
                        </div>
                        : <></>}
                      </div>
                    </Row>
                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => tog_xlarge()}>Close</button>

                {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
              </div>
            </Form>
          </Modal>

          <ChangeStatusModal show={requestModal} onChangeClick={handleRequestProduct} onCloseClick={() => setRequestModal(false)} message={'Are you Sure you want to change product status'} buttonText={'Show/Hide Now'} />
        </div>
      </div>
    </React.Fragment>
  );
}
// EcommerceOrder.propTypes = {
//   preGlobalFilteredRows: PropTypes.any,

// };
InventryMedical.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default InventryMedical;