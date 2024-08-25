import React,{useEffect} from 'react';
import { Container, Row } from 'reactstrap';

//Import Components
import ChartSection from './ChartSection';

import Section from './Section';
import StatisticsApplications from './StatisticsApplications';

import { useSelector, useDispatch } from "react-redux";
import {
    getDashboard
} from "store/actions";

const DashboardMedical = () => {
    document.title = "Dashboard | Pharmwale"

    const dispatch = useDispatch();
    const { dashboard } = useSelector(state => ({
        dashboard: state.OrderReducer.dashboard,
    }));

    useEffect(() => {
        if (dashboard?.active_products==null || dashboard?.active_products==undefined) {
            dispatch(getDashboard());
        }
    }, [dispatch, dashboard]);


    const chartsData = [
        {
            id: 1,
            title: "Active Selling Products",
            price: dashboard?.active_products,
            perstangeValue: "18.89",
            bagdeColor: "success",
            seriesData: [{
                name: "Job View",
                data: [36, 21, 65, 22, 35, 50, 87, 98],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 2,
            title: "Short Expire Products",
            price: dashboard?.expiry_products,
            perstangeValue: "24.07",
            bagdeColor: "success",
            seriesData: [{
                name: "New Application",
                data: [36, 48, 10, 74, 35, 50, 70, 73],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 3,
            title: "Slow Moving Products",
            price: dashboard?.slow_moving_products,
            perstangeValue: " 8.41",
            bagdeColor: "success",
            seriesData: [{
                name: "Total Approved",
                data: [60, 14, 5, 60, 30, 43, 65, 84],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 4,
            title: "Out of Stock Products",
            price: dashboard?.outofstock_products,
            perstangeValue: " 20.63",
            bagdeColor: "danger",
            istrendingArrow: true,
            seriesData: [{
                name: "Total Rejected",
                data: [32, 22, 7, 55, 20, 45, 36, 20],
            }],
            color: '["--bs-danger", "--bs-transparent"]'
        },
    ];
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>

                    <Section />

                    <ChartSection chartsData={chartsData} />
                    <Row>
                        {/* StatisticsApplications */}
                        <StatisticsApplications statistic_data={dashboard?.statistics} />

                        {/* CandidateSection */}
                        {/* <CandidateSection /> */}
                    </Row>

                    {/* <Row>
                        <JobVacancy />
                    </Row> */}
                    {/* 
                    <Row>
                        <ReceivedTime />
                        <ActivityFeed />
                        <AddedJobs />
                    </Row> */}
                </Container>
            </div>
        </React.Fragment>
    );
}

export default DashboardMedical;