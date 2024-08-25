import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logoImg from "../../assets/images/logo.svg";

const Register = () => {

  //meta title
  document.title = "Register | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
      repassword: '',
      password: '',
      shop_name: '',
      shop_address: '',
      shop_banner: '',
      shop_logo: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      password: Yup.string().required("Please Enter Your Password"),
      phone: Yup.string().required("Please Enter Your Phone"),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      first_name: Yup.string().required("Please Enter Your First Name"),
      last_name: Yup.string().required("Please Enter Your Last Name"),
      repassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      shop_name: Yup.string().required("Please Enter Your Shop Name"),
      shop_address: Yup.string().required("Please Enter Your Address")
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    }
  });

  const { user, registrationError, loading } = useSelector(state => ({
    user: state.Account.user,
    registrationError: state.Account.registrationError,
    loading: state.Account.loading,
  }));

  console.log(loading,user,registrationError, 'loading...')

  useEffect(() => {
    dispatch(apiError(""));
  }, []);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={12}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Seller Register</h5>
                        <p>Get your free Pharmwale account now.</p>
                      </div>
                    </Col>
                    {/* <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col> */}
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">

                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logoImg}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}
                      <h2>Seller Info</h2>
                      <div className="row">

                        <div className="col-md-6">
                          <Label className="form-label">First Name</Label>
                          <Input
                            id="first_name"
                            name="first_name"
                            className="form-control"
                            placeholder="Enter First Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.first_name || ""}
                            invalid={
                              validation.touched.first_name && validation.errors.first_name ? true : false
                            }
                          />
                          {validation.touched.first_name && validation.errors.first_name ? (
                            <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="col-md-6">
                          <Label className="form-label">Last Name</Label>
                          <Input
                            name="last_name"
                            type="text"
                            placeholder="Enter username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.last_name || ""}
                            invalid={
                              validation.touched.last_name && validation.errors.last_name ? true : false
                            }
                          />
                          {validation.touched.last_name && validation.errors.last_name ? (
                            <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                          ) : null}
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label className="form-label">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="col-md-6">
                          <Label className="form-label">Phone</Label>
                          <Input
                            name="phone"
                            id="phone"
                            type="text"
                            placeholder="Enter phone number"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone && validation.errors.phone ? true : false
                            }
                          />
                             {validation.touched.phone && validation.errors.phone ? (
                            <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                          ) : null}
                        
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label className="form-label">Password</Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password && validation.errors.password ? true : false
                            }
                          />
                          {validation.touched.password && validation.errors.password ? (
                            <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                          ) : null}
                        </div>
                        <div className="col-md-6">
                          <Label className="form-label">Confirm Password</Label>
                          <Input
                            name="repassword"
                            type="password"
                            placeholder="Enter Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.repassword || ""}
                            invalid={
                              validation.touched.password && validation.errors.repassword ? true : false
                            }
                          />
                          {validation.touched.repassword && validation.errors.repassword ? (
                            <FormFeedback type="invalid">{validation.errors.repassword}</FormFeedback>
                          ) : null}
                        </div>

                      </div>

                      <hr />
                      <h2>Shop Info</h2>
                      <div className="row">

                        <div className="col-md-6">
                          <Label className="form-label">Shop Name</Label>
                          <Input
                            id="shop_name"
                            name="shop_name"
                            className="form-control"
                            placeholder="Enter Shop Name"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.shop_name || ""}
                            invalid={
                              validation.touched.shop_name && validation.errors.shop_name ? true : false
                            }
                          />
                          {validation.touched.shop_name && validation.errors.shop_name ? (
                            <FormFeedback type="invalid">{validation.errors.shop_name}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="col-md-6">
                          <Label className="form-label">Address</Label>
                          <Input
                            name="shop_address"
                            type="text"
                            placeholder="Enter Address"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.shop_address || ""}
                            invalid={
                              validation.touched.shop_address && validation.errors.shop_address ? true : false
                            }
                          />
                          {validation.touched.shop_address && validation.errors.shop_address ? (
                            <FormFeedback type="invalid">{validation.errors.shop_address}</FormFeedback>
                          ) : null}
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Label className="form-label">Shop Logo</Label>
                          <Input
                            id="shop_logo"
                            name="shop_logo"
                            className="form-control"

                            type="file"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.shop_logo || ""}
                            invalid={
                              validation.touched.shop_logo && validation.errors.shop_logo ? true : false
                            }
                          />
                          {validation.touched.shop_logo && validation.errors.shop_logo ? (
                            <FormFeedback type="invalid">{validation.errors.shop_logo}</FormFeedback>
                          ) : null}
                        </div>

                        <div className="col-md-6">
                          <Label className="form-label">Shop Banner</Label>
                          <Input
                            name="shop_banner"
                            type="file"

                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.shop_banner || ""}
                            invalid={
                              validation.touched.shop_banner && validation.errors.shop_banner ? true : false
                            }
                          />
                          {validation.touched.shop_banner && validation.errors.shop_banner ? (
                            <FormFeedback type="invalid">{validation.errors.shop_banner}</FormFeedback>
                          ) : null}
                        </div>

                      </div>


                      {loading == false ? <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div> : <div className="mt-4"><button className="btn btn-primary btn-block ">Loading...
                      </button>
                      </div>}

                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      By registering you agree to the Pharmwale{" "}
                      <Link to="#" className="text-primary">
                        Terms of Use
                      </Link>
                    </p>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
          <div className="mt-5 text-center">
            <p>
              Already have an account ?{" "}
              <Link to="/login" className="font-weight-medium text-primary">
                {" "}
                Login
              </Link>{" "}
            </p>
            <p>
              © {new Date().getFullYear()} Pharmwale. Crafted with{" "}
              <i className="mdi mdi-heart text-danger" /> by AppBirds
            </p>
          </div>
        </Col>
      </Row>
    </Container>
      </div >
    </React.Fragment >
  );
};

export default Register;
