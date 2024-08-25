// src/components/filter.
import React, { useMemo, useState, useEffect } from "react";
import classnames from "classnames";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import {
    Nav,
    NavItem,
    NavLink
} from "reactstrap";
import { ASSET_URL,API_DOMAIN,GENERATE_REMITENCE_REPORT } from "helpers/url_helper";
import {
    getSettlements as onGetSettlements,
} from "store/actions";
import { Link } from 'react-router-dom';
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';


function SettlementMedical() {

    const dispatch = useDispatch();
    const { settlements } = useSelector(state => ({
        settlements: state.OrderReducer.settlements,
    }));

    useEffect(() => {
        // console.log(Object.keys(settlements).length === 0);
        // if (settlements?.settlements == undefined || settlements?.settlements == null) {
        if(Object.keys(settlements).length === 0){
            dispatch(onGetSettlements());
        }

    }, [dispatch, settlements]);

    const [activeTab, setactiveTab] = useState("1");

    const { settlement } = useSelector(state => ({
        settlement: state.OrderReducer.settlement,
  }));

    const columns = useMemo(
        () => [
            {
                Header: 'Order ID',
                accessor: 'order_id',
            },
            {
                Header: 'Order Date',
                accessor: 'order_date'
            },
            {
                Header: 'Order Value',
                accessor: 'order_amount'
            },
            {
                Header: 'TDS',
                accessor: 'tds'
            },
            {
                Header: 'TCS',
                accessor: 'tcs'
            },
            {
                Header: 'Commission',
                accessor: 'admin_commission'
            },
            {
                Header: 'Net Amount',
                accessor: 'seller_amount'
            },
            {
                Header: 'Payment Due Date',
                accessor: 'payment_due_date'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Payment Date',
                accessor: 'payment_date'
            },
            {
                Header: 'Transaction ID',
                accessor: 'transaction_id'
            },
        ],
        []
    );

    const columns_remitence = useMemo(
        () => [
            {
                Header: 'UTR',
                accessor: 'utr_no',
            },
            {
                Header: 'Order Value',
                accessor: 'order_amount'
            },
            {
                Header: 'Net Amt',
                accessor: 'net_amount'
            },
            {
                Header: 'Payment Date',
                accessor: 'remintenceDate'
            },
            {
                Header: 'Report',
                accessor: 'view',
                disableFilters: true,
                Cell: (cellProps) => {
                    return (
                        <div>
                            <div className="d-flex flex-wrap gap-3">
                                <div className="btn-group" role="group">
                                <Link to={API_DOMAIN+GENERATE_REMITENCE_REPORT+cellProps.row.original.id} className="btn btn-outline-secondary" target="_blank">REPORT</Link>
                                 
                                </div>
                            </div>
                        </div>
                    );
                }
            }
        ],
        []
    );
//   useEffect(() => {
//     if (settlement?.open == null || settlement?.open == undefined) {
//       dispatch(onGetSettlements());
//     } else if (settlement?.close == null || settlement?.close == undefined) {
//       dispatch(onGetSettlements());
//     }
//   }, [dispatch, settlement]);



    //meta title
    document.title = "Settlements | Pharmwale";

    return (
        <div className="page-content">
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="font-weight-bold">Settlements </h2>
                    {/* <button className="btn btn-outline-primary">
                        Add Staff Members +
                    </button> */}
                </div>
                <Breadcrumbs title="order" breadcrumbItem="Settlements" />
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
                {Object.keys(settlements).length != 0?<TableContainer
                    columns={activeTab == 1 ? columns : columns_remitence}
                    data={activeTab == 1 ? settlements?.open : settlements?.close}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    className="custom-header-css"
                />:<></>}
            </div>
        </div>
    );
}
SettlementMedical.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default SettlementMedical;