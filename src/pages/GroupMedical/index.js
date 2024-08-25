// src/components/filter.
import React, { useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
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
    Label,
    Form,
    Input,
} from "reactstrap";

import {
    addNewGroupList, getGroupList, updateGroupList
} from "store/actions";

function GroupMedical() {
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'No Of Members',
                accessor: 'members'
            }
            ,
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

                                    <label className="btn btn-outline-secondary" htmlFor="btnradio4">Edit Group</label>

                                </div>

                            </div>
                        </div>
                    );
                }
            }
        ],
        []
    );

    const validation = useFormik({
        // enableReinitialize : use this  flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            id: 0,
            name: '',
            group_type: []
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter  Name"),
            group_type: Yup.array().min(1).required().label('Group Type'),
        }),
        onSubmit: (values) => {
            if (values.id == 0) {
                dispatch(addNewGroupList(values));
            } else {
                dispatch(updateGroupList(values));
            }

            //  dispatch(getGroupList());

            //  tog_xlarge();



        }
    });


    const onClickEditMember = (request) => {
        validation.setFieldValue("id", request.id);
        validation.setFieldValue("name", request.name);
        validation.setFieldValue("group_type", request.group_types);
        tog_xlarge();
    };
    const open_add_modal = () => {
        validation.setFieldValue("id", '');
        validation.setFieldValue("name", '');
        validation.setFieldValue("group_type", '');
        tog_xlarge();
    }
    const { error, success, loading } = useSelector(state => ({
        error: state.StaffReducer.error,
        success: state.StaffReducer.success,
        loading: state.StaffReducer.loading,
    }));

    const dispatch = useDispatch();

    const { groups } = useSelector(state => ({
        groups: state.GroupReducer.groups,
    }));

    useEffect(() => {

        dispatch(getGroupList());
       

    }, [dispatch]);

    useEffect(() => {
        if (success != "" && loading == false) {
            tog_xlarge();
            dispatch(getGroupList());
        }

    }, [dispatch, success]);

    const [modal_xlarge, setmodal_xlarge] = useState(false);
    const [adminAccess, setAdminAccess] = useState(false);
    // const [dashboard, setDashboard] = useState(false);
    // const [ticketChecker, setTicketChecker] = useState(false);
    // const [settlements, setSettlements] = useState(false);
    // const [staffMembers, setStaffMembers] = useState(false);
    // const [vacation, setVacation] = useState(false);
    // const [order, setOrders] = useState(false);
    // const [inventory, setInventory] = useState(false);
    // const [productRequest, setProductRequest] = useState(false);
    // const [groupss, setGroups] = useState(false);

    function tog_xlarge() {
        //console.log(modal_xlarge);
        setmodal_xlarge(!modal_xlarge);
        removeBodyCss();
    }

    function removeBodyCss() {
        document.body.classList.add("no_padding");
    }

    const handleChange = (e) => {
        const { checked, name, value } = e.target;
        if (checked) {
            if (name == 'group_type1') { setAdminAccess(true) }
            validation.setFieldValue("group_type", [...validation.values.group_type, value]);
        } else {
            if (name == 'group_type1') { setAdminAccess(false) }
            validation.setFieldValue(
                "group_type",
                validation.values.group_type.filter((v) => v !== value)
            );
        }
    };



    //meta title
    document.title = "Merchant Group | Pharmwale";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-weight-bold">Groups</h2>

                    <button type="button" className="btn btn-outline-primary" onClick={() => {
                        open_add_modal();
                    }}
                        data-toggle="modal"
                        data-target=".bs-example-modal-xl">
                        Add Group +
                    </button>
                    <Modal
                        size="md"
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
                                Add Group
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
                                            <Col md={12}>

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

                                        </Row>


                                        {validation.values.id == 0 ? <> <Row>

                                            <Col md={12}>
                                                <div className="mb-3">
                                                    <Label htmlFor="formrow-password-Input">Group Type</Label>


                                                    <Row>
                                                        <Col col={3}>

                                                            <div className="form-check form-check-primary mb-3">
                                                                <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type1"
                                                                    value="1"
                                                                    onChange={handleChange}
                                                                // checked={adminAccess}
                                                                // onChange={() => {
                                                                //     setAdminAccess(!adminAccess)
                                                                // }}
                                                                />

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Admin Access
                                                                </label>
                                                            </div>

                                                        </Col>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">

                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type2"
                                                                    value="2"
                                                                    // checked={dashboard}
                                                                    onChange={handleChange}
                                                                // onChange={() => {
                                                                //     setDashboard(!dashboard)
                                                                // }}
                                                                /> : <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    checked={true}

                                                                />}

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Dashboard
                                                                </label>
                                                            </div>
                                                        </Col>

                                                    </Row>

                                                    <Row>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type3"
                                                                    value="3"
                                                                    //checked={ticketChecker}
                                                                    onChange={handleChange}
                                                                // onChange={() => {
                                                                //     setTicketChecker(!ticketChecker)
                                                                // }}
                                                                /> : <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    checked={true}

                                                                />}

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Ticket Checker
                                                                </label>
                                                            </div>
                                                        </Col>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type4"
                                                                    value="4"
                                                                    //checked={settlements}
                                                                    // onChange={() => {
                                                                    //     setSettlements(!settlements)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> : <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    checked={true}

                                                                />}

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Settlements
                                                                </label>
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col col={3}>

                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type5"
                                                                    value="5"
                                                                    //checked={staffMembers}
                                                                    // onChange={() => {
                                                                    //     setStaffMembers(!staffMembers)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> : <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    checked={true}

                                                                />}

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Staff Members
                                                                </label>
                                                            </div>

                                                        </Col>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type6"
                                                                    value="6"
                                                                    // checked={vacation}
                                                                    // onChange={() => {
                                                                    //     setVacation(!vacation)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> : <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    checked={true}

                                                                />}

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Vacation
                                                                </label>
                                                            </div>
                                                        </Col>



                                                    </Row>
                                                    <Row>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type7"
                                                                    value="7"
                                                                    // checked={order}
                                                                    // onChange={() => {
                                                                    //     setOrders(!order)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> :
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="customCheckcolor1"
                                                                        checked={true}

                                                                    />
                                                                }

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Orders
                                                                </label>
                                                            </div>
                                                        </Col>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type8"
                                                                    value="8"
                                                                    // checked={inventory}
                                                                    // onChange={() => {
                                                                    //     setInventory(!inventory)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> :
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="customCheckcolor1"
                                                                        checked={true}

                                                                    />
                                                                }

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Inventory
                                                                </label>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col col={3}>

                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type9"
                                                                    value="9"
                                                                    // checked={productRequest}
                                                                    // onChange={() => {
                                                                    //     setProductRequest(!productRequest)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> :
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="customCheckcolor1"
                                                                        checked={true}

                                                                    />
                                                                }

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Product Requests
                                                                </label>
                                                            </div>

                                                        </Col>
                                                        <Col col={3}>
                                                            <div className="form-check form-check-primary mb-3">
                                                                {adminAccess == false ? <Input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    id="customCheckcolor1"
                                                                    name="group_type10"
                                                                    value="10"
                                                                    // checked={groupss}
                                                                    // onChange={() => {
                                                                    //     setGroups(!groupss)
                                                                    // }}
                                                                    onChange={handleChange}
                                                                /> :
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input"
                                                                        id="customCheckcolor1"
                                                                        checked={true}

                                                                    />
                                                                }

                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="customCheckcolor1"
                                                                >
                                                                    Groups
                                                                </label>


                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        {validation.errors.group_type ? (
                                                            <div style={{ color: "#f46a6a" }}>{validation.errors.group_type}</div>
                                                        ) : null}
                                                    </Row>




                                                </div>

                                            </Col>
                                        </Row></> : <></>}



                                    </CardBody>

                                </Card>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => tog_xlarge()}>Close</button>

                                {loading == false ? <button type="submit" className="btn btn-primary">SUMBIT</button> : <button className="btn btn-primary">Loading...</button>}
                            </div>
                        </Form>
                    </Modal>
                </div>
                {/* <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" /> */}
                {/* <Table columns={columns} data={data} /> */}
                {loading==false?<TableContainer
                    columns={columns}
                    data={groups}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />:<><p>Loading...</p></>}
            </div>
        </div>
    );
}
GroupMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};

export default GroupMedical; 