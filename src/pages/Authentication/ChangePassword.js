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
import { changePassword, resetProfileFlag } from "../../store/actions";

const ChangePassword = props => {
  //meta title
  document.title = "Change Password | Skote - React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [idx, setidx] = useState(1);

  const { error, success } = useSelector(state => ({
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  useEffect(() => {
    if (success!=''|| success!=null) {
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      oldpassword: oldpassword || '',
      password: password || '',
      cpassword: cpassword || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required("Field is required"),
      password: Yup.string().required('Password is required'),
      cpassword: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    }),
    
    onSubmit: (values) => {
      dispatch(changePassword(values, props.router.navigate));
    }
  });


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
            </Col>
          </Row>

          <h4 className="card-title mb-4">New Password</h4>
          <Card>
            <CardBody>
              <Form
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
                      <Label className="form-label">old Password</Label>
                      <Input
                        name="oldpassword"
                        // value={name}
                        className="form-control"
                        placeholder="Enter Password"
                        type="password"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.oldpassword}
                        invalid={
                          validation.touched.oldpassword && validation.errors.oldpassword ? true : false
                        }
                      />
                      {validation.touched.oldpassword && validation.errors.oldpassword ? (
                        <FormFeedback type="invalid">{validation.errors.oldpassword}</FormFeedback>
                      ) : null}
                      <Input name="idx" value={idx} type="hidden" />
                    </div>
                  </Col>
                <Col lg="6">
                    <div className="form-group">
                      <Label className="form-label">Password</Label>
                      <Input
                        name="password"
                        // value={name}
                        className="form-control"
                        placeholder="Enter Password"
                        type="password"
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        value={validation.values.password}
                        invalid={
                          validation.touched.password && validation.errors.password ? true : false
                        }
                      />
                      {validation.touched.password && validation.errors.password ? (
                        <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                      ) : null}
                      <Input name="idx" value={idx} type="hidden" />
                    </div>
                  </Col>
                  <Col lg="6">
                      <div className="form-group">
                        <Label className="form-label">Confirm Password</Label>
                        <Input
                          name="cpassword"
                          // value={name}
                          className="form-control"
                          placeholder="Enter Confirm password"
                          type="password"
                            onBlur={validation.handleBlur}
                            onChange={validation.handleChange}
                            value={validation.values.cpassword}
                            invalid={
                                validation.touched.cpassword && validation.errors.cpassword ? true : false
                              }
                        />
                         {validation.touched.cpassword && validation.errors.cpassword ? (
                        <FormFeedback type="invalid">{validation.errors.cpassword}</FormFeedback>
                      ) : null}
                      </div>
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

export default withRouter(ChangePassword);
