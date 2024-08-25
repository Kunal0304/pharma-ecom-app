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
} from "reactstrap";
import { Alert, FormFeedback } from "reactstrap";

import {
    getMemberList, addNewMemberList, getGroupList, updateMemberList, updateMemberStatus
} from "store/actions";
import ChangeStatusModal from '../../components/Common/ChangeStatusModal';
import {
    Label,
    Form,
    Input,
} from "reactstrap";
function StaffMedical() {

    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: 0,
            email: '',
            name: '',
            phone: '',
            group_type: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter  Name"),
            email: Yup.string().required("Please Enter  Email"),
            phone: Yup.string().required("Please Enter  Phone"),
            group_type: Yup.string().required("Please Select  Group"),
        }),
        onSubmit: (values) => {
            if (values.id == 0) {

                dispatch(addNewMemberList(values));

            } else {
                dispatch(updateMemberList(values));
            }

            dispatch(getMemberList());

           // tog_xlarge();

            // window.location.reload();
        }
    });

    const { error,success } = useSelector(state => ({
        error: state.StaffReducer.error,
        success: state.StaffReducer.success
    }));

    const [request, setRequest] = useState(null);
    const [requestModal, setRequestModal] = useState(false);
    const onClickChangeRequest = (request) => {
        setRequest(request);
        setRequestModal(true);
    };

    const handleRequestChange = () => {
        if (request && request.id) {
            if (request.status == 1) {
                dispatch(updateMemberStatus({ id: request.id, status: 'pending' }));
            } else {
                dispatch(updateMemberStatus({ id: request.id, status: 'approve' }));
            }
            dispatch(getMemberList());
            setRequestModal(false);
        }
    };

    const onClickEditMember = (request) => {
        setRequest(request);
        validation.setFieldValue("id", request.id);
        validation.setFieldValue("name", request.name);
        validation.setFieldValue("email", request.email);
        validation.setFieldValue("phone", request.phone);
        validation.setFieldValue("group_type", request.group_type);
        tog_xlarge();
    };

    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'f_name',
            },
            {
                Header: 'Email ID',
                accessor: 'email'
            },
            {
                Header: 'Group',
                accessor: 'group_name'
            },
            {
                Header: 'Action',
                accessor: 'action',
                disableFilters: true,
                Cell: (cellProps) => {

                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">

                                <div className="btn-group" role="group" onClick={() => {
                                    let viewData = cellProps.row.original;
                                    onClickEditMember(viewData)
                                }}>

                                    <label className="btn btn-outline-secondary" htmlFor="btnradio4">Edit Member</label>

                                </div>



                                <div className="btn-group" role="group" onClick={() => {
                                    const requestData = cellProps.row.original;
                                    onClickChangeRequest(requestData);
                                }}>

                                    <label className="btn btn-outline-secondary" htmlFor="btnradio4">{cellProps.row.original.status == 'approved' ? 'Deactivate Member' : 'Activate Member'}</label>

                                </div>

                            </div>
                        </div>
                    );
                }
            }
        ],
        []
    );

    const dispatch = useDispatch();
    const { members,loading } = useSelector(state => ({
        members: state.StaffReducer.members,
        loading: state.StaffReducer.loading,
    }));

    const { groups } = useSelector(state => ({
        groups: state.GroupReducer.groups,
    }));

    useEffect(() => {

        dispatch(getMemberList());

        // console.log(members,'groups')
    }, [dispatch]);

    useEffect(() => {
        if(success!="" && loading==false){
            tog_xlarge();
            dispatch(getMemberList());
        }
      

        // console.log(members,'groups')
    }, [dispatch,success]);

    useEffect(() => {

        dispatch(getGroupList());

    }, [dispatch]);

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
    document.title = "Staff Merchent | Pharmwale";

    return (
        <div className="page-content">
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
                    <h2 className="font-weight-bold">Staff Member</h2>
                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                        tog_xlarge();
                    }}
                        data-toggle="modal"
                        data-target=".bs-example-modal-xl">
                        Add Staff Member +
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
                                Add Member
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
                                                    <Label className="form-label">Email</Label>
                                                    <Input
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
                                            </Col>


                                        </Row>


                                        <Row>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-email-Input">Phone</Label>
                                                    <Input
                                                        name="phone"
                                                        value={validation.values.phone || ""}
                                                        type="text"
                                                        placeholder="Enter Phone"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        invalid={
                                                            validation.touched.phone && validation.errors.phone ? true : false
                                                        }
                                                    />
                                                    {validation.touched.phone && validation.errors.phone ? (
                                                        <FormFeedback type="invalid">{validation.errors.phone}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-password-Input">Group</Label>
                                                    <select
                                                        id="formrow-InputState"
                                                        className={validation.errors.group_type?'is-invalid  form-control':'form-control'}
                                                        name="group_type"

                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}

                                                    >
                                                        <option>Choose...</option>
                                                        {groups.length > 0 ? groups.map((group, i) => (validation.values.group_type == group.id ? <option key={i} value={group.id} selected>{group.name}</option> : <option key={i} value={group.id}>{group.name}</option>)) : <></>}
                                                    </select>
                                                    {validation.touched.group_type && validation.errors.group_type ? (
                                                        <FormFeedback type="invalid">{validation.errors.group_type}</FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>
                                        </Row>



                                    </CardBody>
                                </Card>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => tog_xlarge()}>Close</button>

                                {loading==false?<button type="submit" className="btn btn-primary">SUMBIT</button>:<button className="btn btn-primary">Loading..</button>}
                            </div>
                        </Form>
                    </Modal>
                </div>
                {loading==false?<TableContainer
                    columns={columns}
                    data={members}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />:<><p>Loading...</p></>}
                <ChangeStatusModal
                    show={requestModal}
                    onChangeClick={handleRequestChange}
                    onCloseClick={() => setRequestModal(false)}
                    message={'Are you Sure you want to cancel staff status'}
                    buttonText={'Change Now'}
                />
            </div>
        </div>
    );
}
StaffMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default StaffMedical;