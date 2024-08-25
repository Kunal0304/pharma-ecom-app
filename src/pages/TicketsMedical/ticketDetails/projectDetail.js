import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col, Row } from "reactstrap";


const ProjectDetail = ({ ticket }) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex">
          {/* <img src={img1} alt="" className="avatar-sm me-4" /> */}

          <div className="flex-grow-1 overflow-hidden">
            <h5 className="text-truncate font-size-15">Issue: {ticket.issue_type}</h5>
            <p className="text-muted">{ticket.issue}</p>
          </div>
        </div>

        <h5 className="font-size-15 mt-4">Order Details :</h5>

        {/* <p className="text-muted">
          {get(ticket, "projectDetails.description")}
        </p> */}

        {/* <div className="text-muted mt-4">
          {ticket?.projectDetails &&
            map(ticket?.projectDetails.points, (point, index) => (
              <p key={index}>
                <i className="mdi mdi-chevron-right text-primary me-1" />{" "}
                {point}
              </p>
            ))}
        </div> */}

        <Row className="task-dates">
          
          <Col sm="4" xs="4">
            <div className="mt-4">
              <h5 className="font-size-14">
                Order details
              </h5>
              <p className="text-muted mb-0">Ticket No: {ticket?.ticket_number}</p>
              {ticket?.order?<><p className="text-muted mb-0">Order Id: {ticket?.order_id}</p>
              <p className="text-muted mb-0">Order Date: {ticket?.order?.order_date}</p>
              <p className="text-muted mb-0">Original Invoice Amt: {ticket?.order?.order_amount}</p></>:<></>}
              {/* <p className="text-muted mb-0">Revised Invoice Amt: 08 Sept, 2019</p> */}
              
            </div>
          </Col>

          {ticket?.order?<Col sm="4" xs="4">
            <div className="mt-4">
              <h5 className="font-size-14">
           Buyer details

              </h5>
              <p className="text-muted mb-0">Name: {ticket?.order?.customer?.f_name+' '+ticket?.order?.customer?.l_name}</p>
              <p className="text-muted mb-0">RTO Chargeable: N/A</p>
              <p className="text-muted mb-0">RTO Amount: N/A</p>
              <p className="text-muted mb-0">Adjustment Amount: 0</p>
              <p className="text-muted mb-0">Status: {ticket?.buyer_status==1?'CLOSED':'OPEN'}</p>
            </div>
          </Col>:<></>}
          <Col sm="4" xs="4">
            <div className="mt-4">
              <h5 className="font-size-14">
                Seller details
              </h5>
              <p className="text-muted mb-0">Name: {ticket?.shop?.name}</p>
              <p className="text-muted mb-0">RTO Chargeable: N/A</p>
              <p className="text-muted mb-0">RTO Amount with GST: N/A</p>
              <p className="text-muted mb-0">Adjustment Amount: 0</p>
              <p className="text-muted mb-0">Status: {ticket?.seller_status==1?'CLOSED':'OPEN'}</p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

ProjectDetail.propTypes = {
  ticket: PropTypes.object,
};

export default ProjectDetail;
