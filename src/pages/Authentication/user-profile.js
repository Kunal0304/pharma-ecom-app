import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import withRouter from "components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";

const UserProfile = props => {

  //meta title
  document.title = "Profile | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");
  const [image, setImage] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }else if(process.env.REACT_APP_DEFAULTAUTH === "auth"){
        setname(obj.data.f_name+' '+obj.data.l_name);
        setemail(obj.data.email);
        setidx(obj.data.id);
        setImage(obj.data.image);
        setphone(obj.data.phone);
        setfname(obj.data.f_name);
        setlname(obj.data.l_name);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      email: email || '',
      phone: phone || '',
      fname: fname || '',
      lname: lname || '',
      image: image || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Please Enter Your UserName"),
      lname: Yup.string().required("Please Enter Your UserName"),
      phone: Yup.string().required("Please Enter Your UserName"),
      email: Yup.string().required("Please Enter Your UserName"),
    }),
    
    onSubmit: (values) => {
      dispatch(editProfile(values, props.router.navigate));
      // window.location.reload();
    }
  });

  const [photo123, setphoto123] = useState('');
  const handleInputChange = (event) => {
    setImage(event.target.files[0]);
    setphoto123(URL.createObjectURL(event.target.files[0]));
  } 

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Skote" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                      <Link to="/change-password" className="text-muted btn btn-outline-primary">Change Password</Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form encType="multipart/form-data"
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                    
              <Row>
                <Col lg="6">
                    <div className="form-group">
                      <Label className="form-label">First Name</Label>
                      <Input
                        name="fname"
                        // value={name}
                        className="form-control"
                        placeholder="Enter first Name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.fname || ""}
                        invalid={
                          validation.touched.fname && validation.errors.fname ? true : false
                        }
                      />
                      {validation.touched.fname && validation.errors.fname ? (
                        <FormFeedback type="invalid">{validation.errors.fname}</FormFeedback>
                      ) : null}
                      <Input name="idx" value={idx} type="hidden" />
                    </div>
                  </Col>
                  <Col lg="6">
                      <div className="form-group">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="lname"
                          // value={name}
                          className="form-control"
                          placeholder="Enter last name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lname || ""}
                          invalid={
                            validation.touched.lname && validation.errors.lname ? true : false
                          }
                        />
                        {validation.touched.lname && validation.errors.lname ? (
                          <FormFeedback type="invalid">{validation.errors.lname}</FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                </Row>
                <Row>
                  <Col lg="6">
                      <div className="form-group">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          // value={name}
                          className="form-control"
                          placeholder="Enter your email address"
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
                    </Col>
                    <Col lg="6">
                      <div className="form-group">
                        <Label className="form-label">Phone Number</Label>
                        <Input
                          name="phone"
                          // value={name}
                          className="form-control"
                          placeholder="Enter phone number"
                          type="number"
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
                    </Col>
                </Row>
                <Row>
                  <Col lg="6">
                      <div className="form-group">
                        <Label className="form-label">Upload Image</Label>
                        <Input
                          name="image"
                          // value={name}
                          className="form-control"
                          placeholder="Upload image here"
                          type="file"
                          onChange={handleInputChange}
                          onBlur={validation.handleBlur}
                        />
                      </div>

                    </Col>
                    <Col lg="6">
                      {(photo123 && photo123 != '') &&
                      <img  src={photo123} alt="Image_Photo" width={100} height={100} />
                        }
                    </Col>
                </Row>
               
                <div className="text-center mt-4">
                  <Button type="submit" color="danger">
                    Update
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
