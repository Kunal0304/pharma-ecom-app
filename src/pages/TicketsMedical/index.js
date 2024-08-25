// src/components/filter.
import React, { useEffect, useMemo, useState } from "react";
import classnames from "classnames";
import { map } from "lodash";
import PropTypes from 'prop-types';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";

import {
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
  Alert,
} from "reactstrap";


import {
  getTicketsLists as onGetTickets,
  addTicket as onAddTicket,
  onGetAllOrders,
  resetFlag,
} from "store/actions";

import {
  Label,
  Form,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
//import components
import TableContainer from '../../components/Common/TableContainer';
import {
  TicketID,
}
  from "../Ecommerce/EcommerceOrders/EcommerceOrderCol";
import { FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

function TicketsMedical() {

  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      type: 'order related',
      issue: '',
      issue_type: '',
      order_id: 0,
      image: []
    },
    validationSchema: Yup.object({
      type: Yup.string().required("Please select Type"),
      issue: Yup.string().required("Please Enter Issue"),
      issue_type: Yup.string().required("Please Enter  Issue Type")
    }),
    onSubmit: (values) => {

      // console.log(values, 'values');
      dispatch(onAddTicket(values));

      //  dispatch(getMemberList());

      // 
      dispatch(onGetTickets());

      // window.location.reload();
    }
  });

  const [invAmount, setInvAmount] = useState();
  const [orderDate, setOrderDate] = useState();
  const [buyerName, setBuyerName] = useState();
  const [activeTab, setactiveTab] = useState("1");
  const [modal_xlarge, setmodal_xlarge] = useState(false);
  const [selectedFiles, setselectedFiles] = useState([]);

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
    validation.setFieldValue("image", files);
  }


  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }


  const dispatch = useDispatch();
  const { tickets, error, success, loading } = useSelector(state => ({
    tickets: state.OrderReducer.tickets,
    error: state.OrderReducer.error,
    success: state.OrderReducer.success,
    loading: state.OrderReducer.loading,
  }));

  useEffect(() => {
    //  if (success?.status==true) {
    //    setTimeout(() => {
    //      dispatch(resetFlag());
    //    }, 3000);
    //  }
  
    if (loading == false && (success != '' && success != null)) {
      dispatch(onGetTickets());
      tog_xlarge(false);
    }

  }, [dispatch, loading]);

  useEffect(() => {
    if (error != null || error != '') {
      setTimeout(() => {
        dispatch(resetFlag());
      }, 3000);
    }
  }, [dispatch, error]);


  const { orders } = useSelector(state => ({
    orders: state.OrderReducer.allorders,
  }));

  function ChangeOrder(ID) {

    let selectedOrder = orders
      .find(order => order.id == ID);
    if (selectedOrder) {
      setInvAmount(selectedOrder.order_amount);
      setOrderDate(selectedOrder.order_date);
      setBuyerName(selectedOrder.customer.f_name + ' ' + selectedOrder.customer.l_name);
      validation.setFieldValue("order_id", ID);
    }

  }
  useEffect(() => {
    // console.log(tickets);
      dispatch(onGetTickets());
  
  }, [dispatch]);

  function fetchTicketOnChange(){
    dispatch(onGetTickets());
  }
  useEffect(() => {
    // if (Object.keys(orders).length === 0) {
    dispatch(onGetAllOrders());
    //  }
  }, [dispatch]);


  const columns = useMemo(
    () => [
      {
        Header: 'Ticket ID',
        accessor: 'ticket_number',
        width: '150px',
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        Cell: (cellProps) => {
          return <TicketID {...cellProps} />;
        }
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Date',
        accessor: 'create_date'
      },
      {
        Header: 'Created By',
        accessor: 'added_by'
      },
      {
        Header: 'Order Id',
        accessor: 'order_id'
      },
      {
        Header: 'Order Date',
        accessor: 'order_date'
      },
      {
        Header: 'Issue',
        accessor: 'issue_type'
      },
    ],
    []
  );

  function tog_xlarge() {
    //console.log(modal_xlarge);
    setmodal_xlarge(!modal_xlarge);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  //meta title
  document.title = "Tickets | Pharmwale";

  return (
    <div className="page-content">
      {error && error ? <Alert color="danger">{error}</Alert> : null}
      {success ? <Alert color="success">{success}</Alert> : null}
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="font-weight-bold">No of open tickets: {tickets?.open != undefined ? tickets.open.length : 0} </h2>
          <button type="button" className="btn btn-outline-primary" onClick={() => {
            tog_xlarge();
          }}
            data-toggle="modal"
            data-target=".bs-example-modal-xl">
            Add +
          </button>
          <Modal
            size="xl"
            isOpen={modal_xlarge}
            toggle={() => {
              tog_xlarge();
            }}
          >
            <Form onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}>
              <div className="modal-header">
                <h5
                  className="modal-title mt-0"
                  id="myExtraLargeModalLabel"
                >
                  Add Ticket
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
              <div className="modal-body">
                <Card>
                  <CardBody>
                    <CardTitle className="mb-4"> </CardTitle>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Ticket type</Label>
                          <select name="type" 
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            className={validation.errors.type?'is-invalid form-control':'form-control'}
                            >
                            <option value="order related">Order Related</option>
                            <option value="other">Other</option>

                          </select>

                          {validation.touched.type && validation.errors.type ? (
                            <FormFeedback type="invalid">{validation.errors.type}</FormFeedback>
                          ) : null}

                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Issue type</Label>
                          <select  name="issue_type"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            className={validation.errors.issue_type?'is-invalid form-control':'form-control'}
                          >
                            <option>Select Issue</option>
                            {validation?.values?.type == 'order related' ? <><option value="Short Supply">Short Supply</option>
                              <option value="Damaged products">Damaged products</option>
                              <option value="Wrong invoice">Wrong invoice</option>
                              <option value="Diff in Invoice and Docket">Diff in Invoice and Docket</option>
                              <option value="Short expiry">Short expiry</option>
                              <option value="Order by mistake">Order by mistake</option>
                              <option value="Expired product received">Expired product received</option>
                              <option value="Damage package received">Damage package received</option>
                              <option value="Reschedulling related">Reschedulling related</option>
                              <option value="Order not proccessed">Order not processed</option></> :

                              <><option value="License related">License related</option>
                                <option value="Address related">Address related</option>
                                <option value="Delivery serviceability related">Delivery serviceability related</option>
                                <option value="COD disabled">COD disabled</option>
                                <option value="Delivery charges activated">Delivery charges activated</option>

                                <option value="Other issue">Other issue</option></>}


                          </select>

                          {validation.touched.issue_type && validation.errors.issue_type ? (
                            <FormFeedback type="invalid">{validation.errors.issue_type}</FormFeedback>
                          ) : null}
                         
                        </div>
                      </Col>
                    </Row>
                    {validation?.values?.type == 'order related' ? <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Order Id</Label>
                          <select className="form-control" name="order_id"
                            onBlur={validation.handleBlur} onChange={(e) => { ChangeOrder(e.target.value); validation.handleChange }}>
                            <option>Select Order</option>
                            {map(orders, (order, key) =>
                              <option key={key} value={order.id}>{order.id}</option>
                            )}
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Order Date</Label>
                          <Input
                            type="text"
                            className="form-control"
                            value={orderDate}
                            readOnly
                            placeholder="Order Date"
                          />
                        </div>
                      </Col>

                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Buyer Name</Label>
                          <Input
                            type="text"
                            value={buyerName}
                            className="form-control"
                            placeholder="Buyer Name"
                            readOnly
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Original Invoice Amt</Label>
                          <Input
                            type="text"
                            value={invAmount}
                            className="form-control"
                            placeholder="Original Invoice Amt"
                            readOnly
                          />
                        </div>
                      </Col>
                    </Row> : <></>}
                    <div className="mb-3">
                      <Label htmlFor="formrow-firstname-Input">Issue Description</Label>
                      <Input
                        type="text"
                        name="issue"
                        className="form-control"
                        id="issue"
                        placeholder="Issue Description"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.issue && validation.errors.issue ? true : false
                        }
                      />
                      {validation.touched.issue && validation.errors.issue ? (
                        <FormFeedback type="invalid">{validation.errors.issue}</FormFeedback>
                      ) : null}
                    </div>

                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Drop files here or click to upload.</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )
                      })}
                    </div>



                  </CardBody>
                </Card>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
              </div>
            </Form>
          </Modal>
        </div>
        {/* <Breadcrumbs title="Tables" breadcrumbItem="No of open tickets:19" /> */}
        <Nav tabs>
          <NavItem style={{ width: '50%' }}>
            <NavLink
              style={{
                cursor: "pointer",
                textAlign: "center"
              }}
              className={classnames({
                active: activeTab === "1",
              })}
              onClick={() => {
                fetchTicketOnChange();
                setactiveTab("1");
              }}
            >
              OPEN
            </NavLink>
          </NavItem>
          <NavItem style={{ width: '50%' }}>
            <NavLink
              style={{
                cursor: "pointer",
                textAlign: "center"
              }}
              className={classnames({
                active: activeTab === "2",
              })}
              onClick={() => {
                fetchTicketOnChange();
                setactiveTab("2");
              }}
            >
              CLOSED
            </NavLink>
          </NavItem>
        </Nav>
        {/* <Table columns={columns} data={data} /> */}

        {tickets?.open != null && tickets?.open != undefined && loading==false ? <TableContainer
          columns={columns}
          data={activeTab == 1 ? tickets?.open : tickets?.close}
          isGlobalFilter={true}
          isAddOptions={false}
          customPageSize={10}
          className="custom-header-css"
        /> : <><h1>Loading...</h1></>}
      </div>
    </div>
  );
}

TicketsMedical.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
};

export default TicketsMedical;
