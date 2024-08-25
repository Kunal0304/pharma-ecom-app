import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  CardSubtitle,
  Container,
  Alert,
} from "reactstrap";
import {
  Input
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { FormFeedback } from "reactstrap";
import Dropzone from "react-dropzone";

import * as Yup from "yup";
import { useFormik } from "formik";
import { ASSET_URL } from "../../helpers/url_helper";
// Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import { Link } from "react-router-dom";

import {
  getShopCompliance, saveShopCompliance, saveShopBank
} from "store/actions";

const ComplianceMedical = () => {

  //meta title
  document.title = "Complaince Form | Pharmwale";

  const [lic20bfile, setlic20bfile] = useState(null);
  const [lic21bfile, setlic21bfile] = useState(null);
  const [licfssaifile, setlicfssaifile] = useState(null);
  const [licgstfile, setlicgstfile] = useState(null);

  const [ifsc, setIfsc] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [cancelledCheque, setCancelledCheque] = useState(null);

  const [lic20bno, setlic20bno] = useState('');
  const [lic20bdate, setlic20bdate] = useState('');
  const [lic21bno, setlic21bno] = useState('');
  const [lic21bdate, setlic21bdate] = useState('');
  const [licgstno, setlicgstno] = useState('');
  const [licgstdate, setlicgstdate] = useState('');
  const [licfssaino, setlicfssaino] = useState('');
  const [licfssaidate, setlicfssaidate] = useState('');

  function handleAcceptedFiles(files, sets) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    if (sets == 'lic21bfile') {
      setlic21bfile(files[0])
      validation.setFieldValue("lic21bfile", files[0]);

    } else if (sets == 'lic20bfile') {
      validation.setFieldValue("lic20bfile", files[0]);
      setlic20bfile(files[0])

    } else if (sets == 'licfssaifile') {
      validation.setFieldValue("licfssaifile", files[0]);
      setlicfssaifile(files[0])

    } else if (sets == 'licgstfile') {
      validation.setFieldValue("licgstfile", files[0]);
      setlicgstfile(files[0])
    } else if (sets == 'cancelled_cheque') {
      validation_bank.setFieldValue("cancelled_cheque", files[0]);
      setCancelledCheque(files[0])
    }


  }

  const dispatch = useDispatch();
  const { complainces, loading, error, success } = useSelector(state => ({
    complainces: state.StaffReducer.complainces,
    loading: state.StaffReducer.loading,
    error: state.StaffReducer.error,
    success: state.StaffReducer.success
  }));


  const validation = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      lic20bno: lic20bno,
      lic20bdate: lic20bdate,
      lic20bfile: null,
      lic21bfile: null,
      lic21bno: lic21bno,
      lic21bdate: lic21bdate,
      licfssaifile: null,
      licfssaino: licfssaino,
      licfssaidate: licfssaidate,
      licgstfile: '',
      licgstno: licgstno,
      licgstdate: licgstdate
    },
    validationSchema: Yup.object({
      lic20bno: Yup.string().required("Please Enter  lic20bno"),
      lic21bno: Yup.string().required("Please Enter  lic21bno"),
      lic20bdate: Yup.string().required("Please Select  lic20bdate"),
      lic21bdate: Yup.string().required("Please Select  lic21bdate"),
      // licfssaino: Yup.string().required("Please Enter  licfssaino"),
      // licgstno: Yup.string().required("Please Enter  licgstno"),
      //   group_type: Yup.array().min(1).required().label('Group Type'),
    }),
    onSubmit: (values) => {
      dispatch(saveShopCompliance(values));
      // window.location.reload();
    }
  });

  const validation_bank = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      ifsc: ifsc,
      account_no: accountNumber,
      cancelled_cheque: cancelledCheque,
      bank_name: bankName,
      holder_name: holderName
    },
    validationSchema: Yup.object({
      ifsc: Yup.string().required("Please Enter  IFSC"),
      account_no: Yup.string().required("Please Enter  Account Number"),
      holder_name: Yup.string().required("Please Enter Account Holder Name"),
      bank_name: Yup.string().required("Please Enter Bank Name"),
      // licfssaino: Yup.string().required("Please Enter  licfssaino"),
      // licgstno: Yup.string().required("Please Enter  licgstno"),
      //   group_type: Yup.array().min(1).required().label('Group Type'),
    }),
    onSubmit: (values) => {
      dispatch(saveShopBank(values));
      // window.location.reload();
    }
  });


  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  useEffect(() => {

    dispatch(getShopCompliance());
    setlic20bno(complainces?.lic20bno);
    setlic20bdate(complainces?.lic20bdate);
    setlic21bno(complainces?.lic21bno);
    setlic21bdate(complainces?.lic21bdate);
    setlicgstno(complainces?.licgstno);
    setlicgstdate(complainces?.licgstdate);
    setlicfssaino(complainces?.licfssaino);
    setlicfssaidate(complainces?.licfssaidate);

    setIfsc(complainces?.ifsc);
    setHolderName(complainces?.holder_name);
    setBankName(complainces?.bank_name);
    setAccountNumber(complainces?.account_no);

    validation_bank.initialValues = {
      ifsc: ifsc,
      account_no: accountNumber,
      cancelled_chaque: null,
      bank_name: bankName,
      holder_name: holderName
    }

    validation.initialValues = {
      lic20bno: lic20bno,
      lic20bdate: lic20bdate,
      lic20bfile: null,
      lic21bfile: null,
      lic21bno: lic21bno,
      lic21bdate: lic21bdate,
      licfssaifile: null,
      licfssaino: licfssaino,
      licfssaidate: licfssaidate,
      licgstfile: null,
      licgstno: licgstno,
      licgstdate: licgstdate
    }

  }, [dispatch]);

  useEffect(() => {

    if(loading==false && success!=''){
      dispatch(getShopCompliance());
    }
    if (loading == false) {
      setlic20bno(complainces?.lic20bno);
      setlic20bdate(complainces?.lic20bdate);
      setlic21bno(complainces?.lic21bno);
      setlic21bdate(complainces?.lic21bdate);
      setlicgstno(complainces?.licgstno);
      setlicgstdate(complainces?.licgstdate);
      setlicfssaino(complainces?.licfssaino);
      setlicfssaidate(complainces?.licfssaidate);

      setIfsc(complainces?.ifsc);
      setHolderName(complainces?.holder_name);
      setBankName(complainces?.bank_name);
      setAccountNumber(complainces?.account_no);

      validation_bank.initialValues = {
        ifsc: ifsc,
        account_no: accountNumber,
        cancelled_chaque: null,
        bank_name: bankName,
        holder_name: holderName
      }

      validation.initialValues = {
        lic20bno: lic20bno,
        lic20bdate: lic20bdate,
        lic20bfile: null,
        lic21bfile: null,
        lic21bno: lic21bno,
        lic21bdate: lic21bdate,
        licfssaifile: null,
        licfssaino: licfssaino,
        licfssaidate: licfssaidate,
        licgstfile: null,
        licgstno: licgstno,
        licgstdate: licgstdate
      }
    }
  }, [dispatch, loading])


  return (
    <React.Fragment>
      <div className="page-content">
      {error && error ? <Alert color="danger">{error}</Alert> : null}
      {success ? <Alert color="success">{success}</Alert> : null}
        <Container fluid={true}>
          <Breadcrumbs title="Seller" breadcrumbItem="Seller Compliances" />

          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">Compliance Forms</h6>
                  <CardSubtitle className="mb-3">
                    {/* {" "}
                    DropzoneJS is an open source library that provides
                    drag’n’drop file uploads with image previews. */}
                  </CardSubtitle>
                  <Form encType="multipart/form-data" className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}
                  >
                    <Row>
                      <Col md={3}>
                        {(complainces?.lic20bfile != null || complainces?.lic20bfile != '') ? <div className="view-docs">
                          <div className="mb-3">
                            <a href={ASSET_URL + 'profile/seller/documents/' + complainces?.lic20bfile} target="_blank" rel="noreferrer">View Docs</a>
                          </div>
                        </div> : <></>}
                        <Dropzone onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles, 'lic20bfile') }} multiple={false}>
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div className="dz-message needsclick mt-2"  {...getRootProps()} >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Click to upload Drug Lic 20B files here.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                      
                      {lic20bfile!='' && lic20bfile!=null?<Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={5 + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={lic20bfile?.name}
                                  src={lic20bfile?.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {lic20bfile?.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{lic20bfile?.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>:<></>}
                      
                  </div>
                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col sm='12' className="mb-2">
                                  <Input name="lic20bno" value={validation.values.lic20bno || ""} type="text" placeholder="Enter lic20bno" onChange={validation.handleChange} onBlur={validation.handleBlur} invalid={validation.touched.lic20bno && validation.errors.lic20bno ? true : false}
                                  />
                                  {validation.touched.lic20bno && validation.errors.lic20bno ? (
                                    <FormFeedback type="invalid">{validation.errors.lic20bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col sm='12'>
                                  <Input className="form-control" type="date" defaultValue={lic20bdate} id="example-date-input" name="lic20bdate" onChange={validation.handleChange} onBlur={validation.handleBlur} invalid={validation.touched.lic20bdate && validation.errors.lic20bdate ? true : false}
                                  />
                                  {validation.touched.lic20bdate && validation.errors.lic20bdate ? (
                                    <FormFeedback type="invalid">{validation.errors.lic20bdate}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </div>
                      </Col>

                      <Col md={3}>
                        {(complainces?.lic21bfile != null || complainces?.lic21bfile != '') ? <div className="view-docs">
                          <div className="mb-3">
                            <a href={ASSET_URL + 'profile/seller/documents/' + complainces?.lic21bfile} target="_blank" rel="noreferrer">View Docs</a>
                          </div>
                        </div> : <></>}
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'lic21bfile')
                          }} multiple={false}
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
                                <h4>Click to upload Lic 21B files here.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>

                        <div className="dropzone-previews mt-3" id="file-previews">
                      
                        {lic21bfile!='' && lic21bfile!=null?<Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={6 + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={lic21bfile?.name}
                                    src={lic21bfile?.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {lic21bfile?.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{lic21bfile?.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>:<></>}
                        
                    </div>


                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col sm='12' className="mb-2">
                                  <Input
                                    name="lic21bno"
                                    value={validation.values.lic21bno || ""}
                                    type="text"
                                    placeholder="Enter lic21bno"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.lic21bno && validation.errors.lic21bno ? true : false
                                    }
                                  />
                                  {validation.touched.lic21bno && validation.errors.lic21bno ? (
                                    <FormFeedback type="invalid">{validation.errors.lic21bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col sm='12'>
                                  <Input
                                    className="form-control"
                                    type="date"
                                    defaultValue={lic21bdate}
                                    id="example-date-input"
                                    name="lic21bdate"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.lic21bdate && validation.errors.lic21bdate ? true : false
                                    }
                                  />
                                  {validation.touched.lic21bdate && validation.errors.lic21bdate ? (
                                    <FormFeedback type="invalid">{validation.errors.lic21bdate}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>

                      <Col md={3}>
                        {(complainces?.licfssaifile != null || complainces?.licfssaifile != '') ? <div className="view-docs">
                          <div className="mb-3">
                            <a href={ASSET_URL + 'profile/seller/documents/' + complainces?.licfssaifile} target="_blank" rel="noreferrer">View Docs</a>
                          </div>
                        </div> : <></>}
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'licfssaifile')
                          }} multiple={false}
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
                                <h4>Click to upload FSSAI Lic (Optional) files here.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>

                        {licfssaifile!='' && licfssaifile!=null?<Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={3 + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={licfssaifile?.name}
                                  src={licfssaifile?.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {licfssaifile?.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{licfssaifile?.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>:<></>}

                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col sm="12" className="mb-2">
                                  <Input
                                    name="licfssaino"
                                    value={validation.values.licfssaino || ""}
                                    type="text"
                                    placeholder="Enter licfssaino"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licfssaino && validation.errors.licfssaino ? true : false
                                    }
                                  />
                                  {validation.touched.licfssaino && validation.errors.licfssaino ? (
                                    <FormFeedback type="invalid">{validation.errors.lic20bno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col ol="12">
                                  <Input
                                    className="form-control"
                                    type="date"
                                    defaultValue={licfssaidate}

                                    id="example-date-input"
                                    name="licfssaidate"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licfssaidate && validation.errors.licfssaidate ? true : false
                                    }
                                  />
                                  {validation.touched.licfssaidate && validation.errors.licfssaidate ? (
                                    <FormFeedback type="invalid">{validation.errors.licfssaidate}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                      </Col>

                      <Col md={3}>
                        {(complainces?.licgstfile != null || complainces?.licgstfile != '') ? <div className="view-docs">
                          <div className="mb-3">
                            <a href={ASSET_URL + 'profile/seller/documents/' + complainces?.licgstfile} target="_blank" rel="noreferrer">View Docs</a>
                          </div>
                        </div> : <></>}
                        <Dropzone
                          onDrop={acceptedFiles => {
                            handleAcceptedFiles(acceptedFiles, 'licgstfile')
                          }} multiple={false}
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
                                <h4>Click to upload GSTN Lic (Optional) files here.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div className="dropzone-previews mt-3" id="file-previews">
                        {licgstfile!='' && licgstfile!=null?<Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={2 + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={licgstfile?.name}
                                  src={licgstfile?.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {licgstfile?.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{licgstfile?.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>:<></>}
                        </div>

                        <div className="dropzone-previews mt-3" id="file-previews">

                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          >
                            <div className="p-2">
                              <Row className="align-items-center">

                                <Col sm="12" className="mb-2">
                                  <Input
                                    name="licgstno"
                                    value={validation.values.licgstno || ""}
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licgstno && validation.errors.licgstno ? true : false
                                    }
                                  />
                                  {validation.touched.licgstno && validation.errors.licgstno ? (
                                    <FormFeedback type="invalid">{validation.errors.licgstno}</FormFeedback>
                                  ) : null}

                                </Col>
                                <Col sm='12'>
                                  <Input
                                    className="form-control"
                                    type="date"
                                    defaultValue={licgstdate}
                                    id="example-date-input"
                                    name="licgstdate"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    invalid={
                                      validation.touched.licgstdate && validation.errors.licgstdate ? true : false
                                    }
                                  />
                                  {validation.touched.licgstdate && validation.errors.licgstdate ? (
                                    <FormFeedback type="invalid">{validation.errors.licgstdate}</FormFeedback>
                                  ) : null}
                                </Col>
                              </Row>
                            </div>
                          </Card>

                        </div>
                        <div className="text-center mt-4">

                          {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                        </div>
                      </Col>




                    </Row>




                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <h6 className="card-title">Bank Details</h6>
                  <CardSubtitle className="mb-3">
                    {/* {" "}
                    DropzoneJS is an open source library that provides
                    drag’n’drop file uploads with image previews. */}
                  </CardSubtitle>
                  <Form encType="multipart/form-data" className="form-horizontal" onSubmit={(e) => { e.preventDefault(); validation_bank.handleSubmit(); return false; }}
                  >
                    <Row>
                      <Col md={6}>
                        {(complainces?.cancelled_cheque != null || complainces?.cancelled_cheque != '') ? <div className="view-docs">
                          <div className="mb-3">
                            <a href={ASSET_URL + 'profile/seller/documents/' + complainces?.cancelled_cheque} target="_blank" rel="noreferrer">View Docs</a>
                          </div>
                        </div> : <></>}
                        <Dropzone onDrop={acceptedFiles => { handleAcceptedFiles(acceptedFiles, 'cancelled_cheque') }} multiple={false}>
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div className="dz-message needsclick mt-2"  {...getRootProps()} >
                                <input {...getInputProps()} />
                                <div className="mb-3">
                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                </div>
                                <h4>Click to upload cancelled chaque.</h4>
                              </div>
                            </div>
                          )}
                        </Dropzone>

                        <div className="dropzone-previews mt-3" id="file-previews">
                        {cancelledCheque!='' && cancelledCheque!=null?<Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                          key={1 + "-file"}
                        >
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={cancelledCheque?.name}
                                  src={cancelledCheque?.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {cancelledCheque?.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{cancelledCheque?.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>:<></>}
                        </div>




                      </Col>

                      <Col md={6}>
                        <div className="view-docs">
                          <div className="mb-3">
                            &nbsp;
                          </div>
                        </div>


                        <Card
                          className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                        >

                          <div className="p-2">

                            <Row className="align-items-center">



                              <Col sm='12' className="mb-2">
                                <Input name="ifsc"
                                  value={validation_bank.values.ifsc || ""}
                                  type="text" placeholder="Enter IFSC number"
                                  defaultValue={ifsc}
                                  onChange={validation_bank.handleChange}
                                  onBlur={validation_bank.handleBlur}
                                  invalid={validation_bank.touched.ifsc && validation_bank.errors.ifsc ? true : false}
                                />
                                {validation_bank.touched.ifsc && validation_bank.errors.ifsc ? (
                                  <FormFeedback type="invalid">{validation_bank.errors.ifsc}</FormFeedback>
                                ) : null}

                              </Col>

                              <Col sm='12' className="mb-2">
                                <Input
                                  name="bank_name"
                                  value={validation_bank.values.bank_name || ""}
                                  type="text"
                                  placeholder="Enter Bank Name"
                                  onChange={validation_bank.handleChange}
                                  onBlur={validation_bank.handleBlur}
                                  invalid={
                                    validation_bank.touched.bank_name && validation_bank.errors.bank_name ? true : false
                                  }
                                />
                                {validation_bank.touched.bank_name && validation_bank.errors.bank_name ? (
                                  <FormFeedback type="invalid">{validation_bank.errors.bank_name}</FormFeedback>
                                ) : null}

                              </Col>

                              <Col sm='12' className="mb-2">
                                <Input name="account_no"
                                  value={validation_bank.values.account_no || ""}
                                  type="text" placeholder="Enter Account Number"
                                  onChange={validation_bank.handleChange}
                                  onBlur={validation_bank.handleBlur}
                                  invalid={validation_bank.touched.account_no && validation_bank.errors.account_no ? true : false}
                                />
                                {validation_bank.touched.account_no && validation_bank.errors.account_no ? (
                                  <FormFeedback type="invalid">{validation_bank.errors.account_no}</FormFeedback>
                                ) : null}

                              </Col>

                              <Col sm='12' className="mb-2">
                                <Input
                                  name="holder_name"
                                  value={validation_bank.values.holder_name || ""}
                                  type="text"
                                  placeholder="Enter Account Name"
                                  onChange={validation_bank.handleChange}
                                  onBlur={validation_bank.handleBlur}
                                  invalid={
                                    validation_bank.touched.holder_name && validation_bank.errors.holder_name ? true : false
                                  }
                                />
                                {validation_bank.touched.holder_name && validation_bank.errors.holder_name ? (
                                  <FormFeedback type="invalid">{validation_bank.errors.holder_name}</FormFeedback>
                                ) : null}

                              </Col>





                            </Row>
                          </div>

                        </Card>
                        <div className="text-center mt-4">

                          {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                        </div>


                      </Col>

                    </Row>




                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ComplianceMedical
