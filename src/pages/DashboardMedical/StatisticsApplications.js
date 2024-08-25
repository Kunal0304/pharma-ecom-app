import React from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { StatisticsApplicationsChart } from './JobCharts';

const StatisticsApplications = ({ statistic_data }) => {

    // const changeDuration = (duration) => {
    //     setDuration(duration)
    //     dispatch(getStatisticData(duration))
    // };

    // useEffect(() => {
    //     dispatch(getStatisticData(duration))
    // }, [dispatch])

    // const { statistic_data } = useSelector((state) => ({
    //     statistic_data: state.DashboardJob.statistic_data
    // }))

    // useEffect(() => {
    //     console.log("statistic_data", statistic_data)
    // }, [statistic_data])

    return (
        <React.Fragment>
            <Col lg={12}>
                <Card>
                    <CardBody>
                        <div className="d-sm-flex flex-wrap">
                            <h4 className="card-title mb-4">Sales Statistics</h4>
                            {/* <div className="ms-auto">
                                <Nav pills>
                                    <NavItem>
                                        <NavLink className={duration === 'week' ? 'active' : ''} href="#" onClick={() => changeDuration('week')}>Week</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={duration === 'month' ? 'active' : ''} href="#" onClick={() => changeDuration('month')}>Month</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className={duration === 'year' ? 'active' : ''} href="#" onClick={() => changeDuration('year')}>Year</NavLink>
                                    </NavItem>
                                </Nav>
                            </div> */}
                        </div>
                        <div className="d-sm-flex flex-wrap">
                            <div className="ms-auto">
                                <Nav pills>
                                    <NavItem>
                                        <NavLink href="#" >
                                            <h6>{statistic_data?.pending_orders?statistic_data?.pending_orders:0}</h6>

                                            <h6>Pending Orders</h6>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" >
                                            <h6>{statistic_data?.monthly_orders?statistic_data?.monthly_orders:0}</h6>

                                            <h6>Monthly Orders</h6>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" >
                                            <h6>{statistic_data?.monthly_sales?statistic_data?.monthly_sales:0}</h6>

                                            <h6>Monthly Sales</h6>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" >
                                            <h6>{statistic_data?.total_orders?statistic_data?.total_orders:0}</h6>

                                            <h6>Total Orders</h6>

                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" >
                                            <h6>{statistic_data?.total_sales?statistic_data?.total_sales:0}</h6>

                                            <h6>Total Sales</h6>

                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </div>
                        <StatisticsApplicationsChart seriesData={statistic_data} dataColors='["--bs-primary", "--bs-success", "--bs-warning", "--bs-info"]' dir="ltr" />
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default StatisticsApplications;