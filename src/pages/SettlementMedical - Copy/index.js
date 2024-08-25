// src/components/filter.
import React, { useMemo, useState } from "react";
import classnames from "classnames";
import PropTypes from 'prop-types';
import {
    Nav,
    NavItem,
    NavLink,
    Row,
} from "reactstrap";

//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

function SettlementMedical() {
    const [activeTab, setactiveTab] = useState("1");
    const columns = useMemo(
        () => [
            {
                Header: 'Order ID',
                accessor: 'Order ID',
            },
            {
                Header: 'Order Date',
                accessor: 'Order Date'
            },
            {
                Header: 'Order Value',
                accessor: 'Order Value'
            },
            {
                Header: 'TDS',
                accessor: 'TDS'
            },
            {
                Header: 'TCS',
                accessor: 'TCS'
            },
            {
                Header: 'Commission',
                accessor: 'Commission'
            },
            {
                Header: 'Net Amount',
                accessor: 'Net Amount'
            },
            {
                Header: 'Payment Due Date',
                accessor: 'Payment Due Date'
            },
            {
                Header: 'Status',
                accessor: 'Status'
            },
            {
                Header: 'Payment Date',
                accessor: 'Payment Date'
            },
            {
                Header: 'Transaction ID',
                accessor: 'Transaction ID'
            },
        ],
        []
    );

    const data = [
        {
            "Order ID": "Jennifer Chang",
            "Order Date": "Regional Director",
            "Order Value": 28,
            "TDS": "Singapore",
            "TCS": "2010/11/14",
            "Commission": "$357,650",
            "Net Amount": "$357,650",
            "Payment Due Date": "$357,650",
            "Payment Due Date": "$357,650",
            "Payment Date": "$357,650",
            "Transaction ID": "ID89"
        },
    ];

    //meta title
    document.title = "Data Tables | Skote - React Admin & Dashboard Template";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-weight-bold">Settlements </h2>
                    {/* <button className="btn btn-outline-primary">
                        Add Staff Members +
                    </button> */}
                </div>
                {/* <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" /> */}
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
                                setactiveTab("1");
                            }}
                        >
                            ALL
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
                                setactiveTab("2");
                            }}
                        >
                            Remittance advice
                        </NavLink>
                    </NavItem>
                </Nav>
                {/* <Table columns={columns} data={data} /> */}
                <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={false}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />
            </div>
        </div>
    );
}
SettlementMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default SettlementMedical;